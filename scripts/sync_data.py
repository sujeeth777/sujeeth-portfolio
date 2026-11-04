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

HEADERS = {"User-Agent": "Mozilla/5.0 (portfolio-sync)", "Accept": "application/json"}


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


if __name__ == "__main__":
    DATA.mkdir(exist_ok=True)
    n_badges = sync_badges()
    n_repos = sync_repos()
    print(f"synced {n_badges} badges -> data/badges.json")
    print(f"synced {n_repos} repos -> data/projects-fallback.json")
