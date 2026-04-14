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
import { useCreateGuru, useDeleteGuru, useFindAllGuru, useGuruForms, useUpdateGuru } from "../../../hooks/useDataUsers";
import StepPertama from "./steps-guru/StepPertama";
import StepKedua from "./steps-guru/StepKedua";
import useFilterGuru from "../../../hooks/filters/useFilterGuru";

export default function DataGuru() {
  const {findAllDataGuru, isPendingFindAllGuru} = useFindAllGuru();
  const { mutateCreateGuru } = useCreateGuru();
  const { mutateUpdateGuru } = useUpdateGuru();
  const { confirmDeleteGuru } = useDeleteGuru();
  const {filters, handleChangeFilter, filteredData} = useFilterGuru(findAllDataGuru);
  const { step, setStep, isDialogOpen, setIsDialogOpen, editId, 
          register, handleSubmit, errors, handleBukaTambahData, handleNext, handleBukaUpdateData
        } = useGuruForms();

  // trigger dialog disaat kelar close
  const handleSimpanData = (data) => {
    setIsDialogOpen(false);
    setStep(1);

    // PENGECEKAN (IF UPDATE ATAU IF CREATE)
    if (editId) {
      mutateUpdateGuru({ id: editId, data: data });
    } else {
      mutateCreateGuru(data);
    }
  };
  
  if(isPendingFindAllGuru) return <h1>Loading...</h1>;

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
          <BaseDialog
            title={editId ? "Update Guru" : "Add Guru"}
            open={isDialogOpen}
            onOpenChange={(e) => setIsDialogOpen(e.open)}
            onClickAdd={handleBukaTambahData}
            footer={
              <>
                {/* melakukan aksi form langkah demi langkah -> add users akun(1) -> add data personal siswa(2) -> add data ortu siswa(3) */}
                {step > (editId ? 2 : 1) && (
                  <Button
                    onClick={() => setStep(step - 1)}
                    variant="ghost"
                    color="red"
                  >
                    Back
                  </Button>
                )}

                {step < 2 ? (
                  <Button type="button" onClick={handleNext} variant="ghost" color="orange">
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit(handleSimpanData)}
                    variant="ghost"
                    color="blue"
                  >
                    Save
                  </Button>
                )}
              </>
            }
          >
            <form onSubmit={(e) => e.preventDefault()}>
              {step === 1 && <StepPertama register={register} errors={errors} />}
              {step === 2 && <StepKedua register={register} errors={errors} editId={editId} />}
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
                placeholder="Jabatan"
                options={[
                  { label: "Guru Matematika", value: "Guru Matematika" },
                  { label: "Guru Bahasa Indonesia", value: "Guru Bahasa Indonesia" },
                  { label: "Guru Bahasa Inggris", value: "Guru Bahasa Inggris" },
                  { label: "Guru Ilmu Pengetahuan Alam (IPA)", value: "Guru Ilmu Pengetahuan Alam" },
                  { label: "Guru Ilmu Pengetahuan Sosial (IPS)", value: "Guru Ilmu Pengetahuan Sosial" },
                  { label: "Guru Pendidikan Agama", value: "Guru Pendidikan Agama" },
                  { label: "Guru Pendidikan Jasmani (PJOK)", value: "Guru Pendidikan Jasmani" },
                  { label: "Guru Seni Budaya", value: "Guru Seni Budaya" },
                  { label: "Guru Informatika (TIK)", value: "Guru Informatika" },
                ]}
                value={filters.jabatan}
                onChange={(e) => handleChangeFilter("jabatan", e.target.value)}
              />

              {/* filter guru berdasarkan agama */}
              <BaseNativeSelect
                placeholder="Agama"
                options={[
                  { label: "Hindu", value: "Hindu" },
                  { label: "Islam", value: "Islam" },
                  { label: "Kristen", value: "Kristen" },
                  { label: "Kristen Katolik", value: "Kristen Katolik" },
                  { label: "Buddha", value: "Buddha" },
                  { label: "Konghucu", value: "Konghucu" },
                ]}
                value={filters.agama}
                onChange={(e) => handleChangeFilter("agama", e.target.value)}
              />

              {/* filter guru berdasarkan jenis kelamin */}
              <BaseNativeSelect
                placeholder="Jenis Kelamin"
                options={[
                  { label: "Laki Laki", value: "laki_laki" },
                  { label: "Perempuan", value: "perempuan" },
                ]}
                value={filters.jenis_kelamin}
                onChange={(e) => handleChangeFilter("jenis_kelamin", e.target.value)}
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
                    value={filters.search}
                    onChange={(e) => handleChangeFilter("search", e.target.value)}
                  />
                </InputGroup>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* table | Box root table */}
        <Box position="relative" mt="5" width="full" rounded="xl" shadow="sm" bg="white">
          {/* Box table */}
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
                  {filteredData?.map((dg, i) => (
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
                              onClick={() => handleBukaUpdateData(dg)}
                              size="xs"
                              color="blue"
                              cursor="pointer"
                            >
                              Update
                            </Button>
                            <Button 
                              unstyled
                              onClick={() => confirmDeleteGuru(dg?.user_account?.id, dg?.nama)}
                              size="xs" color="red" cursor="pointer"
                            >
                              Delete
                            </Button>
                          </Stack>
                        </Stack>
                      </Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{dg?.nama}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{dg?.alamat}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{dg?.tanggal_lahir}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{dg?.jenis_kelamin === "L" ? "Laki Laki" : "Perempuan"}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{dg?.agama}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{dg?.telepon}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{dg?.jabatan}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{dg?.created_at}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
            </Table.Root>
          </Box>

          {/* Shadow Overlay untuk indikator scroll horizontal */}
          <Box position="absolute" top="0" right="0" bottom="0" width={{ base: "20px", md: "35px" }} bg="linear-gradient(to left, rgba(0,0,0,0.1), transparent)" pointerEvents="none" borderRightRadius={{ base: "none", md: "xl"}} />
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
              {filteredData?.length} Items
            </Heading>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
