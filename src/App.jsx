import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import { SiteProvider } from "./context/SiteContext";

export default function App() {
  return (
    <SiteProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </SiteProvider>
  );
}
