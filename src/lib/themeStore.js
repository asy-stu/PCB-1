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

export const LIGHT_THEME = {
  accent: "#087f5b",
  accent2: "#0969a9",
  bg: "#f4f8f7",
  bgElevated: "#ffffff",
  border: "#d7e2df",
  text: "#101c1a",
  textMuted: "#526560",
};

const STORAGE_KEY = "site_theme";
export const MODE_KEY = "site_color_mode";
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

export function getColorMode() {
  const saved = localStorage.getItem(MODE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
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

export function applyThemeToDOM(theme, mode = getColorMode()) {
  const root = document.documentElement;
  const colors = mode === "light" ? { ...theme, ...LIGHT_THEME } : theme;
  root.dataset.theme = mode;
  root.style.colorScheme = mode;
  root.style.setProperty("--site-accent", colors.accent);
  root.style.setProperty("--site-accent-2", colors.accent2);
  root.style.setProperty("--site-bg", colors.bg);
  root.style.setProperty("--site-bg-elevated", colors.bgElevated);
  root.style.setProperty("--site-border", colors.border);
  root.style.setProperty("--site-text", colors.text);
  root.style.setProperty("--site-text-muted", colors.textMuted);
  root.style.setProperty("--site-radius", `${theme.radius}px`);

  [theme.fontDisplay, theme.fontBody, theme.fontMono].forEach(loadGoogleFont);
  const displayOpt = FONT_OPTIONS.find((f) => f.id === theme.fontDisplay);
  const bodyOpt = FONT_OPTIONS.find((f) => f.id === theme.fontBody);
  const monoOpt = FONT_OPTIONS.find((f) => f.id === theme.fontMono);
  root.style.setProperty("--site-font-display", displayOpt?.css || "'Space Grotesk', sans-serif");
  root.style.setProperty("--site-font-body", bodyOpt?.css || "'Inter', sans-serif");
  root.style.setProperty("--site-font-mono", monoOpt?.css || "'JetBrains Mono', monospace");
}
