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
import {
  useDjpFrom,
  useFindAll,
  useStore,
  useUpdate,
  useDelete,
} from "../../../hooks/useDataJenisPelanggaran";
import Swal from "sweetalert2";
import BaseInput from "../../../components/forms/BaseInput";

export default function DataJenisPelanggaran() {
  const { jenisPelanggaran, isPendingJenisPelanggaran } = useFindAll();
  const { createData } = useStore();
  const { updateData } = useUpdate();
  const { deleteData } = useDelete();
  const {
    isDialogOpen,
    setIsDialogOpen,
    editId,
    setEditId,
    register,
    handleSubmit,
    errors,
    reset,
  } = useDjpFrom();

  const handleSimpanData = (data) => {
    setIsDialogOpen(false);
    if (editId) {
      updateData({ id: editId, data });
    } else {
      createData({
        nama_pelanggaran: data.nama_pelanggaran,
        poin: parseInt(data.poin),
      });
    }
  };

  const handleBukaTambahData = () => {
    setEditId(null);
    reset({ nama_pelanggaran: "", poin: "" });
  };

  const handleBukaUpdateData = (djp) => {
    setEditId(djp.id);
    reset({ nama_pelanggaran: djp.nama_pelanggaran, poin: djp.poin });
    setIsDialogOpen(true);
  };

  const confirmDeleteData = (id, nama) => {
    Swal.fire({
      title: `Hapus ${nama}?`,
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id);
      }
    });
  };

  if (isPendingJenisPelanggaran) return <h1>Loading...</h1>;

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
            Jenis Pelanggaran
          </Heading>
          {/* dialog component */}
          <BaseDialog
            title={editId ? "Update Jenis Pelanggaran" : "Add Jenis Pelanggaran"}
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
                    label="Nama Pelanggaran"
                    required
                    placeholder="Masukan Nama Pelanggaran"
                    {...register("nama_pelanggaran", {
                      required: "Wajib Memasukan Nama Pelanggaran!",
                    })}
                    error={errors.nama_pelanggaran?.message}
                  />
                </Box>
                <Box my="8">
                  <BaseInput
                    type="number"
                    label="Poin Pelanggaran"
                    required
                    placeholder="Masukan Poin Pelanggaran"
                    {...register("poin", {
                      required: "Wajib Memasukan Poin Pelanggaran!",
                    })}
                    error={errors.poin?.message}
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
              {/* bulk action: delete all dengan cara di select -> apply */}
              <BaseNativeSelect
                placeholder="Aksi"
                options={[{ label: "Delete", value: "delete" }]}
                width="10"
              />

              <BaseButton
                mr="8"
                width={{ base: "full", md: "auto" }}
                label="Terapkan"
              />

              {/* filter poin pelanggaran berdasarkan dari terbesar/terkecil */}
              <BaseNativeSelect
                placeholder="Filter Poin"
                options={[
                  { label: "Terbesar", value: "terbesar" },
                  { label: "Terkecil", value: "terkecil" },
                ]}
              />

              {/* filter date */}
              <BaseNativeSelect
                placeholder="Filter Tanggal"
                options={[
                  { label: "Terbaru", value: "terbaru" },
                  { label: "Terlama", value: "terlama" },
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
                  Nama Pelanggaran
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontFamily="poppins"
                  fontWeight="semibold"
                  letterSpacing="1px"
                  color="text.primary"
                >
                  Poin Pelanggaran
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
              {jenisPelanggaran?.map((djp, i) => (
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
                      <Heading unstyled>{djp?.nama_pelanggaran}</Heading>

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
                          onClick={() => handleBukaUpdateData(djp)}
                          size="xs"
                          color="blue"
                          cursor="pointer"
                        >
                          Update
                        </Button>
                        <Button
                          unstyled
                          onClick={() =>
                            confirmDeleteData(djp.id, djp.nama_pelanggaran)
                          }
                          size="xs"
                          color="red"
                          cursor="pointer"
                        >
                          Delete
                        </Button>
                      </Stack>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {djp?.poin}
                  </Table.Cell>
                  <Table.Cell pt="3" pb="10" fontFamily="poppins">
                    {djp?.created_at}
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
