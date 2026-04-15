import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { findAll } from "../../services/dataPelanggaranSiswa";
import { Box, Button, Heading, Spinner, Stack } from "@chakra-ui/react";
import { KopSurat, TandaTangan, tabelStyle, thStyle, tdStyle, getPrintStyles } from "./LaporanDataSiswa";

export default function LaporanRekapPoinPelanggaran() {
  const printRef = useRef();
  const { data: pelanggaran, isPending } = useQuery({
    queryKey: ["pelanggaran-siswas"],
    queryFn: findAll,
  });

  const handlePrint = () => {

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
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    win.document.close();
  };

  if (isPending) return <Box py="20" textAlign="center"><Spinner /></Box>;

  // ── LOGIKA AGGREGASI: Menghitung total poin per siswa ──
  const rekapData = (() => {
    const groups = {};
    (pelanggaran ?? []).forEach((p) => {
      const nis = p.siswa?.nis;
      if (!nis) return;

      if (!groups[nis]) {
        groups[nis] = {
          nis: nis,
          nama: p.siswa?.nama || "-",
          kelas: p.siswa?.kelas?.nama_kelas || "-",
          total_poin: 0,
          jumlah_pelanggaran: 0
        };
      }

      // Tambahkan poin dan hitung berapa kali melanggar
      groups[nis].total_poin += Number(p.jenis_pelanggaran?.poin || 0);
      groups[nis].jumlah_pelanggaran += 1;
    });

    // Ubah object kembali ke array dan urutkan berdasarkan poin tertinggi
    return Object.values(groups).sort((a, b) => b.total_poin - a.total_poin);
  })();

  return (
    <Box py="10">
      <Stack direction="row" justifyContent="flex-end" mb="6">
        <Button onClick={handlePrint} colorScheme="blue" fontFamily="poppins">
          🖨 Cetak Laporan
        </Button>
      </Stack>

      <Box ref={printRef}>
        <KopSurat />
        <Box mt="6" mb="4" textAlign="center">
          <Heading as="h2" fontSize="md" textAlign="center" fontFamily="poppins" textDecoration="underline">
            REKAPITULASI POIN PELANGGARAN SISWA
          </Heading>
        </Box>

        <table style={tabelStyle}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={thStyle}>No</th>
              <th style={thStyle}>NIS</th>
              <th style={thStyle}>Nama Siswa</th>
              <th style={thStyle}>Kelas</th>
              <th style={thStyle}>Jumlah Pelanggaran</th>
              <th style={thStyle}>Total Poin</th>
            </tr>
          </thead>
          <tbody>
            {rekapData.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ ...tdStyle, textAlign: "center" }}>Tidak ada data</td>
              </tr>
            ) : (
              rekapData.map((item, i) => (
                <tr key={item.nis}>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{i + 1}</td>
                  <td style={tdStyle}>{item.nis}</td>
                  <td style={tdStyle}>{item.nama}</td>
                  <td style={tdStyle}>{item.kelas}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{item.jumlah_pelanggaran} Kali</td>
                  <td style={{ ...tdStyle, textAlign: "center", fontWeight: "bold" }}>
                    {item.total_poin}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <TandaTangan />
      </Box>
    </Box>
  );
}
