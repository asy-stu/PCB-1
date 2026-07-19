import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { LayoutDashboard, Palette, FileText, Settings, Cpu, ExternalLink } from "lucide-react";
import OverviewTab from "./OverviewTab";
import ThemeTab from "./ThemeTab";
import ContentTab from "./ContentTab";
import SettingsTab from "./SettingsTab";

const TABS = [
  { id: "overview", label: "نظرة عامة", icon: LayoutDashboard, Comp: OverviewTab },
  { id: "content", label: "المحتوى والنصوص", icon: FileText, Comp: ContentTab },
  { id: "theme", label: "الألوان والخطوط", icon: Palette, Comp: ThemeTab },
  { id: "settings", label: "الإعدادات", icon: Settings, Comp: SettingsTab },
];

export default function Dashboard() {
  const [authed, setAuthed] = useState(null);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    setAuthed(sessionStorage.getItem("admin_auth") === "1");
  }, []);

  if (authed === null) return null;
  if (!authed) return <Navigate to="/admin/login" replace />;

  const ActiveComp = TABS.find((t) => t.id === tab)?.Comp || OverviewTab;

  return (
    <div className="min-h-screen flex" style={{ background: "var(--site-bg)", color: "var(--site-text)" }} dir="rtl">
      <aside className="w-64 shrink-0 site-bg-elevated border-e site-border p-6 hidden md:flex md:flex-col">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--site-accent), var(--site-accent-2))" }}>
            <Cpu className="w-5 h-5" color="#04140d" />
          </span>
          <div>
            <p className="font-display font-bold text-sm">لوحة التحكم</p>
            <p className="text-[11px] font-mono" style={{ color: "var(--site-text-muted)" }}>Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-start transition-colors"
              style={
                tab === t.id
                  ? { background: "color-mix(in srgb, var(--site-accent) 12%, transparent)", color: "var(--site-accent)" }
                  : { color: "var(--site-text-muted)" }
              }
            >
              <t.icon className="w-4.5 h-4.5" /> {t.label}
            </button>
          ))}
        </nav>

        <Link to="/" className="btn-ghost flex items-center gap-2 px-4 py-3 text-xs mt-6">
          <ExternalLink className="w-4 h-4" /> عرض الموقع
        </Link>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="shrink-0 px-4 py-2 rounded-full text-xs font-mono border"
              style={
                tab === t.id
                  ? { background: "var(--site-accent)", color: "#04140d", borderColor: "var(--site-accent)" }
                  : { borderColor: "var(--site-border)", color: "var(--site-text-muted)" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
        <h1 className="font-display font-bold text-2xl mb-8">{TABS.find((t) => t.id === tab)?.label}</h1>
        <ActiveComp />
      </main>
    </div>
  );
}
