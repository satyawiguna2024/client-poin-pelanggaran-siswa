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
import BaseDialog from "../../components/dialogs/BaseDialog";
import BaseNativeSelect from "../../components/forms/BaseNativeSelect";
import BaseButton from "../../components/buttons/BaseButton";
import { CiSearch } from "react-icons/ci";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

// dummy data siswa
const dataSiswa = [
  {
    nis: "1001",
    nama_ortu: "Budi Santoso",
    nama_kelas: "X IPA 1",
    alamat: "Jl. Merdeka No. 10, Jakarta",
    tanggal_lahir: "2008-01-15",
    agama: "Islam",
    telepon: "081234567890",
  },
  {
    nis: "1002",
    nama_ortu: "Siti Aminah",
    nama_kelas: "X IPA 2",
    alamat: "Jl. Sudirman No. 21, Bandung",
    tanggal_lahir: "2008-03-22",
    agama: "Islam",
    telepon: "081234567891",
  },
  {
    nis: "1003",
    nama_ortu: "Agus Salim",
    nama_kelas: "X IPS 1",
    alamat: "Jl. Diponegoro No. 5, Surabaya",
    tanggal_lahir: "2008-05-10",
    agama: "Kristen",
    telepon: "081234567892",
  },
  {
    nis: "1004",
    nama_ortu: "Maria Dewi",
    nama_kelas: "X IPS 2",
    alamat: "Jl. Ahmad Yani No. 8, Medan",
    tanggal_lahir: "2008-07-18",
    agama: "Katolik",
    telepon: "081234567893",
  },
  {
    nis: "1005",
    nama_ortu: "Hendra Wijaya",
    nama_kelas: "XI IPA 1",
    alamat: "Jl. Gatot Subroto No. 15, Semarang",
    tanggal_lahir: "2007-09-25",
    agama: "Buddha",
    telepon: "081234567894",
  },
  {
    nis: "1006",
    nama_ortu: "Dewi Lestari",
    nama_kelas: "XI IPA 2",
    alamat: "Jl. Pemuda No. 3, Yogyakarta",
    tanggal_lahir: "2007-11-02",
    agama: "Islam",
    telepon: "081234567895",
  },
  {
    nis: "1007",
    nama_ortu: "Rudi Hartono",
    nama_kelas: "XI IPS 1",
    alamat: "Jl. Veteran No. 12, Malang",
    tanggal_lahir: "2007-02-14",
    agama: "Hindu",
    telepon: "081234567896",
  },
  {
    nis: "1008",
    nama_ortu: "Linda Sari",
    nama_kelas: "XI IPS 2",
    alamat: "Jl. Imam Bonjol No. 7, Denpasar",
    tanggal_lahir: "2007-04-30",
    agama: "Islam",
    telepon: "081234567897",
  },
  {
    nis: "1009",
    nama_ortu: "Joko Prasetyo",
    nama_kelas: "XII IPA 1",
    alamat: "Jl. Teuku Umar No. 9, Makassar",
    tanggal_lahir: "2006-06-12",
    agama: "Kristen",
    telepon: "081234567898",
  },
  {
    nis: "1010",
    nama_ortu: "Sri Wahyuni",
    nama_kelas: "XII IPS 1",
    alamat: "Jl. Asia Afrika No. 11, Bandung",
    tanggal_lahir: "2006-08-20",
    agama: "Islam",
    telepon: "081234567899",
  },
];

export default function StudentViolations() {
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
            Pelanggaran Siswa
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
                placeholder="Kelas"
                options={[
                  { label: "XII RPL 1", value: "xii_rpl_1" },
                  { label: "XII RPL 2", value: "xii_rpl_2" },
                  { label: "XII RPL 3", value: "xii_rpl_3" },
                  { label: "XII RPL 4", value: "xii_rpl_4" },
                  { label: "XII RPL 5", value: "xii_rpl_5" },
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
        <Box mt="5" width="full" bg="blue.300" overflowX="auto">
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
                  Nis
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Nama Ortu
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
              </Table.Row>
            </Table.Header>

            {/* table body/content */}
            <Table.Body>
              {dataSiswa.map((ds, i) => (
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
                      <Heading unstyled>{ds.nis}</Heading>

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
                  <Table.Cell fontFamily="poppins">{ds.nama_ortu}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{ds.nama_kelas}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{ds.alamat}</Table.Cell>
                  <Table.Cell fontFamily="poppins">
                    {ds.tanggal_lahir}
                  </Table.Cell>
                  <Table.Cell fontFamily="poppins">{ds.agama}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{ds.telepon}</Table.Cell>
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
            <Pagination.Root count={8} pageSize={2} defaultPage={1}>
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
