import { Routes, Route, Navigate } from "react-router";
import {
  Dashboard, PelanggaranSiswa, Login,
  DataSiswa, DataGuru, DataKelas, DataJenisPelanggaran,
  LaporanDataSiswa, LaporanPerSiswa, LaporanDataPelanggaran, LaporanDataGuru, LaporanOrtuSiswa, LaporanRekapPoinPelanggaran,
} from "./pages";
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
        <Route element={<ProtectedRouteDashboard />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pelanggaran-siswa" element={<PelanggaranSiswa />} />

            {/* Master Data */}
            <Route path="/siswa" element={<DataSiswa />} />
            <Route path="/guru" element={<DataGuru />} />
            <Route path="/kelas" element={<DataKelas />} />
            <Route path="/jenis-pelanggaran" element={<DataJenisPelanggaran />} />

            {/* Laporan */}
            <Route path="/laporan/data-siswa" element={<LaporanDataSiswa />} />
            <Route path="/laporan/data-guru" element={<LaporanDataGuru />} />
            <Route path="/laporan/data-orangtua" element={<LaporanOrtuSiswa />} />
            <Route path="/laporan/data-pelanggaran" element={<LaporanDataPelanggaran />} />
            <Route path="/laporan/rekap-poin" element={<LaporanRekapPoinPelanggaran />} />
            <Route path="/laporan/per-siswa" element={<LaporanPerSiswa />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}