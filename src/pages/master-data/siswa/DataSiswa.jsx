import { useState } from "react";
import { Box, Heading, Stack, Input, InputGroup, Table, Checkbox, Button, Pagination, IconButton, ButtonGroup, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuSearch } from "react-icons/lu";
import { useCreateSiswa, useFindAllSiswa } from "../../../hooks/useDataUsers";
import { useShowAllKelas } from "../../../hooks/useDataKelas";
import BaseDialog from "../../../components/dialogs/BaseDialog";
import BaseNativeSelect from "../../../components/forms/BaseNativeSelect";
import BaseButton from "../../../components/buttons/BaseButton";
import StepPertama from "./steps-siswa/StepPertama";
import StepKedua from "./steps-siswa/StepKedua";
import StepKetiga from "./steps-siswa/StepKetiga";

export default function DataSiswa() {
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { findAllDataSiswa, isPendingFindAllSiswa } = useFindAllSiswa();
  const { register, handleSubmit, onSubmit, errors, trigger } = useCreateSiswa();
  const { getAllDataKelas } = useShowAllKelas();

  // trigger field required sebelum next step
  const handleNext = async () => {
    let fields = [];

    if (step === 1) {
      fields = ["username", "email", "password"];
    }

    if (step === 2) {
      fields = [ "nis", "nama", "tanggal_lahir", "agama", "jenis_kelamin", "alamat", "id_kelas", "telepon" ];
    }

    if (step === 3) {
      fields = [ "nama_ayah", "nama_ibu", "pekerjaan_ayah", "pekerjaan_ibu", "telepon_ayah", "telepon_ibu" ];
    }

    const isValid = await trigger(fields);

    if (isValid) {
      setStep(step + 1);
    }
  };

  // trigger dialog disaat kelar close
  const handleSimpanData = (data) => {
    setIsDialogOpen(false);
    setStep(1);
    onSubmit(data);
  }

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
            title="Add Siswa"
            open={isDialogOpen}
            onOpenChange={(e) => setIsDialogOpen(e.open)}
            footer={
              <>
                {/* melakukan aksi form langkah demi langkah -> add users akun(1) -> add data personal siswa(2) -> add data ortu siswa(3) */}
                {step > 1 && (
                  <Button
                    onClick={() => setStep(step - 1)}
                    variant="ghost"
                    color="red"
                  >
                    Back
                  </Button>
                )}

                {step < 3 ? (
                  <Button onClick={handleNext} variant="ghost" color="orange">
                    Next
                  </Button>
                ):(
                  <Button form="form-tambah-siswa" type="submit" variant="ghost" color="blue">
                    Save
                  </Button>
                )}
              </>
            }
          >
            <form id="form-tambah-siswa" onSubmit={handleSubmit(handleSimpanData)}>
              {/* step tambah akun user */}
              {step === 1 && (<StepPertama register={register} errors={errors} />)}

              {/* step tambah personal data siswa */}
              {step === 2 && (<StepKedua register={register} errors={errors} getAllDataKelas={getAllDataKelas} />)}

              {/* step tambah data ortu siswa */}
              {step === 3 && (<StepKetiga register={register} errors={errors} />)}
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

              {/* Button aksi menerapkan dari select all */}
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
                  { label: "Islam", value: "islam" },
                  { label: "Kristen Protestan", value: "kristen_protestan" },
                  { label: "Katolik", value: "katolik" },
                  { label: "Hindu", value: "hindu" },
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
                <InputGroup startElement={<LuSearch size={22} />}>
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
                  No HP
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
                  Nama Bapak
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Nama Ibu
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Alamat
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            {/* table body/content */}
            <Table.Body>
              {findAllDataSiswa?.map((ds, i) => (
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
                      <Heading unstyled>{ds?.nis}</Heading>

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
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {ds?.nama}
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {ds?.kelas?.nama_kelas}
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {ds?.tanggal_lahir}
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {ds?.agama}
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {ds?.telepon}
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {ds?.jenis_kelamin == "L" ? "Laki-Laki" : "Perempuan"}
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {ds?.data_ortu?.nama_ayah}
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {ds?.data_ortu?.nama_ibu}
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {ds?.alamat}
                  </Table.Cell>
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
