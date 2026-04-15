import { Box, Heading, Stack, Input, InputGroup, Table, Button, Pagination, IconButton, ButtonGroup } from "@chakra-ui/react";
import { useSiswaForms, useCreateSiswa, useDeleteSiswa, useFindAllSiswa, useUpdateSiswa } from "../../../hooks/useDataUsers";
import { useShowAllKelas } from "../../../hooks/useDataKelas";
import { LuChevronLeft, LuChevronRight, LuSearch } from "react-icons/lu";
import BaseDialog from "../../../components/dialogs/BaseDialog";
import BaseNativeSelect from "../../../components/forms/BaseNativeSelect";
import StepPertama from "./steps-siswa/StepPertama";
import StepKedua from "./steps-siswa/StepKedua";
import StepKetiga from "./steps-siswa/StepKetiga";
import useFilterSiswas from "../../../hooks/filters/useFilterSiswa";

export default function DataSiswa() {
  const { findAllDataSiswa, isPendingFindAllSiswa } = useFindAllSiswa();
  const { getAllDataKelas } = useShowAllKelas();
  const { step, setStep, isDialogOpen, setIsDialogOpen,
          editId, register, handleSubmit, errors, handleNext, 
          handleBukaTambahData, handleBukaUpdateData 
        } = useSiswaForms();
  const { mutateCreateSiswa } = useCreateSiswa();
  const { mutateUpdateSiswa } = useUpdateSiswa();
  const { confirmDeleteSiswa, isPendingDeleteSiswa } = useDeleteSiswa();
  const { filters, handleChangeFilter, paginatedData, totalItems, pageSize, currentPage, setCurrentPage, totalPages } = useFilterSiswas(findAllDataSiswa);

  // trigger dialog disaat kelar close
  const handleSimpanData = (data) => {
    setIsDialogOpen(false);
    setStep(1);

    // PENGECEKAN (IF UPDATE ATAU IF CREATE)
    if (editId) {
      mutateUpdateSiswa({ id: editId, data: data });
    } else {
      mutateCreateSiswa(data);
    }
  };

  if (isPendingFindAllSiswa) return <Heading>Loading...</Heading>;

  return (
    <>
      <Box py="10">
        {/* title & button add new */}
        <Stack direction="row" alignItems="center">
          <Heading unstyled color="text.primary" fontFamily="poppins" fontWeight="medium" fontSize={{ base: "2xl", md: "3xl" }}>
            Siswa
          </Heading>

          {/* dialog component */}
          <BaseDialog
            title={editId ? "Update Siswa" : "Add Siswa"}
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

                {step < 3 ? (
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
              {/* step tambah akun user */}
              {step === 1 && (<StepPertama register={register} errors={errors} />)}
              {/* step tambah personal data siswa */}
              {step === 2 && (<StepKedua register={register} errors={errors} getAllDataKelas={getAllDataKelas} editId={editId}/>)}
              {/* step tambah data ortu siswa */}
              {step === 3 && <StepKetiga register={register} errors={errors} />}
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
              {/* filter siswa berdasarkan kelas */}
              <BaseNativeSelect
                placeholder="Kelas"
                options={findAllDataSiswa?.map((item) => ({
                  label: item?.kelas?.nama_kelas,
                  value: item?.kelas?.nama_kelas,
                }))}
                value={filters.kelas}
                onChange={(e) => handleChangeFilter("kelas", e.target.value)}
              />

              {/* filter siswa berdasarkan agama */}
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

              {/* filter siswa berdasarkan jenis kelamin */}
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

            {/* search siswa */}
            <Box>
              <Stack direction="row">
                <InputGroup startElement={<LuSearch size={22} />}>
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

        {/* table | box root table */}
        <Box position="relative" mt="5" width="full" rounded="xl" shadow="sm" bg="white">
          {/* box table */}
          <Box overflowX="auto" p={{ base: "0", md: "4" }}>
            <Table.Root whiteSpace="nowrap" variant="line" border="1px solid" borderColor="gray.200" rounded="lg">
            <Table.Header>
              <Table.Row bg="white">
                {/* table column: Product | Category | Price */}
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  No
                </Table.ColumnHeader>
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  Nis
                </Table.ColumnHeader>
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  Nama
                </Table.ColumnHeader>
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  Kelas
                </Table.ColumnHeader>
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  Tanggal Lahir
                </Table.ColumnHeader>
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  Agama
                </Table.ColumnHeader>
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  No HP
                </Table.ColumnHeader>
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  Jenis Kelamin
                </Table.ColumnHeader>
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  Nama Bapak
                </Table.ColumnHeader>
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  Nama Ibu
                </Table.ColumnHeader>
                <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  Alamat
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                  Tanggal Dibuat
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            {/* table body/content */}
            <Table.Body>
              {paginatedData?.map((ds, i) => (
                <Table.Row key={i} bg={i % 2 === 0 ? "gray.100" : "white"} className="group" color="text.primary" role="group">
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{i + 1 + (currentPage - 1) * pageSize}</Table.Cell>
                  <Table.Cell fontFamily="poppins">
                    <Stack gap="2">
                      <Heading unstyled>{ds?.nis}</Heading>

                      {/* action */}
                      <Stack direction="row" gap="3" opacity={0} _groupHover={{ opacity: 1 }} transition="0.2s">
                        <Button unstyled onClick={() => handleBukaUpdateData(ds)} size="xs" color="blue" cursor="pointer">
                          Update
                        </Button>
                        <Button unstyled onClick={() => confirmDeleteSiswa(ds?.user_account?.id, ds?.nama)} disabled={isPendingDeleteSiswa} size="xs" color="red" cursor="pointer">
                          Delete
                        </Button>
                      </Stack>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.nama}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.kelas?.nama_kelas}
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.tanggal_lahir}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.agama}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.telepon}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.jenis_kelamin == "L" ? "Laki-Laki" : "Perempuan"}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.data_ortu?.nama_ayah}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.data_ortu?.nama_ibu}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.alamat}</Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">{ds?.created_at}</Table.Cell>
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
              {totalItems > pageSize && (
                <Pagination.Root page={currentPage} onPageChange={(e) => setCurrentPage(e.page)} count={totalItems} pageSize={pageSize}>
                  <ButtonGroup variant="outline" size="sm">
                    <Pagination.PrevTrigger asChild>
                      <IconButton disabled={currentPage === 1} _dark={{ color: "text.primary", _hover: { bg: "white" } }}>
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
                      <IconButton disabled={currentPage === totalPages} _dark={{ color: "text.primary", _hover: { bg: "white" } }}>
                        <LuChevronRight />
                      </IconButton>
                    </Pagination.NextTrigger>
                  </ButtonGroup>
                </Pagination.Root>
              )}

              <Heading unstyled color="text.primary" fontFamily="poppins">
                {findAllDataSiswa.length} Items
              </Heading>
            </Stack>
          </Box>
      </Box>
    </>
  );
}
