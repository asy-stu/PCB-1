import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image as ImageIcon, ScanLine } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Gallery() {
  const { t } = useTranslation();
  const filters = t("gallery.filters", { returnObjects: true }) || [];
  const items = t("gallery.items", { returnObjects: true }) || [];
  const [active, setActive] = useState(0);
  const categoryIndexes = [items.map((_, index) => index), [0], [4], [2], [1, 3, 5]];
  const visibleItems = (categoryIndexes[active] || categoryIndexes[0]).map((index) => items[index]).filter(Boolean);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <SectionHeader icon={ImageIcon} eyebrow={t("gallery.eyebrow")} title={t("gallery.title")} />

      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((f, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="px-4 py-2 rounded-full text-xs font-mono border transition-colors"
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleItems.map((item, i) => (
          <article key={`${active}-${i}`} className="card overflow-hidden group fade-up">
            <div
              className="aspect-[4/3] relative flex items-end p-5"
              style={{
                background: `linear-gradient(150deg, color-mix(in srgb, var(--site-accent) ${12 + (i % 4) * 4}%, var(--site-bg-elevated)), var(--site-bg))`,
              }}
            >
              <ScanLine className="absolute top-4 end-4 w-5 h-5 opacity-40 site-accent" />
              <span className="font-medium text-sm relative z-10">{item.title}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
