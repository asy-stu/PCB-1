import { useSite } from "../../context/SiteContext";
import { FONT_OPTIONS } from "../../lib/themeStore";
import { RotateCcw } from "lucide-react";

const COLOR_FIELDS = [
  { key: "accent", label: "اللون الأساسي (Accent)" },
  { key: "accent2", label: "اللون الثانوي (Accent 2)" },
  { key: "bg", label: "خلفية الموقع" },
  { key: "bgElevated", label: "خلفية البطاقات" },
  { key: "border", label: "لون الحدود" },
  { key: "text", label: "لون النص الأساسي" },
  { key: "textMuted", label: "لون النص الثانوي" },
];

const FONT_FIELDS = [
  { key: "fontDisplay", label: "خط العناوين (Display)" },
  { key: "fontBody", label: "خط النصوص (Body)" },
  { key: "fontMono", label: "الخط الرقمي (Mono / Labels)" },
];

export default function ThemeTab() {
  const { theme, setTheme, resetTheme } = useSite();

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold">الألوان</h3>
          <button onClick={resetTheme} className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> استعادة الافتراضي
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COLOR_FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-mono mb-2" style={{ color: "var(--site-text-muted)" }}>{f.label}</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme[f.key]}
                  onChange={(e) => setTheme({ [f.key]: e.target.value })}
                  className="w-11 h-11 rounded-lg border site-border cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={theme[f.key]}
                  onChange={(e) => setTheme({ [f.key]: e.target.value })}
                  className="flex-1 site-bg-elevated border site-border rounded-lg px-3 py-2 text-sm font-mono outline-none focus:border-[var(--site-accent)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold mb-6">الخطوط</h3>
        <div className="grid sm:grid-cols-3 gap-5">
          {FONT_FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-mono mb-2" style={{ color: "var(--site-text-muted)" }}>{f.label}</label>
              <select
                value={theme[f.key]}
                onChange={(e) => setTheme({ [f.key]: e.target.value })}
                className="w-full site-bg-elevated border site-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--site-accent)]"
              >
                {FONT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold mb-4">استدارة الحواف</h3>
        <input
          type="range" min="0" max="28" value={theme.radius}
          onChange={(e) => setTheme({ radius: Number(e.target.value) })}
          className="w-full accent-[var(--site-accent)]"
        />
        <p className="text-xs font-mono mt-2" style={{ color: "var(--site-text-muted)" }}>{theme.radius}px</p>
      </div>
    </div>
  );
}
