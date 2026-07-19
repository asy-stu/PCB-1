import { useTranslation } from "react-i18next";
import { Wrench, Cpu, Layers, Grid3x3, SlidersHorizontal, Activity, ShieldCheck } from "lucide-react";
import SectionHeader from "./SectionHeader";

const ICONS = [Cpu, Layers, Grid3x3, SlidersHorizontal, Activity, ShieldCheck];

export default function Services() {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) || [];

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <SectionHeader icon={Wrench} eyebrow={t("services.eyebrow")} title={t("services.title")} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div key={i} className="card p-7 flex flex-col fade-up">
              <div className="w-12 h-12 rounded-xl border site-border flex items-center justify-center mb-5 site-accent">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--site-text-muted)" }}>{item.desc}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {(item.points || []).map((p, pi) => (
                  <li key={pi} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 site-accent" style={{ background: "var(--site-accent)" }} />
                    <span style={{ color: "var(--site-text-muted)" }}>{p}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-ghost text-center py-2.5 text-xs font-mono">{t("services.requestBtn")}</a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
