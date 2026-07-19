import { useTranslation } from "react-i18next";
import { Laptop, Cpu, ShieldCheck } from "lucide-react";
import SectionHeader from "./SectionHeader";

function ToolCard({ tool }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-display font-bold text-lg">{tool.name}</h4>
        <span className="font-mono text-xs px-2.5 py-1 rounded" style={{ background: "color-mix(in srgb, var(--site-accent) 18%, transparent)", color: "var(--site-accent)" }}>
          {tool.score}
        </span>
      </div>
      <p className="font-mono text-xs mb-3" style={{ color: "var(--site-accent-2)" }}>{tool.level}</p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--site-text-muted)" }}>{tool.desc}</p>
    </div>
  );
}

export default function SoftwareTools() {
  const { t } = useTranslation();
  const eda = t("software.eda", { returnObjects: true }) || [];
  const sim = t("software.sim", { returnObjects: true }) || [];

  return (
    <section id="software" className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <SectionHeader icon={Laptop} eyebrow={t("software.eyebrow")} title={t("software.title")} />

      <div className="mb-12">
        <div className="eyebrow mb-6"><Cpu className="w-3.5 h-3.5" /> {t("software.edaTitle")}</div>
        <div className="grid md:grid-cols-3 gap-6">
          {eda.map((tool, i) => <ToolCard key={i} tool={tool} />)}
        </div>
      </div>

      <div>
        <div className="eyebrow mb-6"><ShieldCheck className="w-3.5 h-3.5" /> {t("software.simTitle")}</div>
        <div className="grid md:grid-cols-2 gap-6">
          {sim.map((tool, i) => <ToolCard key={i} tool={tool} />)}
        </div>
      </div>
    </section>
  );
}
