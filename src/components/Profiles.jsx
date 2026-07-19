import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link2, Briefcase, Code2, ExternalLink, Mail, Phone, Send, ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const ICONS = { LinkedIn: Briefcase, GitHub: Code2, Email: Mail, WhatsApp: Phone, Telegram: Send };

export default function Profiles() {
  const { t } = useTranslation();
  const filters = t("profiles.filters", { returnObjects: true }) || [];
  const items = t("profiles.items", { returnObjects: true }) || [];
  const [active, setActive] = useState(0);
  const groups = [items, items.slice(2, 5), items.slice(0, 2), items.slice(5)];
  const visibleItems = groups[active] || items;

  return (
    <section id="profiles" className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <SectionHeader icon={Link2} eyebrow={t("profiles.eyebrow")} title={t("profiles.title")} />

      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((f, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="px-4 py-2 rounded-full text-xs font-mono border"
            style={
              active === i
                ? { background: "var(--site-accent)", color: "#04140d", borderColor: "var(--site-accent)" }
                : { borderColor: "var(--site-border)", color: "var(--site-text-muted)" }
            }
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {visibleItems.map((item, i) => {
          const Icon = ICONS[item.name] || ExternalLink;
          const isGitHub = item.name.toLowerCase() === "github";
          const href = isGitHub ? "https://github.com/asy-stu" : "#contact";
          return (
            <a key={`${active}-${i}`} href={href} target={isGitHub ? "_blank" : undefined} rel={isGitHub ? "noreferrer" : undefined} className="card p-6 flex flex-col fade-up focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]">
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-lg border site-border flex items-center justify-center site-accent">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="font-mono text-[10px] px-2 py-1 rounded border site-border" style={{ color: "var(--site-text-muted)" }}>
                  {item.tag}
                </span>
              </div>
              <h4 className="font-display font-bold text-lg mb-2">{item.name}</h4>
              <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--site-text-muted)" }}>{item.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono site-accent">
                {t("profiles.open")} <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
