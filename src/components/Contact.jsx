import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { recordMessage } from "../lib/statsStore";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const f = t("contact.form", { returnObjects: true }) || {};
  const [status, setStatus] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const recipient = t("contact.emailValue");
    if (!recipient || recipient.includes("example.com")) {
      const messages = {
        ar: "أضف بريدك الحقيقي من لوحة التحكم أولًا حتى يعمل الإرسال.",
        en: "Add your real email in the dashboard first to enable sending.",
        tr: "Gönderimi etkinleştirmek için önce panelden gerçek e-postanızı ekleyin.",
      };
      setStatus(messages[i18n.language] || messages.en);
      return;
    }
    const data = new FormData(e.currentTarget);
    const subject = `PCB project request — ${data.get("name") || "Website visitor"}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Company: ${data.get("company") || ""}`,
      `Project: ${data.get("type") || ""}`,
      "",
      data.get("details") || "",
    ].join("\n");
    recordMessage();
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(i18n.language === "ar" ? "تم فتح تطبيق البريد لإكمال الإرسال." : i18n.language === "tr" ? "Gönderimi tamamlamak için e-posta uygulaması açıldı." : "Your email app was opened to complete sending.");
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
                <a className="font-bold ltr-only hover:site-accent transition-colors" href={`tel:${t("contact.phoneValue").replace(/\s/g, "")}`}>{t("contact.phoneValue")}</a>
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
              <input required name="name" autoComplete="name" className={inputCls} placeholder="John Doe" />
            </div>
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.email} *</label>
              <input required name="email" type="email" autoComplete="email" className={inputCls} placeholder="john@example.com" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.phone}</label>
              <input name="phone" type="tel" autoComplete="tel" className={inputCls} placeholder="+1 234 567 890" />
            </div>
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.company}</label>
              <input name="company" autoComplete="organization" className={inputCls} placeholder="SmartTech Solutions" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>{f.type} *</label>
              <select required name="type" className={inputCls}>
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
            <textarea required name="details" rows={4} className={inputCls} placeholder={f.detailsPh} />
          </div>
          <button type="submit" className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm">
            <Send className="w-4 h-4" /> {f.send}
          </button>
          {status && <p role="status" className="text-xs text-center site-accent flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4" />{status}</p>}
        </form>
      </div>
    </section>
  );
}
