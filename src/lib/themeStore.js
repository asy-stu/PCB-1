export const FONT_OPTIONS = [
  { id: "space-grotesk", label: "Space Grotesk", css: "'Space Grotesk', sans-serif", google: "Space+Grotesk:wght@400;500;600;700" },
  { id: "inter", label: "Inter", css: "'Inter', sans-serif", google: "Inter:wght@400;500;600;700" },
  { id: "jetbrains", label: "JetBrains Mono", css: "'JetBrains Mono', monospace", google: "JetBrains+Mono:wght@400;500;600;700" },
  { id: "poppins", label: "Poppins", css: "'Poppins', sans-serif", google: "Poppins:wght@400;500;600;700" },
  { id: "cairo", label: "Cairo (عربي)", css: "'Cairo', sans-serif", google: "Cairo:wght@400;500;600;700" },
  { id: "tajawal", label: "Tajawal (عربي)", css: "'Tajawal', sans-serif", google: "Tajawal:wght@400;500;700" },
  { id: "ibm-plex", label: "IBM Plex Sans", css: "'IBM Plex Sans', sans-serif", google: "IBM+Plex+Sans:wght@400;500;600;700" },
  { id: "orbitron", label: "Orbitron", css: "'Orbitron', sans-serif", google: "Orbitron:wght@500;600;700" },
  { id: "roboto-mono", label: "Roboto Mono", css: "'Roboto Mono', monospace", google: "Roboto+Mono:wght@400;500;600" },
];

export const DEFAULT_THEME = {
  accent: "#4ee6a8",
  accent2: "#4fc3f7",
  bg: "#060a10",
  bgElevated: "#0b111a",
  border: "#1c2733",
  text: "#eaf2ee",
  textMuted: "#93a3ae",
  fontDisplay: "space-grotesk",
  fontBody: "inter",
  fontMono: "jetbrains",
  radius: 14,
};

const STORAGE_KEY = "site_theme";
let loadedFonts = new Set();

export function getTheme() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_THEME };
    return { ...DEFAULT_THEME, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_THEME };
  }
}

export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
}

export function resetTheme() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...DEFAULT_THEME };
}

function loadGoogleFont(fontId) {
  const opt = FONT_OPTIONS.find((f) => f.id === fontId);
  if (!opt || loadedFonts.has(fontId)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${opt.google}&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(fontId);
}

export function applyThemeToDOM(theme) {
  const root = document.documentElement;
  root.style.setProperty("--site-accent", theme.accent);
  root.style.setProperty("--site-accent-2", theme.accent2);
  root.style.setProperty("--site-bg", theme.bg);
  root.style.setProperty("--site-bg-elevated", theme.bgElevated);
  root.style.setProperty("--site-border", theme.border);
  root.style.setProperty("--site-text", theme.text);
  root.style.setProperty("--site-text-muted", theme.textMuted);
  root.style.setProperty("--site-radius", `${theme.radius}px`);

  [theme.fontDisplay, theme.fontBody, theme.fontMono].forEach(loadGoogleFont);
  const displayOpt = FONT_OPTIONS.find((f) => f.id === theme.fontDisplay);
  const bodyOpt = FONT_OPTIONS.find((f) => f.id === theme.fontBody);
  const monoOpt = FONT_OPTIONS.find((f) => f.id === theme.fontMono);
  root.style.setProperty("--site-font-display", displayOpt?.css || DEFAULT_THEME.fontDisplay);
  root.style.setProperty("--site-font-body", bodyOpt?.css || DEFAULT_THEME.fontBody);
  root.style.setProperty("--site-font-mono", monoOpt?.css || DEFAULT_THEME.fontMono);
}
