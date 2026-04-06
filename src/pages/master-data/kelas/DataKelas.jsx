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

// dummy data kelas
const dataKelas = [
  {
    id: 1,
    nama_kelas: "X IPA 1",
    jumlah_kelas: 30,
    wali_kelas: "Ahmad Fauzi",
    tanggal_dibuat: "2024-07-01",
  },
  {
    id: 2,
    nama_kelas: "X IPA 2",
    jumlah_kelas: 32,
    wali_kelas: "Siti Rahmawati",
    tanggal_dibuat: "2024-07-01",
  },
  {
    id: 3,
    nama_kelas: "X IPS 1",
    jumlah_kelas: 28,
    wali_kelas: "Budi Santoso",
    tanggal_dibuat: "2024-07-01",
  },
  {
    id: 4,
    nama_kelas: "X IPS 2",
    jumlah_kelas: 31,
    wali_kelas: "Maria Ulfa",
    tanggal_dibuat: "2024-07-01",
  },
  {
    id: 5,
    nama_kelas: "XI IPA 1",
    jumlah_kelas: 29,
    wali_kelas: "Hendra Wijaya",
    tanggal_dibuat: "2023-07-01",
  },
  {
    id: 6,
    nama_kelas: "XI IPA 2",
    jumlah_kelas: 30,
    wali_kelas: "Dewi Lestari",
    tanggal_dibuat: "2023-07-01",
  },
  {
    id: 7,
    nama_kelas: "XI IPS 1",
    jumlah_kelas: 27,
    wali_kelas: "Rudi Hartono",
    tanggal_dibuat: "2023-07-01",
  },
  {
    id: 8,
    nama_kelas: "XI IPS 2",
    jumlah_kelas: 33,
    wali_kelas: "Linda Sari",
    tanggal_dibuat: "2023-07-01",
  },
  {
    id: 9,
    nama_kelas: "XII IPA 1",
    jumlah_kelas: 28,
    wali_kelas: "Joko Prasetyo",
    tanggal_dibuat: "2022-07-01",
  },
  {
    id: 10,
    nama_kelas: "XII IPS 1",
    jumlah_kelas: 26,
    wali_kelas: "Sri Wahyuni",
    tanggal_dibuat: "2022-07-01",
  },
];

export default function DataKelas() {
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
            Kelas
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

              {/* filter guru berdasarkan kelas */}
              <BaseNativeSelect
                placeholder="Tanggal"
                options={[
                  { label: "Terbaru", value: "terbaru" },
                  { label: "Terlama", value: "terlama" }
                ]}
              />

              <BaseNativeSelect
                placeholder="Jumlah Siswa"
                options={[
                  { label: "Terbanyak", value: "terbanyak" },
                  { label: "Terendah", value: "terendah" }
                ]}
              />
            </Box>

            {/* search guru */}
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
                  Nama Kelas
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Jumlah Kelas
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Wali Kelas
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Tanggal Dibuat
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            {/* table body/content */}
            <Table.Body>
              {dataKelas.map((dk, i) => (
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
                      <Heading unstyled>{dk.nama_kelas}</Heading>

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
                  <Table.Cell fontFamily="poppins">{dk.jumlah_kelas}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{dk.wali_kelas}</Table.Cell>
                  <Table.Cell fontFamily="poppins">{dk.tanggal_dibuat}</Table.Cell>
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
