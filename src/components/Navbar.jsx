import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Cpu, Menu, X, Globe, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useSite } from "../context/SiteContext";

const LINKS = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "services", href: "#services" },
  { id: "gallery", href: "#gallery" },
  { id: "skills", href: "#skills" },
  { id: "process", href: "#process" },
  { id: "profiles", href: "#profiles" },
  { id: "contact", href: "#contact" },
];

const LANGS = [
  { code: "ar", label: "AR" },
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { lang, changeLanguage, colorMode, toggleColorMode } = useSite();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "site-bg-elevated/95 backdrop-blur border-b site-border" : "border-b border-transparent"
      }`}
      style={{ backgroundColor: scrolled ? "color-mix(in srgb, var(--site-bg-elevated) 92%, transparent)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <span
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--site-accent), var(--site-accent-2))" }}
          >
            <Cpu className="w-6 h-6" color="#04140d" strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="block font-display font-bold text-lg">{t("meta.siteName")}</span>
            <span className="block font-mono text-[11px] site-accent tracking-widest">{t("meta.tagline").toUpperCase()}</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1 font-mono text-sm">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className="px-3 py-2 rounded-lg transition-colors hover:site-accent"
              style={{ color: "var(--site-text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-text-muted)")}
            >
              {t(`nav.${l.id}`)}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleColorMode} className="theme-toggle" aria-label={colorMode === "dark" ? "Light mode" : "Dark mode"} title={colorMode === "dark" ? "Light mode" : "Dark mode"}>
            <span className="theme-toggle-icon">{colorMode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="btn-ghost flex items-center gap-2 px-3 py-2 text-xs"
            >
              <Globe className="w-4 h-4" />
              {LANGS.find((l) => l.code === lang)?.label}
            </button>
            {langOpen && (
              <div className="absolute mt-2 end-0 site-bg-elevated border site-border rounded-xl overflow-hidden w-28 shadow-xl">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { changeLanguage(l.code); setLangOpen(false); }}
                    className="w-full text-start px-4 py-2 text-xs font-mono hover:bg-white/5"
                    style={{ color: lang === l.code ? "var(--site-accent)" : "var(--site-text)" }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href="#contact" className="btn-primary flex items-center gap-1.5 px-5 py-2.5 text-xs">
            {t("nav.talk")} <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden site-bg-elevated border-t site-border px-5 py-4 flex flex-col gap-1 font-mono text-sm">
          {LINKS.map((l) => (
            <a key={l.id} href={l.href} onClick={() => setOpen(false)} className="py-2.5" style={{ color: "var(--site-text-muted)" }}>
              {t(`nav.${l.id}`)}
            </a>
          ))}
          <button onClick={toggleColorMode} className="theme-toggle w-full mt-2 mb-2" aria-label="Toggle color mode">
            <span className="theme-toggle-icon">{colorMode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</span>
            <span className="font-mono text-xs">{colorMode === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
          <div className="flex gap-2 pt-3">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                className="btn-ghost px-3 py-1.5 text-xs flex-1"
                style={{ color: lang === l.code ? "var(--site-accent)" : "var(--site-text)" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
