import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HelpCircle, ChevronDown } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function FAQ() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) || [];
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <SectionHeader icon={HelpCircle} eyebrow={t("faq.eyebrow")} title={t("faq.title")} center />

      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="card overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-start"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-medium">{item.q}</span>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} style={{ color: "var(--site-accent)" }} />
              </button>
              {isOpen && (
                <div id={`faq-answer-${i}`} className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
