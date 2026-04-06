import { Box, Heading, Stack, Input, InputGroup, Table, Checkbox, Button, Pagination, IconButton, ButtonGroup } from "@chakra-ui/react";
import BaseDialog from "../../../components/dialogs/BaseDialog";
import BaseNativeSelect from "../../../components/forms/BaseNativeSelect";
import BaseButton from "../../../components/buttons/BaseButton";
import { CiSearch } from "react-icons/ci";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
// import { useFindAllSiswa } from "../../../hooks/useDataUsers";

export default function DataSiswa() {
  // const { findAllDataSiswa, isPendingFindAllSiswa } = useFindAllSiswa();

  // if (isPendingFindAllSiswa) console.warn("loading...");
  // console.log("data siswa: ", findAllDataSiswa);

  return (
    <>
      <Box mt="5">
        {/* title & button add new */}
        <Stack direction="row" alignItems="center">
          <Heading
            unstyled
            color="text.primary"
            fontFamily="poppins"
            fontWeight="medium"
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            Siswa
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

              <BaseButton mr="8" width={{base: "full", md: "auto"}} label="Terapkan" />

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
                  Product
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Category
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Price
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Date
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            {/* table body/content */}
            <Table.Body>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
                <Table.Row key={i} bg={i % 2 === 0 ? "gray.100" : "white"} className="group" color="text.primary" role="group">
                  <Table.Cell>
                    <Checkbox.Root size="md">
                      {/* aksi checkbox */}
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Table.Cell>
                  <Table.Cell fontFamily="poppins">
                    <Stack gap="2">
                      <Heading unstyled>Laptop</Heading>

                      {/* action */}
                      <Stack direction="row" gap="3" opacity={0} _groupHover={{ opacity: 1 }} transition="0.2s">
                        <Button unstyled size="xs" color="blue" cursor="pointer">
                          Update
                        </Button>
                        <Button unstyled size="xs" color="red" cursor="pointer">
                          Delete
                        </Button>
                      </Stack>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell fontFamily="poppins">Electronics</Table.Cell>
                  <Table.Cell fontFamily="poppins">Rp. 120.000.000</Table.Cell>
                  <Table.Cell fontFamily="poppins">2026-09-25</Table.Cell>
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
                  <IconButton _dark={{color: "text.primary", _hover: {bg: "white"}}}>
                    <LuChevronLeft />
                  </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                  render={(page) => (
                    <IconButton
                      variant={{ base: "outline", _selected: "solid" }}
                      _dark={{color: "text.primary", _hover: {bg: "white"}}}
                    >
                      {page.value}
                    </IconButton>
                  )}
                />

                <Pagination.NextTrigger asChild>
                  <IconButton _dark={{color: "text.primary", _hover: {bg: "white"}}}>
                    <LuChevronRight />
                  </IconButton>
                </Pagination.NextTrigger>
              </ButtonGroup>
            </Pagination.Root>

            <Heading unstyled color="text.primary" fontFamily="poppins">10 Items</Heading>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
