import { useTranslation } from "react-i18next";
import { Zap, Cpu, Layers, ArrowDown } from "lucide-react";
import CircuitBackground from "./CircuitBackground";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="hero-stage relative min-h-[92vh] flex items-center overflow-hidden pt-10">\n      <div className="hero-grid" aria-hidden="true" />\n      <div className="hero-orb hero-orb-one" aria-hidden="true" />\n      <div className="hero-orb hero-orb-two" aria-hidden="true" />\n      <div className="hero-scan" aria-hidden="true" />
      <CircuitBackground className="absolute -top-10 -end-20 w-[560px] h-[380px] hidden md:block" opacity={0.4} />
      <CircuitBackground className="absolute -bottom-16 -start-24 w-[520px] h-[360px] hidden md:block rotate-12" opacity={0.25} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(60% 50% at 50% 20%, color-mix(in srgb, var(--site-accent) 8%, transparent), transparent)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center hero-content">
        <div className="hero-reveal hero-delay-1 inline-flex items-center gap-2 px-4 py-2 rounded-full border site-border mb-8 site-bg-elevated">
          <Zap className="w-3.5 h-3.5 site-accent" />
          <span className="eyebrow">{t("hero.badge")}</span>
        </div>

        <h1 className="hero-reveal hero-delay-2 hero-title font-display font-bold text-5xl md:text-7xl mb-4 tracking-tight">
          {t("hero.name")}
        </h1>
        <p className="hero-reveal hero-delay-3 font-display font-semibold text-2xl md:text-4xl mb-6 animated-gradient" style={{ background: "linear-gradient(90deg, var(--site-accent), var(--site-accent-2))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          {t("hero.role")}
        </p>
        <p className="hero-reveal hero-delay-4 max-w-2xl mx-auto text-base md:text-lg mb-10" style={{ color: "var(--site-text-muted)" }}>
          {t("hero.desc")}
        </p>

        <div className="hero-reveal hero-delay-5 flex flex-wrap items-center justify-center gap-3 mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border site-border font-mono text-xs site-bg-elevated">
            <Cpu className="w-3.5 h-3.5 site-accent" /> {t("hero.tag1")}
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border site-border font-mono text-xs site-bg-elevated">
            <Layers className="w-3.5 h-3.5 site-accent" /> {t("hero.tag2")}
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border site-border font-mono text-xs site-bg-elevated">
            <Zap className="w-3.5 h-3.5 site-accent" /> {t("hero.tag3")}
          </span>
        </div>

        <div className="hero-reveal hero-delay-6 flex flex-wrap items-center justify-center gap-4">
          <a href="#gallery" className="btn-primary px-8 py-3.5 text-sm">{t("hero.cta1")}</a>
          <a href="#contact" className="btn-ghost px-8 py-3.5 text-sm">{t("hero.cta2")}</a>
        </div>

        <a href="#about" className="mt-16 inline-flex items-center justify-center w-11 h-11 rounded-full border site-border animate-bounce">
          <ArrowDown className="w-4 h-4" style={{ color: "var(--site-text-muted)" }} />
        </a>
      </div>
    </section>
  );
}
