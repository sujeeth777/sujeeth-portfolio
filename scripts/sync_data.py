#!/usr/bin/env python3
"""Sync portfolio data from Credly and GitHub into static JSON files.

Runs locally and inside the daily GitHub Action (.github/workflows/sync-data.yml).
Stdlib only — no dependencies.
"""

import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

GITHUB_USERNAME = "sujeeth777"
CREDLY_USER_ID = "84307d98-fc50-4d6f-abc4-8f943e79cf31"
CREDLY_PROFILE = "https://www.credly.com/users/sri-sujeeth-sirivella"

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
CERT_DIR = ROOT / "certificates"

HEADERS = {"User-Agent": "Mozilla/5.0 (portfolio-sync)", "Accept": "application/json"}

# hand-tuned display titles for certificate files (keyed by normalized filename)
CERT_TITLE_OVERRIDES = {
    "accenture_certificate software engineering job simulation.pdf": "Accenture — Software Engineering Job Simulation",
    "certificate b10x.pdf": "B10X — Certificate",
    "cisco networking acadamy sujeeth.pdf": "Cisco Networking Academy",
    "deloitte_certificate cyber job simulation.pdf": "Deloitte — Cyber Job Simulation",
    "ec councle psujeeth.png": "EC Council",
    "fundamentals of remote sensing nasa.pdf": "NASA — Fundamentals of Remote Sensing",
    "greatlearnling sujeeth intro to ai.pdf": "Great Learning — Introduction to AI",
    "machyard certificate areospace sujeeth.pdf": "Machyard — Aerospace Certificate",
    "pirple html and css sujeeth.pdf": "Pirple — HTML & CSS",
    "python for data structures,.pdf": "Python for Data Structures",
}

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"}


def fetch_json(url: str):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as res:
        return json.loads(res.read().decode("utf-8"))


def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def sync_badges() -> int:
    """Merge Credly-issued badges + external (imported) badges into data/badges.json."""
    badges = []

    credly = fetch_json(
        f"https://www.credly.com/users/{CREDLY_USER_ID}/badges?page=1&page_size=100"
    )["data"]
    for b in credly:
        tpl = b.get("badge_template") or {}
        issuer = ""
        entities = (tpl.get("issuer") or {}).get("entities") or []
        if entities:
            issuer = entities[0].get("entity", {}).get("name", "")
        badges.append(
            {
                "name": tpl.get("name", ""),
                "issuer": issuer,
                "issued": b.get("issued_at_date", ""),
                "image": tpl.get("image_url", ""),
                "url": f"https://www.credly.com/badges/{b['id']}",
                "source": "credly",
            }
        )

    external = fetch_json(
        f"https://www.credly.com/api/v1/users/{CREDLY_USER_ID}"
        "/external_badges/open_badges/public?page=1&page_size=100"
    )["data"]
    for b in external:
        eb = b.get("external_badge") or {}
        badges.append(
            {
                "name": eb.get("badge_name", ""),
                "issuer": eb.get("issuer_name", ""),
                "issued": eb.get("issued_at_date", ""),
                "image": eb.get("image_url", ""),
                "url": eb.get("badge_url", CREDLY_PROFILE),
                "source": "external",
            }
        )

    badges.sort(key=lambda x: x.get("issued", ""), reverse=True)

    out = {
        "source": "credly",
        "profile": CREDLY_PROFILE,
        "generated_at": now_iso(),
        "count": len(badges),
        "badges": badges,
    }
    (DATA / "badges.json").write_text(json.dumps(out, indent=2), encoding="utf-8")
    return len(badges)


def sync_repos() -> int:
    repos_raw = fetch_json(
        f"https://api.github.com/users/{GITHUB_USERNAME}/repos"
        "?sort=pushed&per_page=100&type=owner"
    )
    repos = [
        {
            "name": r["name"],
            "description": r.get("description") or "",
            "language": r.get("language") or "",
            "stars": r.get("stargazers_count", 0),
            "forks": r.get("forks_count", 0),
            "url": r["html_url"],
            "homepage": (r.get("homepage") or "").strip(),
            "topics": r.get("topics", []),
            "pushed_at": r.get("pushed_at", ""),
            "archived": bool(r.get("archived")),
        }
        for r in repos_raw
        if not r.get("fork")
    ]

    out = {
        "source": "github",
        "generated_at": now_iso(),
        "count": len(repos),
        "repos": repos,
    }
    (DATA / "projects-fallback.json").write_text(
        json.dumps(out, indent=2), encoding="utf-8"
    )
    return len(repos)


def sync_certificate_files() -> int:
    """List everything in certificates/ into data/certificates.json.

    Purely local (no network) — rerun by the deploy workflow so new files
    dropped into the folder appear on the site automatically.
    """
    def clean_title(path: Path) -> str:
        stem = path.stem
        normalized = " ".join(stem.lower().split()) + path.suffix.lower()  # collapse whitespace, keep ext
        if normalized in CERT_TITLE_OVERRIDES:
            return CERT_TITLE_OVERRIDES[normalized]
        return " ".join(w.capitalize() for w in normalized.rsplit(".", 1)[0].split())

    files = []
    if CERT_DIR.is_dir():
        for path in sorted(CERT_DIR.rglob("*")):
            if not path.is_file() or path.name.startswith("."):
                continue
            ext = path.suffix.lower()
            rel = path.relative_to(ROOT).as_posix()
            files.append(
                {
                    "file": rel,
                    "title": clean_title(path),
                    "type": "image" if ext in IMAGE_EXTS else "pdf",
                }
            )

    files.sort(key=lambda x: x["title"].lower())
    out = {
        "source": "local-scan",
        "generated_at": now_iso(),
        "count": len(files),
        "files": files,
    }
    (DATA / "certificates.json").write_text(json.dumps(out, indent=2), encoding="utf-8")
    return len(files)


if __name__ == "__main__":
    DATA.mkdir(exist_ok=True)
    n_certs = sync_certificate_files()
    print(f"scanned {n_certs} certificate files -> data/certificates.json")
    try:
        n_badges = sync_badges()
        print(f"synced {n_badges} badges -> data/badges.json")
    except Exception as exc:  # keep local scan alive even if network dies
        print(f"warn: credly sync failed ({exc}) — keeping existing badges.json")
    try:
        n_repos = sync_repos()
        print(f"synced {n_repos} repos -> data/projects-fallback.json")
    except Exception as exc:
        print(f"warn: github sync failed ({exc}) — keeping existing projects-fallback.json")
