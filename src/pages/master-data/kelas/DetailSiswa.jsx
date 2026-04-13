import { Box, Table} from "@chakra-ui/react";
import BaseDialog from "../../../components/dialogs/BaseDialog";
import { useShowByIdKelas } from "../../../hooks/useDataKelas";

export default function DetailSiswa({id, namaKelas}) {
  const {getByIdDataKelas, isPendingGetByIdDataKelas} = useShowByIdKelas(id);

  const kelas = getByIdDataKelas;
  const siswa = kelas?.siswa || [];

  if(isPendingGetByIdDataKelas) return <h1>Loading...</h1>

  return (
    <>
      <BaseDialog
        variant="ghost" 
        labelButton="Detail" 
        size="cover"
        title={namaKelas}
      >
        {/* table */}
        <Box position="relative" mt="5" width="full" rounded="xl" shadow="sm" bg="white">
          {/* box table */}
          <Box overflowX="auto" p={{ base: "0", md: "4" }}>
            <Table.Root
              whiteSpace="nowrap"
              variant="line"
              border="1px solid"
              borderColor="gray.200"
              rounded="lg"
            >
            <Table.Header>
              <Table.Row bg="white">
                {/* table column: Product | Category | Price */}
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  No
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Nis
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Nama
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Kelas
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Tanggal Lahir
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Agama
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Jenis Kelamin
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  No HP Siswa
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Nama Wali
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            {/* table body/content */}
            <Table.Body>
              {siswa.map((ds, i) => (
                <Table.Row
                  key={i}
                  bg={i % 2 === 0 ? "gray.100" : "white"}
                  className="group"
                  color="text.primary"
                  role="group"
                >
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{i+1}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.nis}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.nama}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{kelas?.nama_kelas}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.tanggal_lahir}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.agama}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.jenis_kelamin == "L" ? "Laki-Laki" : "Perempuan"}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.telepon}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{kelas?.guru?.nama}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          </Box>

          {/* Shadow Overlay untuk indikator scroll horizontal */}
          <Box position="absolute" top="0" right="0" bottom="0" width={{ base: "20px", md: "35px" }} bg="linear-gradient(to left, rgba(0,0,0,0.1), transparent)" pointerEvents="none" borderRightRadius={{ base: "none", md: "xl"}} />
        </Box>
      </BaseDialog>
    </>
  )
}
