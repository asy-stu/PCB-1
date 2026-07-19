import { lazy, Suspense } from "react";
import { HashRouter, Navigate, Routes, Route } from "react-router-dom";
import { SiteProvider } from "./context/SiteContext";

const Home = lazy(() => import("./pages/Home"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

function PageLoader() {
  return <div className="page-loader" role="status" aria-label="Loading"><span /></div>;
}

export default function App() {
  return (
    <SiteProvider>
      <HashRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </SiteProvider>
  );
}
