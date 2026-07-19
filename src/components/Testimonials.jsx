import { useTranslation } from "react-i18next";
import { MessageCircle, Star, Quote } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Testimonials() {
  const { t } = useTranslation();
  const items = t("testimonials.items", { returnObjects: true }) || [];

  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <SectionHeader
        icon={MessageCircle}
        eyebrow={t("testimonials.eyebrow")}
        title={t("testimonials.title")}
        right={
          <span className="font-mono text-[11px] px-3 py-1.5 rounded-full border" style={{ borderColor: "#f5a623", color: "#f5a623" }}>
            {t("testimonials.demo")}
          </span>
        }
      />

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="card p-7 relative fade-up">
            <Quote className="absolute top-6 end-6 w-8 h-8 opacity-10" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star key={si} className="w-4 h-4" fill="#f5a623" color="#f5a623" />
              ))}
            </div>
            <p className="italic text-sm leading-relaxed mb-6" style={{ color: "var(--site-text-muted)" }}>“{item.text}”</p>
            <div className="border-t site-border pt-4">
              <p className="font-display font-bold">{item.name}</p>
              <p className="text-xs mb-1" style={{ color: "var(--site-accent-2)" }}>{item.role}</p>
              <p className="text-[11px] font-mono" style={{ color: "var(--site-text-muted)" }}>{item.project} · {item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
