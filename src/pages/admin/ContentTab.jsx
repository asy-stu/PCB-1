import { useEffect, useState } from "react";
import { Save, RotateCcw, Code2, ListChecks, CheckCircle2 } from "lucide-react";
import { getMergedContent, saveLanguageContent, resetLanguageContent } from "../../lib/contentStore";
import { getPath, setPath } from "../../lib/pathUtils";

const LANGS = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
];

const QUICK_FIELDS = [
  { path: "meta.siteName", label: "اسم الموقع / الاسم الشخصي" },
  { path: "meta.tagline", label: "الوصف المختصر (Tagline)" },
  { path: "hero.name", label: "اسم البطل (Hero Name)" },
  { path: "hero.role", label: "المسمى الوظيفي" },
  { path: "hero.desc", label: "وصف قسم البداية", type: "textarea" },
  { path: "about.headline", label: "عنوان نبذة عني" },
  { path: "about.body", label: "نص نبذة عني", type: "textarea" },
  { path: "contact.emailValue", label: "البريد الإلكتروني" },
  { path: "contact.phoneValue", label: "رقم الهاتف / واتساب" },
  { path: "footer.desc", label: "وصف الفوتر", type: "textarea" },
];

export default function ContentTab() {
  const [lang, setLang] = useState("ar");
  const [content, setContent] = useState(getMergedContent("ar"));
  const [rawText, setRawText] = useState("");
  const [showRaw, setShowRaw] = useState(false);
  const [rawError, setRawError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const c = getMergedContent(lang);
    setContent(c);
    setRawText(JSON.stringify(c, null, 2));
    setRawError("");
  }, [lang]);

  const flash = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const updateField = (path, value) => {
    setContent((prev) => setPath(prev, path, value));
  };

  const saveQuick = () => {
    saveLanguageContent(lang, content);
    setRawText(JSON.stringify(content, null, 2));
    flash();
  };

  const saveRaw = () => {
    try {
      const parsed = JSON.parse(rawText);
      saveLanguageContent(lang, parsed);
      setContent(parsed);
      setRawError("");
      flash();
    } catch {
      setRawError("صيغة JSON غير صحيحة، تأكد من الأقواس والفواصل");
    }
  };

  const resetLang = () => {
    const base = resetLanguageContent(lang);
    setContent(base);
    setRawText(JSON.stringify(base, null, 2));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className="px-4 py-2 rounded-full text-xs font-mono border"
              style={
                lang === l.code
                  ? { background: "var(--site-accent)", color: "#04140d", borderColor: "var(--site-accent)" }
                  : { borderColor: "var(--site-border)", color: "var(--site-text-muted)" }
              }
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs flex items-center gap-1 site-accent"><CheckCircle2 className="w-3.5 h-3.5" /> تم الحفظ</span>}
          <button onClick={resetLang} className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> استعادة النص الأصلي
          </button>
          <button onClick={() => setShowRaw((v) => !v)} className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5">
            {showRaw ? <ListChecks className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
            {showRaw ? "الحقول السريعة" : "محرر JSON متقدم"}
          </button>
        </div>
      </div>

      {!showRaw ? (
        <div className="card p-6 space-y-5">
          {QUICK_FIELDS.map((f) => (
            <div key={f.path}>
              <label className="block text-xs font-mono mb-2" style={{ color: "var(--site-text-muted)" }}>{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={getPath(content, f.path) ?? ""}
                  onChange={(e) => updateField(f.path, e.target.value)}
                  className="w-full site-bg-elevated border site-border rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--site-accent)]"
                />
              ) : (
                <input
                  type="text"
                  value={getPath(content, f.path) ?? ""}
                  onChange={(e) => updateField(f.path, e.target.value)}
                  className="w-full site-bg-elevated border site-border rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--site-accent)]"
                />
              )}
            </div>
          ))}
          <button onClick={saveQuick} className="btn-primary px-6 py-3 text-sm flex items-center gap-2">
            <Save className="w-4 h-4" /> حفظ التعديلات
          </button>
        </div>
      ) : (
        <div className="card p-6">
          <p className="text-xs mb-3" style={{ color: "var(--site-text-muted)" }}>
            تحكم كامل في كل نصوص القسم (الخدمات، الأسئلة الشائعة، آراء العملاء...) بصيغة JSON. احذر من كسر الصيغة.
          </p>
          <textarea
            rows={22}
            dir="ltr"
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            className="w-full site-bg-elevated border site-border rounded-lg px-4 py-3 text-xs font-mono outline-none focus:border-[var(--site-accent)]"
          />
          {rawError && <p className="text-xs text-red-400 mt-2">{rawError}</p>}
          <button onClick={saveRaw} className="btn-primary px-6 py-3 text-sm flex items-center gap-2 mt-4">
            <Save className="w-4 h-4" /> حفظ JSON
          </button>
        </div>
      )}
    </div>
  );
}
