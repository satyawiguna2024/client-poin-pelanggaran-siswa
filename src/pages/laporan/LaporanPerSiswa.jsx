import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { findAll } from "../../services/dataPelanggaranSiswa";
import { findAllSiswa } from "../../services/dataUsers";
import {
  Box,
  Button,
  Heading,
  Spinner,
  Stack,
  Text,
  NativeSelect,
} from "@chakra-ui/react";
import { KopSurat, TandaTangan, tabelStyle, thStyle, tdStyle, getPrintStyles } from "./LaporanDataSiswa";

export default function LaporanPerSiswa() {
  // ── State: NIS siswa yang dipilih ──
  const [selectedNis, setSelectedNis] = useState("");
  const printRef = useRef();

  // ── Fetch semua siswa (untuk dropdown) ──
  const { data: semuaSiswa, isPending: isPendingSiswa } = useQuery({
    queryKey: ["get-all-siswa"],
    queryFn: findAllSiswa,
  });

  // ── Fetch semua data pelanggaran ──
  const { data: semuaPelanggaran, isPending: isPendingPelanggaran } = useQuery({
    queryKey: ["pelanggaran-siswas"],
    queryFn: findAll,
  });

  // ── Filter pelanggaran hanya untuk siswa yang dipilih ──
  const pelanggaranSiswaIni = (semuaPelanggaran ?? []).filter(
    (p) => p.siswa?.nis === selectedNis
  );

  // ── Hitung total poin siswa terpilih ──
  const totalPoin = pelanggaranSiswaIni.reduce(
    (acc, p) => acc + Number(p.jenis_pelanggaran?.poin ?? 0),
    0
  );

  // ── Data siswa terpilih ──
  const siswaDetail = (semuaSiswa ?? []).find((s) => s.nis === selectedNis);

  const handlePrint = () => {
    if (!selectedNis) {
      alert("Pilih siswa terlebih dahulu!");
      return;
    }

    const printContents = printRef.current.innerHTML;
    const win = window.open("", "_blank");

    win.document.write(`
      <html>
        <head>
          <title>Laporan Data Siswa</title>
          <style>${getPrintStyles()}</style>
        </head>
        <body>
          <center>
            ${printContents}
          </center>
          <script>
            // Tunggu semua resources (gambar, dll) selesai dimuat
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    win.document.close();
  };

  const isLoading = isPendingSiswa || isPendingPelanggaran;

  return (
    <Box py="10">
      {/* ── Panel Pilih Siswa (TIDAK tercetak) ── */}
      <Box
        bg="white"
        rounded="xl"
        shadow="sm"
        p="6"
        mb="8"
        border="1px solid"
        borderColor="gray.200"
      >
        <Heading
          as="h3"
          fontSize="lg"
          fontFamily="poppins"
          fontWeight="semibold"
          color="gray.700"
          mb="4"
        >
          Pilih Siswa untuk Dicetak
        </Heading>

        <Stack direction={{ base: "column", md: "row" }} gap="4" alignItems="flex-end">
          {/* Dropdown pilih siswa */}
          <Box flex="1">
            <Text fontFamily="poppins" fontSize="sm" color="gray.600" mb="1">
              Nama / NIS Siswa
            </Text>
            <NativeSelect.Root>
              <NativeSelect.Field
                fontFamily="poppins"
                value={selectedNis}
                onChange={(e) => setSelectedNis(e.target.value)}
                bg="white"
                borderColor="gray.300"
              >
                <option value="">-- Pilih Siswa --</option>
                {(semuaSiswa ?? []).map((s) => (
                  <option key={s.nis} value={s.nis}>
                    {s.nis} — {s.nama} ({s.kelas?.nama_kelas ?? "Tidak ada kelas"})
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>

          {/* Tombol cetak */}
          <Button
            onClick={handlePrint}
            disabled={!selectedNis || isLoading}
            colorScheme="blue"
            fontFamily="poppins"
            px="8"
          >
            🖨 Cetak Laporan
          </Button>
        </Stack>

        {/* Info singkat siswa terpilih */}
        {siswaDetail && (
          <Box mt="4" p="3" bg="blue.50" rounded="lg" borderLeft="4px solid" borderColor="blue.400">
            <Stack direction="row" gap="6" flexWrap="wrap">
              <Text fontFamily="poppins" fontSize="sm"><b>Nama:</b> {siswaDetail.nama}</Text>
              <Text fontFamily="poppins" fontSize="sm"><b>NIS:</b> {siswaDetail.nis}</Text>
              <Text fontFamily="poppins" fontSize="sm"><b>Kelas:</b> {siswaDetail.kelas?.nama_kelas ?? "-"}</Text>
              <Text fontFamily="poppins" fontSize="sm"><b>Total Poin:</b>
                <Text as="span" color={totalPoin >= 100 ? "red.500" : "green.600"} fontWeight="bold" ml="1">
                  {totalPoin} poin
                </Text>
              </Text>
              <Text fontFamily="poppins" fontSize="sm"><b>Jumlah Pelanggaran:</b> {pelanggaranSiswaIni.length}x</Text>
            </Stack>
          </Box>
        )}
      </Box>

      {isLoading && <Box textAlign="center" py="10"><Spinner /></Box>}

      {/* ── Area Pratinjau & Cetak ── */}
      {selectedNis && !isLoading && (
        <Box ref={printRef}>
          <KopSurat />

          {/* Judul */}
          <Box mt="6" mb="4" textAlign="center">
            <Heading as="h2" fontSize="md" fontFamily="poppins" textDecoration="underline">
              LAPORAN POIN PELANGGARAN SISWA
            </Heading>
          </Box>

          {/* Identitas Siswa */}
          <table style={{ ...tabelStyle, marginBottom: "16px" }}>
            <tbody>
              <tr>
                <td style={{ ...tdStyle, width: "150px", fontWeight: "bold" }}>Nama Siswa</td>
                <td style={{ ...tdStyle, width: "10px" }}>:</td>
                <td style={tdStyle}>{siswaDetail?.nama}</td>
                <td style={{ ...tdStyle, width: "150px", fontWeight: "bold" }}>Kelas</td>
                <td style={{ ...tdStyle, width: "10px" }}>:</td>
                <td style={tdStyle}>{siswaDetail?.kelas?.nama_kelas ?? "-"}</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: "bold" }}>NIS</td>
                <td style={tdStyle}>:</td>
                <td style={tdStyle}>{siswaDetail?.nis}</td>
                <td style={{ ...tdStyle, fontWeight: "bold" }}>Jenis Kelamin</td>
                <td style={tdStyle}>:</td>
                <td style={tdStyle}>{siswaDetail?.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: "bold" }}>Agama</td>
                <td style={tdStyle}>:</td>
                <td style={tdStyle}>{siswaDetail?.agama}</td>
                <td style={{ ...tdStyle, fontWeight: "bold" }}>Total Poin</td>
                <td style={tdStyle}>:</td>
                <td style={{ ...tdStyle, fontWeight: "bold", color: totalPoin >= 100 ? "red" : "black" }}>
                  {totalPoin} Poin
                </td>
              </tr>
            </tbody>
          </table>

          {/* Tabel Riwayat Pelanggaran */}
          <table style={tabelStyle}>
            <thead>
              <tr>
                <th style={thStyle}>No</th>
                <th style={thStyle}>Tanggal</th>
                <th style={thStyle}>Jenis Pelanggaran</th>
                <th style={thStyle}>Poin</th>
                <th style={thStyle}>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {pelanggaranSiswaIni.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ ...tdStyle, textAlign: "center" }}>
                    Tidak ada data pelanggaran
                  </td>
                </tr>
              ) : (
                pelanggaranSiswaIni.map((p, i) => (
                  <tr key={p.id}>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{i + 1}</td>
                    <td style={tdStyle}>{p.tanggal}</td>
                    <td style={tdStyle}>{p.jenis_pelanggaran?.nama_pelanggaran ?? "-"}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{p.jenis_pelanggaran?.poin ?? 0}</td>
                    <td style={tdStyle}>{p.keterangan ?? "-"}</td>
                  </tr>
                ))
              )}
              {/* Baris total */}
              <tr>
                <td colSpan={3} style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}>
                  TOTAL POIN
                </td>
                <td style={{ ...tdStyle, textAlign: "center", fontWeight: "bold", color: totalPoin >= 100 ? "red" : "black" }}>
                  {totalPoin}
                </td>
                <td style={tdStyle} />
              </tr>
            </tbody>
          </table>

          <TandaTangan />
        </Box>
      )}

      {/* Placeholder jika belum pilih siswa */}
      {!selectedNis && !isLoading && (
        <Box textAlign="center" py="20" color="gray.400" fontFamily="poppins">
          <Text fontSize="4xl">📋</Text>
          <Text mt="2">Pilih siswa di atas untuk melihat pratinjau laporan</Text>
        </Box>
      )}
    </Box>
  );
}
