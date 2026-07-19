import { useTranslation } from "react-i18next";
import { Cpu, ShieldCheck, ArrowUp } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t site-border site-bg-elevated">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--site-accent), var(--site-accent-2))" }}>
              <Cpu className="w-5 h-5" color="#04140d" />
            </span>
            <span className="font-display font-bold text-lg">{t("meta.siteName")}</span>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--site-text-muted)" }}>{t("footer.desc")}</p>
          <div className="inline-flex items-center gap-2 text-xs font-mono site-accent">
            <ShieldCheck className="w-4 h-4" /> {t("footer.drc")}
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest mb-5" style={{ color: "var(--site-text-muted)" }}>{t("footer.navTitle").toUpperCase()}</h4>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <a href="#about" style={{ color: "var(--site-text-muted)" }}>{t("nav.about")}</a>
            <a href="#services" style={{ color: "var(--site-text-muted)" }}>{t("nav.services")}</a>
            <a href="#gallery" style={{ color: "var(--site-text-muted)" }}>{t("nav.gallery")}</a>
            <a href="#skills" style={{ color: "var(--site-text-muted)" }}>{t("nav.skills")}</a>
            <a href="#faq" style={{ color: "var(--site-text-muted)" }}>FAQ</a>
            <a href="#contact" style={{ color: "var(--site-text-muted)" }}>{t("nav.contact")}</a>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest mb-5" style={{ color: "var(--site-text-muted)" }}>{t("footer.accessTitle").toUpperCase()}</h4>
          <p className="text-sm mb-4" style={{ color: "var(--site-text-muted)" }}>{t("footer.accessDesc")}</p>
          <a href="#contact" className="site-accent text-sm font-medium ltr-only">{t("contact.emailValue")}</a>
        </div>
      </div>

      <div className="border-t site-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs" style={{ color: "var(--site-text-muted)" }}>© {year} {t("meta.siteName")}. {t("footer.rights")}</p>
          <a href="#home" className="btn-ghost inline-flex items-center gap-1.5 px-4 py-2 text-xs">
            {t("footer.backTop")} <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
