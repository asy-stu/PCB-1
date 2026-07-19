import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, Download, Upload, Trash2, LogOut, CheckCircle2 } from "lucide-react";
import { getOverrides } from "../../lib/contentStore";
import { getTheme, saveTheme, applyThemeToDOM } from "../../lib/themeStore";

export default function SettingsTab() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState("");

  const changePassword = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem("admin_password") || "admin123";
    if (current !== stored) {
      setMsg("كلمة المرور الحالية غير صحيحة");
      return;
    }
    if (next.length < 4) {
      setMsg("كلمة المرور الجديدة قصيرة جداً");
      return;
    }
    localStorage.setItem("admin_password", next);
    setMsg("تم تغيير كلمة المرور بنجاح");
    setCurrent(""); setNext("");
  };

  const exportConfig = () => {
    const data = { content: getOverrides(), theme: getTheme() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "site-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importConfig = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.content) localStorage.setItem("site_content_overrides", JSON.stringify(data.content));
        if (data.theme) { saveTheme(data.theme); applyThemeToDOM(data.theme); }
        setMsg("تم استيراد الإعدادات، أعد تحميل الصفحة لتطبيقها بالكامل");
      } catch {
        setMsg("ملف غير صالح");
      }
    };
    reader.readAsText(file);
  };

  const resetAll = () => {
    if (!confirm("هل أنت متأكد؟ سيتم مسح كل التعديلات (النصوص + الألوان + الإحصائيات)")) return;
    ["site_theme", "site_content_overrides", "site_stats_visits_log", "site_stats_messages_log", "site_stats_lang_usage"].forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  };

  const logout = () => {
    sessionStorage.removeItem("admin_auth");
    navigate("/admin/login");
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-6">
          <KeyRound className="w-4 h-4 site-accent" />
          <h3 className="font-display font-bold">تغيير كلمة مرور اللوحة</h3>
        </div>
        <form onSubmit={changePassword} className="grid sm:grid-cols-2 gap-5 max-w-xl">
          <input type="password" placeholder="كلمة المرور الحالية" value={current} onChange={(e) => setCurrent(e.target.value)}
            className="site-bg-elevated border site-border rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--site-accent)]" />
          <input type="password" placeholder="كلمة المرور الجديدة" value={next} onChange={(e) => setNext(e.target.value)}
            className="site-bg-elevated border site-border rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--site-accent)]" />
          <button type="submit" className="btn-primary px-6 py-3 text-sm sm:col-span-2 w-fit">حفظ كلمة المرور</button>
        </form>
        {msg && <p className="text-xs mt-3 flex items-center gap-1.5 site-accent"><CheckCircle2 className="w-3.5 h-3.5" /> {msg}</p>}
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold mb-2">تصدير / استيراد الإعدادات</h3>
        <p className="text-xs mb-5" style={{ color: "var(--site-text-muted)" }}>
          احفظ نسخة من كل تعديلاتك (النصوص + الألوان) كملف JSON، أو استوردها على جهاز آخر — مفيد قبل ربط الموقع بسيرفر حقيقي.
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={exportConfig} className="btn-ghost px-5 py-2.5 text-xs flex items-center gap-2">
            <Download className="w-4 h-4" /> تصدير الإعدادات
          </button>
          <label className="btn-ghost px-5 py-2.5 text-xs flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" /> استيراد الإعدادات
            <input type="file" accept=".json" onChange={importConfig} className="hidden" />
          </label>
        </div>
      </div>

      <div className="card p-6 border-red-900/50">
        <h3 className="font-display font-bold mb-2 text-red-400">منطقة الخطر</h3>
        <p className="text-xs mb-5" style={{ color: "var(--site-text-muted)" }}>مسح كل التعديلات والعودة للإعدادات الافتراضية للموقع بالكامل.</p>
        <button onClick={resetAll} className="px-5 py-2.5 rounded-lg text-xs font-mono flex items-center gap-2 border border-red-900 text-red-400 hover:bg-red-950/30">
          <Trash2 className="w-4 h-4" /> إعادة ضبط الموقع بالكامل
        </button>
      </div>

      <button onClick={logout} className="btn-ghost px-5 py-2.5 text-xs flex items-center gap-2">
        <LogOut className="w-4 h-4" /> تسجيل الخروج
      </button>
    </div>
  );
}
