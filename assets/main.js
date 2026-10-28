/* Timeline data. Edit dates here — "now" means still active.
   group: "icbc" (day job) | "ddt" (Dongding Tech) | "lead" (projects I led / built for clients) | "coop" */
const PROJECTS = [
  { name: "ICBC",                       sub: "software developer · day job", start: "2021-11", end: "now",     group: "icbc" },
  { name: "MControl",                   sub: "Dongding · IoT platform",      start: "2026-09", end: "now",     group: "ddt"  },
  { name: "MIntel",                     sub: "Dongding · quoting platform",  start: "2026-08", end: "now",     group: "ddt"  },
  { name: "dongdingtech.com",           sub: "Dongding · site & portfolio",  start: "2026-05", end: "2026-08", group: "ddt"  },
  { name: "Crown Mountain",             sub: "site & business development",  start: "2026-05", end: "now",     group: "lead" },
  { name: "Timmie Hsiung RMT",          sub: "website",                      start: "2026-07", end: "2026-08", group: "lead" },
  { name: "Vita-Qi Thera Clinic",       sub: "website",                      start: "2025-11", end: "2026-10", group: "lead" },
  { name: "Chopsticks Restaurant",      sub: "website",                      start: "2025-01", end: "2026-01", group: "lead" },
  { name: "Royal Regal Realty",         sub: "website & back office",        start: "2024-10", end: "2026-09", group: "lead" },
  { name: "OneNata",                    sub: "project lead · 8 people",      start: "2024-06", end: "now",     group: "lead" },
  { name: "SPC Pay",                    sub: "project lead · 8 people",      start: "2023-06", end: "2024-06", group: "lead" },
  { name: "Culina",                     sub: "co-founder · 5 people",        start: "2021-01", end: "2023-08", group: "lead" },
  { name: "WADF climate data",          sub: "BC Ministry of Forests",       start: "2020-01", end: "2020-12", group: "coop" },
  { name: "Anti-fraud analysis",        sub: "CCB Fintech",                  start: "2019-05", end: "2019-09", group: "coop" },
];

const START_YEAR = 2019;
const END_YEAR   = 2026;               // axis runs Jan 2019 → Dec 2026
const TOTAL      = (END_YEAR - START_YEAR + 1) * 12;

function months(ym) {
  if (ym === "now") {
    const d = new Date();
    return (d.getFullYear() - START_YEAR) * 12 + d.getMonth() + 1;
  }
  const [y, m] = ym.split("-").map(Number);
  return (y - START_YEAR) * 12 + (m - 1);
}

function renderGantt() {
  const root = document.getElementById("gantt");
  if (!root) return;

  const axis = document.createElement("div");
  axis.className = "gantt-years";
  for (let y = START_YEAR; y <= END_YEAR; y++) {
    const s = document.createElement("span");
    s.textContent = y;
    s.style.left = ((y - START_YEAR) * 12 + 6) / TOTAL * 100 + "%";
    axis.appendChild(s);
  }
  root.appendChild(axis);

  PROJECTS
    .slice()
    .sort((a, b) => months(b.start) - months(a.start))
    .forEach(p => {
      const label = document.createElement("div");
      label.className = "gantt-label";
      label.innerHTML = `${p.name}<small>${p.sub}</small>`;

      const track = document.createElement("div");
      track.className = "gantt-track";
      const bar = document.createElement("div");
      const s = months(p.start), e = months(p.end);
      bar.className = `gantt-bar ${p.group}` + (p.end === "now" ? " ongoing" : "");
      bar.style.left  = (s / TOTAL * 100) + "%";
      bar.style.width = (Math.max(e - s, 1) / TOTAL * 100) + "%";
      bar.setAttribute("title", `${p.name}: ${p.start} – ${p.end === "now" ? "present" : p.end}`);
      track.appendChild(bar);

      root.appendChild(label);
      root.appendChild(track);
    });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { root.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(root);
  } else {
    root.classList.add("is-visible");
  }
}

renderGantt();
