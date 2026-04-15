import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { findAllSiswa } from "../../services/dataUsers";
import { Box, Button, Heading, Spinner, Stack } from "@chakra-ui/react";
import { KopSurat, TandaTangan, getPrintStyles, tabelStyle, tdStyle, thStyle } from "./LaporanDataSiswa";

export default function LaporanOrtuSiswa() {
  const printRef = useRef();
  const { data: siswa, isPending } = useQuery({
    queryKey: ["get-all-siswa"],
    queryFn: findAllSiswa,
  });

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    
    // Tulis HTML dasar
    win.document.write(`
      <html>
        <head>
          <title>Laporan Data Ortu Siswa</title>
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
      {/* Tombol print — tidak ikut tercetak */}
      <Stack direction="row" justifyContent="flex-end" mb="6" className="no-print">
        <Button onClick={handlePrint} colorScheme="blue" fontFamily="poppins">
          🖨 Cetak Laporan
        </Button>
      </Stack>

      {/* Area yang akan dicetak */}
      <Box ref={printRef}>
        <KopSurat />
        <Box mt="6" mb="4" textAlign="center">
          <Heading as="h2" fontSize="md" textAlign="center" fontFamily="poppins" textDecoration="underline">
            LAPORAN DATA ORTU SISWA
          </Heading>
        </Box>

        <table style={tabelStyle}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={thStyle}>No</th>
              <th style={thStyle}>Nis</th>
              <th style={thStyle}>Nama Siswa</th>
              <th style={thStyle}>Nama Ortu Siswa</th>
              <th style={thStyle}>Alamat</th>
              <th style={thStyle}>Telepon Ortu</th>
            </tr>
          </thead>
          <tbody>
            {siswa?.map((s, i) => (
              <tr key={s.nis}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{s?.nis}</td>
                <td style={tdStyle}>{s?.nama}</td>
                <td style={tdStyle}>{s?.data_ortu?.nama_ayah}</td>
                <td style={tdStyle}>{s?.alamat}</td>
                <td style={tdStyle}>{s?.data_ortu?.telepon_ayah}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <TandaTangan />
      </Box>
    </Box>
  );
}