/* eslint-disable react-refresh/only-export-components */
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { findAllSiswa } from "../../services/dataUsers";
import { Box, Button, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import headerSmk from "../../assets/img/header.jpeg";

export default function LaporanDataSiswa() {
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
            LAPORAN DATA SISWA
          </Heading>
        </Box>

        <table style={tabelStyle}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={thStyle}>No</th>
              <th style={thStyle}>NIS</th>
              <th style={thStyle}>Nama Siswa</th>
              <th style={thStyle}>Jenis Kelamin</th>
              <th style={thStyle}>Kelas</th>
              <th style={thStyle}>Agama</th>
              <th style={thStyle}>Telepon</th>
              <th style={thStyle}>Alamat</th>
            </tr>
          </thead>
          <tbody>
            {(siswa ?? []).map((s, i) => (
              <tr key={s.nis}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{s.nis}</td>
                <td style={tdStyle}>{s.nama}</td>
                <td style={tdStyle}>{s.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</td>
                <td style={tdStyle}>{s.kelas?.nama_kelas ?? "-"}</td>
                <td style={tdStyle}>{s.agama}</td>
                <td style={tdStyle}>{s.telepon ?? "-"}</td>
                <td style={tdStyle}>{s.alamat ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <TandaTangan />
      </Box>
    </Box>
  );
}

// ─── Komponen bersama ─────────────────────────────────────────────────────────

export function KopSurat() {
  return (
    <div style={{ width: "100%", borderBottom: "3px solid black", marginBottom: "8px" }}>
      <img src={headerSmk} alt="Kop Surat SMK TI Bali Global" style={{ width: "100%", display: "block" }} />
    </div>
  );
}

export function TandaTangan() {
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div style={{ marginTop: "40px", display: "flex", justifyContent: "flex-end" }}>
      <div style={{ textAlign: "center", width: "200px" }}>
        <p style={{ margin: 0, fontSize: "12px" }}>Denpasar, {today}</p>
        <p style={{ margin: 0, fontSize: "12px" }}>Kepala Sekolah,</p>
        <div style={{ height: "60px" }} />
        <p style={{ margin: 0, borderTop: "1px solid black", fontSize: "12px", fontWeight: "bold" }}>
          (..........................)
        </p>
      </div>
    </div>
  );
}

// ─── Styles inline untuk tabel cetak ─────────────────────────────────────────

export const tabelStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "11px",
  fontFamily: "Arial, sans-serif",
};

export const thStyle = {
  border: "1px solid #333",
  padding: "6px 8px",
  textAlign: "center",
  fontWeight: "bold",
  background: "#f0f0f0",
};

export const tdStyle = {
  border: "1px solid #333",
  padding: "5px 8px",
  verticalAlign: "top",
};

// ─── Global print styles ──────────────────────────────────────────────────────

export function getPrintStyles() {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 11px; padding: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #333; padding: 5px 8px; }
    th { background: #f0f0f0; font-weight: bold; text-align: center; }
    @page { size: A4 landscape; margin: 1.5cm; }
  `;
}
