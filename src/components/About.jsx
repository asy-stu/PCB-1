import { useTranslation } from "react-i18next";
import { GraduationCap, Download, BookOpen } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function About() {
  const { t } = useTranslation();
  const stats = t("about.stats", { returnObjects: true }) || [];
  const timeline = t("about.timeline", { returnObjects: true }) || [];

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <SectionHeader icon={GraduationCap} eyebrow={t("about.eyebrow")} title={t("about.title")} />

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="fade-up">
          <p className="text-lg md:text-xl font-medium mb-5 site-accent">{t("about.headline")}</p>
          <p className="leading-relaxed mb-8" style={{ color: "var(--site-text-muted)" }}>{t("about.body")}</p>

          <button className="btn-ghost inline-flex items-center gap-2 px-5 py-3 text-xs mb-10">
            <Download className="w-4 h-4" /> {t("about.cv")}
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="card p-5 text-center">
                <div className="font-display font-bold text-3xl site-accent mb-1">{s.value}</div>
                <div className="text-xs" style={{ color: "var(--site-text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-7 md:p-8 fade-up">
          <div className="eyebrow mb-6"><BookOpen className="w-3.5 h-3.5" /> {t("about.timelineTitle")}</div>
          <div className="relative ps-6 border-s site-border space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <span className="absolute -start-[29px] top-0 w-3.5 h-3.5 rounded-full site-bg" style={{ border: "2px solid var(--site-accent)" }} />
                <span className="inline-block font-mono text-xs px-2 py-1 rounded border site-border mb-2 site-accent">{item.year}</span>
                <h4 className="font-display font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-sm mb-2" style={{ color: "var(--site-accent-2)" }}>{item.place}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--site-text-muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
