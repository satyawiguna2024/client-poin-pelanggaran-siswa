import Login from "./authentication/Login";
import Dashboard from "./dashboard/Dashboard";
import Profile from "./profile/Profile";

// master data
import DataSiswa from "./master-data/siswa/DataSiswa";
import DataGuru from "./master-data/guru/DataGuru";
import DataKelas from "./master-data/kelas/DataKelas";
import DataJenisPelanggaran from "./master-data/jenis-pelanggaran/DataJenisPelanggaran";
import PelanggaranSiswa from "./pelanggaran-siswa/PelanggaranSiswa";

// laporan
import LaporanDataSiswa from "./laporan/LaporanDataSiswa";
import LaporanDataPelanggaran from "./laporan/LaporanDataPelanggaran";
import LaporanPerSiswa from "./laporan/LaporanPerSiswa";
import LaporanDataGuru from "./laporan/LaporanDataGuru";
import LaporanOrtuSiswa from "./laporan/LaporanOrtuSiswa";
import LaporanRekapPoinPelanggaran from "./laporan/LaporanRekapPoinPelanggaran";

export {
  Dashboard, Profile, PelanggaranSiswa, Login,
  DataSiswa, DataGuru, DataKelas, DataJenisPelanggaran,
  LaporanDataSiswa, LaporanDataPelanggaran, LaporanPerSiswa, LaporanDataGuru, LaporanOrtuSiswa, LaporanRekapPoinPelanggaran,
};
