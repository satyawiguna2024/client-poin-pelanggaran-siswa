import {
  Box,
  Heading,
  Stack,
  Input,
  InputGroup,
  Table,
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
import { useCreate, useFormDataKelas, useShowAllKelas, useUpdate } from "../../../hooks/useDataKelas";
import { useFindAllGuru } from "../../../hooks/useDataUsers";
import DetailSiswa from "./DetailSiswa";
import BaseInput from "../../../components/forms/BaseInput";

export default function DataKelas() {
  const { getAllDataKelas, isPendingAllDataKelas } = useShowAllKelas();
  const { createData } = useCreate();
  const { updateData } = useUpdate();
  const { findAllDataGuru } = useFindAllGuru()
  const { isDialogOpen, setIsDialogOpen, editId, register, handleSubmit, errors, handleBukaTambahData, handleBukaUpdateData } = useFormDataKelas();

  const handleSimpanData = (data) => {
    setIsDialogOpen(false);

    if (editId) {
      updateData({ id: editId, data });
    } else {
      createData({
        nama_kelas: data.nama_kelas,
        guru: data.guru,
      });
    }
  };

  if (isPendingAllDataKelas) return <h1>Loading...</h1>;

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
          <BaseDialog
            title={editId ? "Update Kelas" : "Add Kelas"}
            open={isDialogOpen}
            onOpenChange={(e) => setIsDialogOpen(e.open)}
            onClickAdd={handleBukaTambahData}
            footer={
              <Button
                onClick={handleSubmit(handleSimpanData)}
                variant="ghost"
                color="blue"
              >
                Save
              </Button>
            }
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <Box my="8">
                <BaseInput
                  label="Nama Kelas"
                  required
                  placeholder="Masukan Nama Kelas"
                  {...register("nama_kelas", {
                    required: "Wajib Memasukan Nama Kelas!",
                  })}
                  error={errors.nama_kelas?.message}
                />
              </Box>
              <Box my="8">
                <BaseNativeSelect
                  placeholder="Guru Wali"
                  label="Guru Wali"
                  options={findAllDataGuru?.map((dg) => ({
                    label: dg?.nama,
                    value: dg?.nuptk
                  }))}
                  {...register("guru")}
                  error={errors.guru?.message}
                />
              </Box>
            </form>
          </BaseDialog>
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
              {/* filter guru berdasarkan kelas */}
              <BaseNativeSelect
                placeholder="Tanggal"
                options={[
                  { label: "Terbaru", value: "terbaru" },
                  { label: "Terlama", value: "terlama" },
                ]}
              />

              <BaseNativeSelect
                placeholder="Jumlah Siswa"
                options={[
                  { label: "Terbanyak", value: "terbanyak" },
                  { label: "Terendah", value: "terendah" },
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
        <Box
          position="relative"
          mt="5"
          width="full"
          rounded="xl"
          shadow="sm"
          bg="white"
        >
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
                {getAllDataKelas.map((dk, i) => (
                  <Table.Row
                    key={i}
                    bg={i % 2 === 0 ? "gray.100" : "white"}
                    className="group"
                    color="text.primary"
                    role="group"
                  >
                    <Table.Cell>{i + 1}</Table.Cell>
                    <Table.Cell fontFamily="poppins">
                      <Stack gap="2">
                        <Heading unstyled>{dk?.nama_kelas}</Heading>

                        {/* action */}
                        <Stack
                          direction="row"
                          opacity={0}
                          _groupHover={{ opacity: 1 }}
                          transition="0.2s"
                        >
                          <DetailSiswa id={dk?.id} namaKelas={dk?.nama_kelas} />
                          <Button
                            unstyled
                            onClick={() => handleBukaUpdateData(dk)}
                            size="xs"
                            color="blue"
                            cursor="pointer"
                          >
                            Update
                          </Button>
                        </Stack>
                      </Stack>
                    </Table.Cell>
                    <Table.Cell pt="3" pb="10" fontFamily="poppins">
                      {dk?.jumlah_siswa}
                    </Table.Cell>
                    <Table.Cell
                      pt="3"
                      pb="10"
                      fontFamily="poppins"
                      color={dk?.guru?.nama ? "text.primary" : "red"}
                    >
                      {dk?.guru?.nama || "Belum ada wali kelas"}
                    </Table.Cell>
                    <Table.Cell pt="3" pb="10" fontFamily="poppins">
                      {dk?.created_at}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          {/* Shadow Overlay untuk indikator scroll horizontal */}
          <Box
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            width={{ base: "20px", md: "35px" }}
            bg="linear-gradient(to left, rgba(0,0,0,0.1), transparent)"
            pointerEvents="none"
            borderRightRadius={{ base: "none", md: "xl" }}
          />
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
