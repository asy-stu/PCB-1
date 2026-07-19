import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { Eye, MessageSquare, Languages, TrendingUp } from "lucide-react";
import { getStats } from "../../lib/statsStore";

const LANG_COLORS = { ar: "#4ee6a8", en: "#4fc3f7", tr: "#f5a623" };

export default function OverviewTab() {
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    setStats(getStats());
  }, []);

  const visitData = stats.visits.map((v) => ({ date: v.date.slice(5), visits: v.count }));
  const langData = Object.entries(stats.langUsage).map(([lang, count]) => ({ name: lang.toUpperCase(), value: count }));

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-3 gap-5">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono" style={{ color: "var(--site-text-muted)" }}>إجمالي الزيارات</span>
            <Eye className="w-4 h-4 site-accent" />
          </div>
          <p className="font-display font-bold text-3xl">{stats.totalVisits}</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono" style={{ color: "var(--site-text-muted)" }}>رسائل التواصل</span>
            <MessageSquare className="w-4 h-4 site-accent" />
          </div>
          <p className="font-display font-bold text-3xl">{stats.totalMessages}</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono" style={{ color: "var(--site-text-muted)" }}>اللغات المستخدمة</span>
            <Languages className="w-4 h-4 site-accent" />
          </div>
          <p className="font-display font-bold text-3xl">{Object.keys(stats.langUsage).length || 0}</p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-4 h-4 site-accent" />
          <h3 className="font-display font-bold">الزيارات خلال آخر الأيام</h3>
        </div>
        {visitData.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={visitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--site-border)" />
              <XAxis dataKey="date" stroke="var(--site-text-muted)" fontSize={12} />
              <YAxis stroke="var(--site-text-muted)" fontSize={12} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "var(--site-bg-elevated)", border: "1px solid var(--site-border)", borderRadius: 8, color: "var(--site-text)" }} />
              <Line type="monotone" dataKey="visits" stroke="var(--site-accent)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm" style={{ color: "var(--site-text-muted)" }}>لا توجد بيانات زيارات بعد.</p>
        )}
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold mb-6">توزيع استخدام اللغات</h3>
        {langData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={langData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
                {langData.map((d, i) => <Cell key={i} fill={LANG_COLORS[d.name.toLowerCase()] || "#93a3ae"} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--site-bg-elevated)", border: "1px solid var(--site-border)", borderRadius: 8, color: "var(--site-text)" }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm" style={{ color: "var(--site-text-muted)" }}>لا توجد بيانات بعد.</p>
        )}
      </div>
    </div>
  );
}
