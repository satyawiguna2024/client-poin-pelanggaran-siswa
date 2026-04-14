import { Routes, Route, Navigate } from "react-router";
import { Dashboard, PelanggaranSiswa, Login, DataSiswa, DataGuru, DataKelas, DataJenisPelanggaran } from "./pages";
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
            <Route path="/pelanggaran-siswa" element={<PelanggaranSiswa />} />

            {/* Khusus Role Admin -> master data */}
            <Route path="/siswa" element={<DataSiswa />} />
            <Route path="/guru" element={<DataGuru />} />
            <Route path="/kelas" element={<DataKelas />} />
            <Route path="/jenis-pelanggaran" element={<DataJenisPelanggaran />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}