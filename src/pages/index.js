import Login from "./authentication/Login";
import Dashboard from "./dashboard/Dashboard";
import Profile from "./profile/Profile";
import StudentViolations from "./pelanggaran-siswa/PelanggaranSiswa";

// master data
import DataSiswa from "./master-data/siswa/DataSiswa";
import DataGuru from "./master-data/guru/DataGuru";
import DataKelas from "./master-data/kelas/DataKelas";
import DataJenisPelanggaran from "./master-data/jenis-pelanggaran/DataJenisPelanggaran";

export  {   Dashboard, Profile, StudentViolations, Login,
            DataSiswa, DataGuru, DataKelas, DataJenisPelanggaran,
        };
