import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem("admin_password") || "admin123";
    if (password === stored) {
      sessionStorage.setItem("admin_auth", "1");
      navigate("/admin");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--site-bg)", color: "var(--site-text)" }}>
      <form onSubmit={submit} className="card w-full max-w-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--site-accent), var(--site-accent-2))" }}>
            <Cpu className="w-6 h-6" color="#04140d" />
          </span>
          <div>
            <p className="font-display font-bold">لوحة تحكم الموقع</p>
            <p className="text-xs font-mono" style={{ color: "var(--site-text-muted)" }}>Admin Dashboard</p>
          </div>
        </div>

        <label className="block font-mono text-xs mb-2" style={{ color: "var(--site-text-muted)" }}>كلمة المرور</label>
        <div className="relative mb-2">
          <Lock className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3" style={{ color: "var(--site-text-muted)" }} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full site-bg-elevated border site-border rounded-lg ps-10 pe-4 py-3 text-sm outline-none focus:border-[var(--site-accent)]"
            placeholder="••••••••"
            autoFocus
          />
        </div>
        {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
        <p className="text-xs mb-6" style={{ color: "var(--site-text-muted)" }}>
          الافتراضي: <span className="font-mono site-accent">admin123</span> — يمكنك تغييرها من إعدادات اللوحة
        </p>
        <button type="submit" className="btn-primary w-full py-3 text-sm">دخول</button>
      </form>
    </div>
  );
}
