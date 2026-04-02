import { Routes, Route, Navigate } from "react-router";
import { Dashboard, StudentViolations, Login } from "./pages";
import { ProtectedRouteDashboard, ProtectedRouteForm } from "./layouts/Protected";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

export default function App() {
  return(
    <>
      <Routes>
        {/* authentications */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* protected forms */}
        <Route element={<ProtectedRouteForm />}>
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
          </Route>
        </Route>

        {/* root pages */}
        {/* protected root pages */}
        <Route element={<ProtectedRouteDashboard />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pelanggaran-siswa" element={<StudentViolations />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}