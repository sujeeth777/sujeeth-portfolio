/* ============================================================
   SUJEETH // PORTFOLIO — app.js
   live GitHub sync · Credly badge wallet · matrix rain · boot
   zero dependencies
   ============================================================ */

(() => {
  "use strict";

  /* ---------------- config ---------------- */
  const CONFIG = {
    githubUser: "sujeeth777",
    // repos never shown in the projects grid (edit freely)
    excludeRepos: ["sujeeth777.github.io", "sister-birthday"],
    langColors: {
      Python: "#3572A5", TypeScript: "#3178C6", JavaScript: "#F1E05A",
      HTML: "#E34C26", CSS: "#563D7C", Kotlin: "#A97BFF", C: "#8A8A8A",
      "Jupyter Notebook": "#DA5B0B", Java: "#B07219", Shell: "#89E051",
      Go: "#00ADD8", Rust: "#DEA584", "C++": "#F34B7D", SQL: "#E38C00",
    },
  };

  const $ = (s, el = document) => el.querySelector(s);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- utils ---------------- */
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const timeAgo = (iso) => {
    const s = (Date.now() - new Date(iso).getTime()) / 1000;
    if (s < 3600) return `${Math.max(1, s / 60) | 0}m ago`;
    if (s < 86400) return `${s / 3600 | 0}h ago`;
    if (s < 2592000) return `${s / 86400 | 0}d ago`;
    return `${s / 2592000 | 0}mo ago`;
  };

  const fmtDate = (iso) =>
    new Date(iso + (iso.length === 10 ? "T00:00:00" : "")).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  /* ================= BOOT SEQUENCE ================= */
  const BOOT = [
    { html: '<span class="cmd">$ ssh guest@sujeeth-portfolio</span>' },
    { html: "&gt; resolving host<span class='ok'>............ [OK]</span>" },
    { html: "&gt; establishing secure channel<span class='ok'>... [OK]</span>" },
    { html: "&gt; verifying credentials<span class='ok'>........ [GRANTED]</span>" },
    { html: '<span class="cmd">$ cat ./welcome --author sujeeth</span>' },
  ];

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function boot() {
    const box = $("#boot-lines");
    for (const line of BOOT) {
      const el = document.createElement("span");
      el.className = "line";
      el.innerHTML = line.html;
      box.appendChild(el);
      await sleep(reduceMotion ? 40 : 260);
    }
    for (const id of ["hero-identity", "hero-stats", "hero-actions"]) {
      $("#" + id)?.classList.remove("hidden");
    }
  }
  boot();

  /* ================= MATRIX RAIN ================= */
  function matrixRain() {
    if (reduceMotion) return;
    const canvas = $("#matrix");
    const ctx = canvas.getContext("2d", { alpha: true });
    const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﬀﾂﾃﾄﾅﾆﾇﾈﾉ0123456789ABCDEF<>/\\{}[]$#@%&*+=;:".split("");
    const FONT = 15;
    let cols = 0, drops = [], last = 0;

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = FONT + "px monospace";
      cols = Math.ceil(innerWidth / FONT);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
    }

    let rAF;
    function frame(t) {
      rAF = requestAnimationFrame(frame);
      if (document.hidden || t - last < 66) return; // ~15fps — easy on the CPU
      last = t;
      ctx.fillStyle = "rgba(0,0,0,0.09)";
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < cols; i++) {
        const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        const y = drops[i] * FONT;
        ctx.fillStyle = Math.random() < 0.06 ? "#b6ffce" : "#00ff41";
        ctx.fillText(ch, i * FONT, y);
        if (y > innerHeight && Math.random() > 0.977) drops[i] = 0;
        drops[i]++;
      }
    }

    let resizeTimer;
    addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });
    resize();
    rAF = requestAnimationFrame(frame);
    canvas.classList.add("on");
  }
  matrixRain();

  /* ================= REVEAL ON SCROLL ================= */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ================= PROJECTS — live from GitHub ================= */
  const GH_API = `https://api.github.com/users/${CONFIG.githubUser}`;

  async function loadProjects() {
    let repos = null;
    let live = true;
    try {
      // live data — new repos appear on the site automatically
      const [userRes, reposRes] = await Promise.all([
        fetch(GH_API, { headers: { Accept: "application/vnd.github+json" } }),
        fetch(GH_API + "/repos?sort=pushed&per_page=100&type=owner", { headers: { Accept: "application/vnd.github+json" } }),
      ]);
      if (!userRes.ok || !reposRes.ok) throw new Error("github api");
      const user = await userRes.json();
      repos = await reposRes.json();
      setStat("stat-repos", user.public_repos);
      setStat("stat-followers", user.followers);
    } catch {
      // graceful fallback to the committed snapshot
      live = false;
      try {
        const fb = await fetch("data/projects-fallback.json").then((r) => r.json());
        repos = fb.repos;
        setStat("stat-repos", fb.count);
      } catch { /* offline: leave skeletons */ }
    }

    if (!repos) return;
    const grid = $("#projects-grid");
    grid.innerHTML = "";

    const list = repos
      .filter((r) => !r.fork && !r.archived && !CONFIG.excludeRepos.includes(r.name))
      .sort((a, b) => (b.pushed_at || "").localeCompare(a.pushed_at || ""));

    const note = $(".section-note");
    if (note && !live) note.textContent = "// showing cached snapshot — live GitHub sync unavailable right now";

    list.forEach((r, i) => {
      const lang = r.language || "";
      const color = CONFIG.langColors[lang] || "#00ff41";
      const desc = r.description
        ? `<p class="repo-desc">${esc(r.description)}</p>`
        : `<p class="repo-desc none">// no description provided</p>`;
      const topics = (r.topics || []).slice(0, 4)
        .map((t) => `<span>${esc(t)}</span>`).join("");
      const card = document.createElement("article");
      card.className = "repo-card";
      card.style.animationDelay = Math.min(i * 45, 400) + "ms";
      card.innerHTML = `
        <div class="repo-head">
          <a class="repo-name" href="${esc(r.html_url || r.url)}" target="_blank" rel="noopener">${esc(r.name)}</a>
          <span class="repo-idx">[${String(i + 1).padStart(2, "0")}]</span>
        </div>
        ${desc}
        ${topics ? `<div class="repo-topics">${topics}</div>` : ""}
        <div class="repo-meta">
          ${lang ? `<span class="repo-lang"><i class="lang-dot" style="color:${color}"></i>${esc(lang)}</span>` : ""}
          <span title="stars">
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3l-6.1 3.3 1.4-6.8L2.2 9.1l6.9-.8L12 2z"/></svg>
            ${r.stargazers_count ?? r.stars ?? 0}
          </span>
          ${r.pushed_at ? `<span>pushed ${timeAgo(r.pushed_at)}</span>` : ""}
        </div>
        <div class="repo-links">
          <a href="${esc(r.html_url || r.url)}" target="_blank" rel="noopener">&lt;/&gt; code</a>
          ${r.homepage ? `<a href="${esc(r.homepage)}" target="_blank" rel="noopener">▶ live demo</a>` : ""}
        </div>`;
      grid.appendChild(card);
    });
  }

  function setStat(id, val) {
    const el = $("#" + id);
    if (el && val != null) el.textContent = val;
  }

  /* ================= CERTIFICATIONS — Credly wallet ================= */
  async function loadBadges() {
    let data;
    try {
      data = await fetch("data/badges.json", { cache: "no-cache" }).then((r) => r.json());
    } catch {
      $("#badges-grid").innerHTML =
        '<p class="section-note">// badge wallet unreachable — <a href="https://www.credly.com/users/sri-sujeeth-sirivella" target="_blank" rel="noopener">view on credly</a></p>';
      return;
    }
    setStat("stat-badges", data.count);
    const grid = $("#badges-grid");
    grid.innerHTML = "";
    data.badges.forEach((b, i) => {
      const card = document.createElement("a");
      card.className = "badge-card";
      card.href = b.url || data.profile;
      card.target = "_blank";
      card.rel = "noopener";
      card.title = `${b.name} — ${b.issuer}`;
      card.style.animationDelay = Math.min(i * 35, 500) + "ms";
      card.innerHTML = `
        <span class="badge-verified">✓ VERIFIED</span>
        <span class="badge-img-wrap"><img src="${esc(b.image)}" alt="${esc(b.name)}" loading="lazy" width="86" height="86"></span>
        <span class="badge-name">${esc(b.name)}</span>
        <span class="badge-issuer">${esc(b.issuer)}</span>
        <span class="badge-date">${b.issued ? fmtDate(b.issued) : ""}</span>`;
      grid.appendChild(card);
    });
  }

  /* ================= CERTIFICATE FILES (pdf / images) ================= */
  const PDF_ICON =
    '<svg viewBox="0 0 24 24" width="46" height="46" aria-hidden="true"><path fill="currentColor" d="M6 2h9l5 5v15H6V2Zm8 1.5V8h4.5L14 3.5ZM8 12h8v1.5H8V12Zm0 3.5h8V17H8v-1.5Zm0-7h5V10H8V8.5Z"/></svg>';

  async function loadCertFiles() {
    const wrap = $("#cert-files");
    const grid = $("#cert-files-grid");
    if (!wrap || !grid) return;
    let data;
    try {
      data = await fetch("data/certificates.json", { cache: "no-cache" }).then((r) => r.json());
    } catch {
      wrap.classList.add("hidden"); // manifest missing — hide the panel silently
      return;
    }
    if (!data.count) { wrap.classList.add("hidden"); return; }
    grid.innerHTML = "";
    data.files.forEach((f, i) => {
      // encode each path segment so spaces/commas in filenames stay URL-safe
      const url = f.file.split("/").map(encodeURIComponent).join("/");
      const card = document.createElement("a");
      card.className = "cert-file-card";
      card.href = url;
      card.target = "_blank";
      card.rel = "noopener";
      card.title = f.title;
      card.style.animationDelay = Math.min(i * 40, 400) + "ms";
      card.innerHTML = `
        <span class="cert-file-preview">${f.type === "image" ? `<img src="${url}" alt="${esc(f.title)}" loading="lazy">` : PDF_ICON}</span>
        <span class="cert-file-name">${esc(f.title)}</span>
        <span class="cert-file-tag">${f.type === "image" ? "IMAGE" : "PDF"} · open →</span>`;
      grid.appendChild(card);
    });
  }

  loadProjects();
  loadBadges();
  loadCertFiles();

  /* ================= HELP / CONTACT FORM ================= */
  const FORM_ENDPOINT = "https://formsubmit.co/ajax/srisujeeths@gmail.com";
  const FORM_EMAIL = "srisujeeths@gmail.com";
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const helpForm = $("#help-form");
  if (helpForm) {
    const statusBox = $("#form-status");
    const sendBtn = $("#form-send");

    const setStatus = (kind, html) => {
      statusBox.className = "form-status visible " + kind;
      statusBox.innerHTML = html;
    };

    const mailtoHref = (d) => {
      const subject = encodeURIComponent(`Help request — ${d.topic || "general"}`);
      const body = encodeURIComponent(
        `${d.message}\n\n— ${d.name}\nReply to: ${d.email}`
      );
      return `mailto:${FORM_EMAIL}?subject=${subject}&body=${body}`;
    };

    const tryFormSubmit = (d) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      return fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: d.name, email: d.email, topic: d.topic, message: d.message,
          _subject: `Help request: ${d.topic || "general"} — from portfolio`,
          _template: "table", _captcha: "false",
        }),
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((out) => String(out.success) === "true")
        .finally(() => clearTimeout(timer));
    };

    helpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (sendBtn.disabled) return;

      const data = Object.fromEntries(new FormData(helpForm));
      if (data._honey) return; // silent bot trap

      // client-side validation
      if (!data.name.trim() || !data.message.trim()) {
        return setStatus("err", "&gt; [ERROR] name and message are required fields.");
      }
      if (!EMAIL_RE.test(data.email.trim())) {
        return setStatus("err", "&gt; [ERROR] that email address doesn't look valid.");
      }

      const d = {
        name: data.name.trim(),
        email: data.email.trim(),
        topic: data.topic || "",
        message: data.message.trim(),
      };

      sendBtn.disabled = true;
      const originalLabel = sendBtn.textContent;
      sendBtn.textContent = "./transmitting...";
      setStatus("ok", "&gt; encrypting &amp; transmitting your message...");

      try {
        const delivered = await tryFormSubmit(d);
        if (!delivered) throw new Error("service refused");
        setStatus("ok", "&gt; [OK] message delivered. I'll reply within 24h — check your inbox!");
        helpForm.reset();
      } catch {
        // delivery service unreachable — never lose the message:
        // open the visitor's email app with everything prefilled
        setStatus(
          "err",
          "&gt; [INFO] delivery service busy — opening your email app with the message prefilled. Just press send!"
        );
        window.location.href = mailtoHref(d);
      } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = originalLabel;
      }
    });
  }

  /* ---------------- misc ---------------- */
  $("#year").textContent = new Date().getFullYear();

  // nav: solid tint once scrolled
  const nav = $("#nav");
  addEventListener("scroll", () => {
    nav.style.borderBottomColor = scrollY > 40
      ? "rgba(0,255,65,0.35)"
      : "rgba(0,255,65,0.18)";
  }, { passive: true });
})();
