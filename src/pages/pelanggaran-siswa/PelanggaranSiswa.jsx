import { Box, Heading, Stack, Input, InputGroup, Table, Button, Pagination, IconButton, ButtonGroup, Spinner } from "@chakra-ui/react";
import { useFormPelanggaranSiswa, useFindAll, useStore, useUpdate } from "../../hooks/usePelanggaranSiswa";
import { CiSearch } from "react-icons/ci";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import BaseDialog from "../../components/dialogs/BaseDialog";
import BaseNativeSelect from "../../components/forms/BaseNativeSelect";
import StepPertama from "./steps-pelanggaran/StepPertama";
import StepKedua from "./steps-pelanggaran/StepKedua";

export default function PelanggaranSiswa() {
  const { pelanggaranSiswa, isPendingPelanggaranSiswa } = useFindAll();
  const { createData, isPendingCreate } = useStore();
  const { updateData, isPendingUpdate } = useUpdate();
  const { step, setStep, isDialogOpen, setIsDialogOpen, editId, 
          handleNext, handleBukaTambahData, handleBukaUpdateData, 
          register, handleSubmit, errors, reset, setValue, selectedNis, setSelectedNis
        } = useFormPelanggaranSiswa();

  const isSaving = isPendingCreate || isPendingUpdate;

  // ── submit handler ──
  const handleSimpanData = (formData) => {
    const payload = {
      nis: formData.nis,
      id_jenis_pelanggaran: formData.id_jenis_pelanggaran,
      keterangan: formData.keterangan,
    };

    if (editId) {
      updateData(
        { id: editId, data: payload },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            reset();
          },
        }
      );
    } else {
      createData(payload, {
        onSuccess: () => {
          setIsDialogOpen(false);
          reset();
        },
      });
    }
  };


  return (
    <>
      <Box py="10">
        {/* title & button add new */}
        <Stack direction="row" alignItems="center">
          <Heading unstyled color="text.primary" fontFamily="poppins" fontWeight="medium" fontSize={{ base: "2xl", md: "3xl" }}>
            Pelanggaran Siswa
          </Heading>

          {/* dialog component */}
          <BaseDialog
            title={editId ? "Update Pelanggaran Siswa" : "Add Pelanggaran Siswa"}
            open={isDialogOpen}
            onOpenChange={(e) => setIsDialogOpen(e.open)}
            size="xl"
            onClickAdd={handleBukaTambahData}
            footer={
              <>
                {step > (editId ? 2 : 1) && (
                  <Button onClick={() => setStep(step - 1)} variant="ghost" color="red" disabled={isSaving}>
                    Back
                  </Button>
                )}

                {step < 2 ? (
                  <Button type="button" onClick={handleNext} variant="ghost" color="orange">
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit(handleSimpanData)} variant="ghost" color="blue" loading={isSaving}>
                    Save
                  </Button>
                )}
              </>
            }
          >
            <form onSubmit={(e) => e.preventDefault()}>
              {step === 1 && <StepPertama register={register} errors={errors} setValue={setValue} selectedNis={selectedNis} setSelectedNis={setSelectedNis} />}
              {step === 2 && <StepKedua register={register} errors={errors} />}
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
                placeholder="Semua Kelas"
                options={[
                  { label: "XII RPL 1", value: "xii_rpl_1" },
                  { label: "XII RPL 2", value: "xii_rpl_2" },
                  { label: "XII RPL 3", value: "xii_rpl_3" },
                  { label: "XII RPL 4", value: "xii_rpl_4" },
                  { label: "XII RPL 5", value: "xii_rpl_5" },
                ]}
              />

              {/* filter siswa berdasarkan jenis pelanggaran */}
              <BaseNativeSelect
                placeholder="Semua Jenis Pelanggaran"
                options={[
                  { label: "Mabuk", value: "Mabuk" },
                  { label: "Makan", value: "Makan" },
                  { label: "Merokok", value: "Merokok" },
                  { label: "Membolos", value: "Membolos" },
                  { label: "Berpakaian Tidak Rapi", value: "Berpakaian Tidak Rapi" },
                ]}
              />

              {/* filter tanggal pelanggaran */}
              <BaseNativeSelect
                placeholder="Tanggal Pelanggaran"
                options={[
                  { label: "Terbaru", value: "terbaru" },
                  { label: "Terlama", value: "terlama" },
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
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* table */}
        <Box position="relative" mt="5" width="full" rounded="xl" shadow="sm" bg="white">
          <Box overflowX="auto" p={{ base: "0", md: "4" }}>
            <Table.Root whiteSpace="nowrap" variant="line" border="1px solid" borderColor="gray.200" rounded="lg">
              <Table.Header>
                <Table.Row bg="white">
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    No
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    Tanggal Pelanggaran
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    Nis
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    Nama Siswa
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    Kelas
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    Jenis Pelanggaran
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    Poin
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    Dibuat Oleh
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              {/* table body */}
              <Table.Body>
                {isPendingPelanggaranSiswa ? (
                  <Table.Row>
                    <Table.Cell colSpan={8} textAlign="center" py="10">
                      <Spinner size="md" />
                    </Table.Cell>
                  </Table.Row>
                ) : !pelanggaranSiswa || pelanggaranSiswa.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={8} textAlign="center" py="10" fontFamily="poppins" color="text.primary">
                      Tidak ada data pelanggaran siswa
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  pelanggaranSiswa?.map((item, i) => (
                    <Table.Row key={item.id} bg={i % 2 === 0 ? "gray.100" : "white"} className="group" color="text.primary" role="group">
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{i + 1}</Table.Cell>
                      <Table.Cell fontFamily="poppins">
                        <Stack gap="2">
                          <Heading unstyled>{item.tanggal}</Heading>

                          {/* inline actions */}
                          <Stack direction="row" gap="3" opacity={0} _groupHover={{ opacity: 1 }} transition="0.2s">
                            <Button
                              unstyled
                              onClick={() => handleBukaUpdateData(item)}
                              size="xs" color="blue" cursor="pointer"
                            >
                              Update
                            </Button>
                          </Stack>
                        </Stack>
                      </Table.Cell>

                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{item.siswa?.nis}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{item.siswa?.nama}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{item.siswa?.kelas?.nama_kelas}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{item.jenis_pelanggaran?.nama_pelanggaran}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{item.jenis_pelanggaran?.poin}</Table.Cell>
                      <Table.Cell pt="3" pb="10" fontFamily="poppins">{item.siswa?.users?.username}</Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Root>
          </Box>

          {/* Shadow Overlay */}
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
            <Pagination.Root count={pelanggaranSiswa?.length ?? 0} pageSize={10} defaultPage={1}>
              <ButtonGroup variant="outline" size="sm">
                <Pagination.PrevTrigger asChild>
                  <IconButton _dark={{ color: "text.primary", _hover: { bg: "white" } }}>
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
                  <IconButton _dark={{ color: "text.primary", _hover: { bg: "white" } }}>
                    <LuChevronRight />
                  </IconButton>
                </Pagination.NextTrigger>
              </ButtonGroup>
            </Pagination.Root>

            <Heading unstyled color="text.primary" fontFamily="poppins">
              {pelanggaranSiswa?.length ?? 0} Items
            </Heading>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
