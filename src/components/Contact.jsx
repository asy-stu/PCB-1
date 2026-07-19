import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, UploadCloud, Send, CheckCircle2 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { recordMessage } from "../lib/statsStore";

export default function Contact() {
  const { t } = useTranslation();
  const f = t("contact.form", { returnObjects: true }) || {};
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    recordMessage();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.target.reset();
  };

  const inputCls = "w-full site-bg-elevated border site-border rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--site-accent)] transition-colors placeholder:text-[var(--site-text-muted)]";

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <SectionHeader icon={Mail} eyebrow={t("contact.eyebrow")} title={t("contact.title")} />

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="fade-up">
          <h3 className="font-display font-bold text-2xl mb-4">{t("contact.subtitle")}</h3>
          <p className="leading-relaxed mb-8" style={{ color: "var(--site-text-muted)" }}>{t("contact.desc")}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl border site-border flex items-center justify-center shrink-0 site-accent"><Mail className="w-5 h-5" /></span>
              <div>
                <p className="text-xs font-mono mb-0.5" style={{ color: "var(--site-text-muted)" }}>{t("contact.emailLabel")}</p>
                <a className="font-bold ltr-only hover:site-accent transition-colors" href={`mailto:${t("contact.emailValue")}`}>{t("contact.emailValue")}</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl border site-border flex items-center justify-center shrink-0 site-accent"><Phone className="w-5 h-5" /></span>
              <div>
                <p className="text-xs font-mono mb-0.5" style={{ color: "var(--site-text-muted)" }}>{t("contact.phoneLabel")}</p>
                <a className="font-bold ltr-only hover:site-accent transition-colors" href={`tel:${t("contact.phoneValue").replace(/\\s/g, "")}`}>{t("contact.phoneValue")}</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl border site-border flex items-center justify-center shrink-0 site-accent"><MapPin className="w-5 h-5" /></span>
              <div>
                <p className="text-xs font-mono mb-0.5" style={{ color: "var(--site-text-muted)" }}>{t("contact.locationLabel")}</p>
                <p className="font-bold">{t("contact.locationValue")}</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="card p-7 md:p-8 space-y-5 fade-up">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.name} *</label>
              <input required className={inputCls} placeholder="John Doe" />
            </div>
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.email} *</label>
              <input required type="email" className={inputCls} placeholder="john@example.com" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.phone}</label>
              <input className={inputCls} placeholder="+1 234 567 890" />
            </div>
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.company}</label>
              <input className={inputCls} placeholder="SmartTech Solutions" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.type} *</label>
              <select required className={inputCls}>
                <option value="">{f.select}</option>
                <option>Schematic Design</option>
                <option>PCB Layout</option>
                <option>DRC Review</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.budget}</label>
              <select className={inputCls}><option>{f.flexible}</option></select>
            </div>
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.deadline}</label>
              <select className={inputCls}><option>{f.flexible}</option></select>
            </div>
          </div>
          <div>
            <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.details} *</label>
            <textarea required rows={4} className={inputCls} placeholder={f.detailsPh} />
          </div>
          <div>
            <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.attach}</label>
            <div className="border border-dashed site-border rounded-xl p-8 text-center">
              <UploadCloud className="w-6 h-6 mx-auto mb-3 site-accent" />
              <p className="text-sm mb-1">{f.drop}</p>
              <p className="text-xs" style={{ color: "var(--site-text-muted)" }}>{f.supports}</p>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm">
            {sent ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            {sent ? "✓" : f.send}
          </button>
        </form>
      </div>
    </section>
  );
}
