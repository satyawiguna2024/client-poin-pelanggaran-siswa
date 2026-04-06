import { Routes, Route, Navigate } from "react-router";
import { Dashboard, StudentViolations, Login, DataSiswa, DataGuru } from "./pages";
import { ProtectedRouteDashboard, ProtectedRouteForm } from "./components/layouts/Protected";
import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";

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

            {/* Khusus Role Admin -> master data */}
            <Route path="/siswa" element={<DataSiswa />} />
            <Route path="/guru" element={<DataGuru />} />
            <Route path="/kelas" element={<h1>Data Kelas</h1>} />
            <Route path="/jenis-pelanggaran" element={<h1>Data Jenis Pelanggaran</h1>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}