import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { findAllGuru } from "../../services/dataUsers";
import { Box, Button, Heading, Spinner, Stack } from "@chakra-ui/react";
import { KopSurat, TandaTangan, getPrintStyles, tabelStyle, tdStyle, thStyle } from "./LaporanDataSiswa";

export default function LaporanDataGuru() {
  const printRef = useRef();
  const { data: guru, isPending } = useQuery({
    queryKey: ["get-all-guru"],
    queryFn: findAllGuru,
  });

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    
    // Tulis HTML dasar
    win.document.write(`
      <html>
        <head>
          <title>Laporan Data Guru</title>
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
            LAPORAN DATA GURU
          </Heading>
        </Box>

        <table style={tabelStyle}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={thStyle}>No</th>
              <th style={thStyle}>Nuptk</th>
              <th style={thStyle}>Nama Guru</th>
              <th style={thStyle}>Jenis Kelamin</th>
              <th style={thStyle}>Agama</th>
              <th style={thStyle}>Alamat</th>
              <th style={thStyle}>Telepon</th>
            </tr>
          </thead>
          <tbody>
            {(guru ?? []).map((g, i) => (
              <tr key={g.nuptk}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{g.nuptk}</td>
                <td style={tdStyle}>{g.nama}</td>
                <td style={tdStyle}>{g.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</td>
                <td style={tdStyle}>{g.agama}</td>
                <td style={tdStyle}>{g.alamat ?? "-"}</td>
                <td style={tdStyle}>{g.telepon ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <TandaTangan />
      </Box>
    </Box>
  );
}