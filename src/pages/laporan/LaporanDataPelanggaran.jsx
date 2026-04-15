import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { findAll } from "../../services/dataPelanggaranSiswa";
import { Box, Button, Heading, Spinner, Stack } from "@chakra-ui/react";
import { KopSurat, TandaTangan, tabelStyle, thStyle, tdStyle, getPrintStyles } from "./LaporanDataSiswa";

export default function LaporanDataPelanggaran() {
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
          <Heading as="h2" fontSize="md" fontFamily="poppins" textDecoration="underline">
            LAPORAN DATA PELANGGARAN SISWA
          </Heading>
        </Box>

        <table style={tabelStyle}>
          <thead>
            <tr>
              <th style={thStyle}>No</th>
              <th style={thStyle}>Tanggal</th>
              <th style={thStyle}>NIS</th>
              <th style={thStyle}>Nama Siswa</th>
              <th style={thStyle}>Kelas</th>
              <th style={thStyle}>Jenis Pelanggaran</th>
            </tr>
          </thead>
          <tbody>
            {(pelanggaran ?? []).map((p, i) => (
              <tr key={p.id}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{p.tanggal}</td>
                <td style={tdStyle}>{p.siswa?.nis ?? "-"}</td>
                <td style={tdStyle}>{p.siswa?.nama ?? "-"}</td>
                <td style={tdStyle}>{p.siswa?.kelas?.nama_kelas ?? "-"}</td>
                <td style={tdStyle}>{p.jenis_pelanggaran?.nama_pelanggaran ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <TandaTangan />
      </Box>
    </Box>
  );
}
