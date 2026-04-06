import {
  Box,
  Heading,
  Stack,
  Input,
  InputGroup,
  Table,
  Checkbox,
  Button,
  Pagination,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import BaseDialog from "../../../components/dialogs/BaseDialog";
import BaseNativeSelect from "../../../components/forms/BaseNativeSelect";
import BaseButton from "../../../components/buttons/BaseButton";
import { CiSearch } from "react-icons/ci";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

// dummy data guru
const dataGuru = [
  {
    nuptk: "1234567890123456",
    nama: "Ahmad Fauzi",
    alamat: "Jl. Merdeka No. 10, Jakarta",
    tanggal_lahir: "1985-02-12",
    jenis_kelamin: "Laki-laki",
    agama: "Islam",
    telepon: "081234567800",
    jabatan: "Guru Matematika",
  },
  {
    nuptk: "1234567890123457",
    nama: "Siti Rahmawati",
    alamat: "Jl. Sudirman No. 21, Bandung",
    tanggal_lahir: "1987-05-23",
    jenis_kelamin: "Perempuan",
    agama: "Islam",
    telepon: "081234567801",
    jabatan: "Guru Bahasa Indonesia",
  },
  {
    nuptk: "1234567890123458",
    nama: "Budi Santoso",
    alamat: "Jl. Diponegoro No. 5, Surabaya",
    tanggal_lahir: "1983-07-14",
    jenis_kelamin: "Laki-laki",
    agama: "Kristen",
    telepon: "081234567802",
    jabatan: "Guru Fisika",
  },
  {
    nuptk: "1234567890123459",
    nama: "Maria Ulfa",
    alamat: "Jl. Ahmad Yani No. 8, Medan",
    tanggal_lahir: "1988-11-30",
    jenis_kelamin: "Perempuan",
    agama: "Katolik",
    telepon: "081234567803",
    jabatan: "Guru Biologi",
  },
  {
    nuptk: "1234567890123460",
    nama: "Hendra Wijaya",
    alamat: "Jl. Gatot Subroto No. 15, Semarang",
    tanggal_lahir: "1984-01-19",
    jenis_kelamin: "Laki-laki",
    agama: "Buddha",
    telepon: "081234567804",
    jabatan: "Guru Kimia",
  },
  {
    nuptk: "1234567890123461",
    nama: "Dewi Lestari",
    alamat: "Jl. Pemuda No. 3, Yogyakarta",
    tanggal_lahir: "1989-03-08",
    jenis_kelamin: "Perempuan",
    agama: "Islam",
    telepon: "081234567805",
    jabatan: "Guru Bahasa Inggris",
  },
  {
    nuptk: "1234567890123462",
    nama: "Rudi Hartono",
    alamat: "Jl. Veteran No. 12, Malang",
    tanggal_lahir: "1982-06-25",
    jenis_kelamin: "Laki-laki",
    agama: "Hindu",
    telepon: "081234567806",
    jabatan: "Guru Sejarah",
  },
  {
    nuptk: "1234567890123463",
    nama: "Linda Sari",
    alamat: "Jl. Imam Bonjol No. 7, Denpasar",
    tanggal_lahir: "1990-09-17",
    jenis_kelamin: "Perempuan",
    agama: "Islam",
    telepon: "081234567807",
    jabatan: "Guru Ekonomi",
  },
  {
    nuptk: "1234567890123464",
    nama: "Joko Prasetyo",
    alamat: "Jl. Teuku Umar No. 9, Makassar",
    tanggal_lahir: "1981-12-05",
    jenis_kelamin: "Laki-laki",
    agama: "Kristen",
    telepon: "081234567808",
    jabatan: "Guru Geografi",
  },
  {
    nuptk: "1234567890123465",
    nama: "Sri Wahyuni",
    alamat: "Jl. Asia Afrika No. 11, Bandung",
    tanggal_lahir: "1986-04-21",
    jenis_kelamin: "Perempuan",
    agama: "Islam",
    telepon: "081234567809",
    jabatan: "Guru Seni Budaya",
  },
];

export default function DataGuru() {

  return (
    <>
      <Box py="10">
        {/* title & button add new */}
        <Stack direction="row" alignItems="center">
          <Heading
            unstyled
            color="text.primary"
            fontFamily="poppins"
            fontWeight="medium"
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            Guru
          </Heading>
          {/* dialog component */}
          <BaseDialog />
        </Stack>

        {/* action button*/}
        <Box mt="16">
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flexDir={{ base: "column", md: "row" }}
              alignItems={{ base: "start", md: "center" }}
              gap="2"
              width={{ base: "auto", md: "800px" }}
            >
              {/* bulk action: delete all dengan cara di select -> apply */}
              <BaseNativeSelect
                placeholder="Aksi"
                options={[{ label: "Delete", value: "delete" }]}
              />

              <BaseButton
                mr="8"
                width={{ base: "full", md: "auto" }}
                label="Terapkan"
              />

              {/* filter siswa berdasarkan kelas */}
              <BaseNativeSelect
                placeholder="Jabatan"
                options={[
                  { label: "Guru Matematika", value: "guru_matematika" },
                  { label: "Guru Bahasa Indonesia", value: "guru_bahasa_indonesia" },
                  { label: "Guru Fisika", value: "guru_fisika" },
                  { label: "Guru Biologi", value: "guru_biologi" },
                  { label: "Guru Bahasa Inggris", value: "guru_bahasa_inggris" },
                  { label: "Guru Ekonomi", value: "guru_ekonomi" }
                ]}
              />

              {/* filter siswa berdasarkan agama */}
              <BaseNativeSelect
                placeholder="Agama"
                options={[
                  { label: "Hindu", value: "hindu" },
                  { label: "Islam", value: "islam" },
                  { label: "Kristen", value: "kristen" },
                  { label: "Kristen Katolik", value: "kristen katolik" },
                  { label: "Buddha", value: "buddha" },
                  { label: "Konghucu", value: "konghucu" },
                ]}
              />

              {/* filter siswa berdasarkan jenis kelamin */}
              <BaseNativeSelect
                placeholder="Jenis Kelamin"
                options={[
                  { label: "Laki Laki", value: "laki_laki" },
                  { label: "Perempuan", value: "perempuan" },
                ]}
              />
            </Box>

            {/* search siswa */}
            <Box>
              <Stack direction="row">
                <InputGroup startElement={<CiSearch size={22} />}>
                  <Input
                    placeholder="Search"
                    w="full"
                    bg="white"
                    borderColor="gray.300"
                    color="text.primary"
                    fontFamily="poppins"
                    _placeholder={{ color: { _dark: "gray.400" } }}
                  />
                </InputGroup>
                <BaseButton label="Search" width="auto" />
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* table */}
        <Box mt="5" width="full" bg="blue.300">
          <Table.Root
            border="1px solid"
            borderColor="gray.300"
            shadow="0px 4px 12px var(--chakra-colors-gray-200)"
          >
            <Table.Header>
              <Table.Row bg="white">
                <Table.ColumnHeader w="6">
                  <Checkbox.Root size="md">
                    {/* aksi checkbox */}
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.ColumnHeader>

                {/* table column: Product | Category | Price */}
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Nuptk
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
                  Alamat
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
                  Jenis Kelamin
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
                  No HP
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Jabatan
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            {/* table body/content */}
            <Table.Body>
              {dataGuru.map((dg, i) => (
                <Table.Row
                  key={i}
                  bg={i % 2 === 0 ? "gray.100" : "white"}
                  className="group"
                  color="text.primary"
                  role="group"
                >
                  <Table.Cell>
                    <Checkbox.Root size="md">
                      {/* aksi checkbox */}
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Table.Cell>
                  <Table.Cell fontFamily="poppins">
                    <Stack gap="2">
                      <Heading unstyled>{dg.nuptk}</Heading>

                      {/* action */}
                      <Stack
                        direction="row"
                        gap="3"
                        opacity={0}
                        _groupHover={{ opacity: 1 }}
                        transition="0.2s"
                      >
                        <Button
                          unstyled
                          size="xs"
                          color="blue"
                          cursor="pointer"
                        >
                          Update
                        </Button>
                        <Button unstyled size="xs" color="red" cursor="pointer">
                          Delete
                        </Button>
                      </Stack>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell fontFamily="poppins">{dg.nama}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{dg.alamat}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{dg.tanggal_lahir}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{dg.jenis_kelamin}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{dg.agama}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{dg.telepon}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{dg.jabatan}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        {/* pagination | total items */}
        <Box mt="5">
          <Stack
            direction={{ base: "column-reverse", sm: "row" }}
            justifyContent={{ base: "center", sm: "space-between" }}
            alignItems={{ base: "center", md: "center" }}
          >
            <Pagination.Root count={20} pageSize={2} defaultPage={1}>
              <ButtonGroup variant="outline" size="sm">
                <Pagination.PrevTrigger asChild>
                  <IconButton
                    _dark={{ color: "text.primary", _hover: { bg: "white" } }}
                  >
                    <LuChevronLeft />
                  </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                  render={(page) => (
                    <IconButton
                      variant={{ base: "outline", _selected: "solid" }}
                      _dark={{ color: "text.primary", _hover: { bg: "white" } }}
                    >
                      {page.value}
                    </IconButton>
                  )}
                />

                <Pagination.NextTrigger asChild>
                  <IconButton
                    _dark={{ color: "text.primary", _hover: { bg: "white" } }}
                  >
                    <LuChevronRight />
                  </IconButton>
                </Pagination.NextTrigger>
              </ButtonGroup>
            </Pagination.Root>

            <Heading unstyled color="text.primary" fontFamily="poppins">
              10 Items
            </Heading>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
