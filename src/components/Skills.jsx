import { useTranslation } from "react-i18next";
import { SlidersHorizontal, ShieldCheck, Activity, GraduationCap } from "lucide-react";
import SectionHeader from "./SectionHeader";

const GROUP_ICONS = [ShieldCheck, Activity, GraduationCap];

function Ring({ value, label }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="card p-6 text-center">
      <svg viewBox="0 0 130 130" className="w-28 h-28 mx-auto mb-4 -rotate-90">
        <circle cx="65" cy="65" r={r} fill="none" stroke="var(--site-border)" strokeWidth="9" />
        <circle
          cx="65" cy="65" r={r} fill="none" stroke="var(--site-accent)" strokeWidth="9"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--site-accent) 60%, transparent))" }}
        />
        <text x="65" y="65" textAnchor="middle" dominantBaseline="central" className="rotate-90" style={{ transform: "rotate(90deg)", transformOrigin: "65px 65px", fill: "var(--site-text)", fontSize: "22px", fontWeight: 700, fontFamily: "var(--site-font-display)" }}>
          {value}%
        </text>
      </svg>
      <p className="font-medium text-sm">{label}</p>
    </div>
  );
}

function Bar({ label, value }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span className="font-mono site-accent">{value}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--site-border)" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: "linear-gradient(90deg, var(--site-accent), var(--site-accent-2))" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const rings = t("skills.rings", { returnObjects: true }) || [];
  const groups = t("skills.groups", { returnObjects: true }) || [];

  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <SectionHeader icon={SlidersHorizontal} eyebrow={t("skills.eyebrow")} title={t("skills.title")} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
        {rings.map((r, i) => <Ring key={i} value={r.value} label={r.label} />)}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {groups.map((g, i) => {
          const Icon = GROUP_ICONS[i % GROUP_ICONS.length];
          return (
            <div key={i} className="card p-7">
              <div className="eyebrow mb-6"><Icon className="w-3.5 h-3.5" /> {g.title.toUpperCase()}</div>
              {(g.items || []).map((it, ii) => <Bar key={ii} label={it.label} value={it.value} />)}
            </div>
          );
        })}
      </div>
    </section>
  );
}
