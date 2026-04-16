import { Box, Heading, Stack, Input, InputGroup, Table, Button, Pagination, IconButton, ButtonGroup } from "@chakra-ui/react";
import { useDjpFrom, useFindAll, useStore, useUpdate, useDelete } from "../../../hooks/useDataJenisPelanggaran";
import { CiSearch } from "react-icons/ci";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import BaseDialog from "../../../components/dialogs/BaseDialog";
import BaseNativeSelect from "../../../components/forms/BaseNativeSelect";
import BaseInput from "../../../components/forms/BaseInput";
import useFilterJenisPelanggaran from "../../../hooks/filters/useFilterJenisPelanggaran";

export default function DataJenisPelanggaran() {
  const { jenisPelanggaran, isPendingJenisPelanggaran } = useFindAll();
  const { createData } = useStore();
  const { updateData } = useUpdate();
  const { confirmDeleteData } = useDelete();
  const { filters, handleChangeFilter, totalItems, pageSize, totalPages, paginatedData, currentPage, setCurrentPage } = useFilterJenisPelanggaran(jenisPelanggaran);
  const { isDialogOpen, setIsDialogOpen, editId, register, handleSubmit, errors, handleBukaTambahData, handleBukaUpdateData } = useDjpFrom();

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

  if (isPendingJenisPelanggaran) return <h1>Loading...</h1>;

  return (
    <>
      <Box py="10">
        {/* title & button add new */}
        <Stack direction="row" alignItems="center">
          <Heading unstyled color="text.primary" fontFamily="poppins" fontWeight="medium" fontSize={{ base: "2xl", md: "3xl" }}>
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
          <Stack direction={{ base: "column", md: "row" }} justifyContent="space-between">
            <Box display="flex" flexDir={{ base: "column", md: "row" }} alignItems={{ base: "start", md: "center" }} gap="2" width={{ base: "auto", md: "800px" }}>
              {/* filter poin pelanggaran berdasarkan dari terbesar/terkecil */}
              <BaseNativeSelect
                placeholder="Filter Poin"
                options={[
                  { label: "Terbesar", value: "terbesar" },
                  { label: "Terkecil", value: "terkecil" },
                ]}
                value={filters.poin}
                onChange={(e) => handleChangeFilter("poin", e.target.value)}
              />

              {/* filter date */}
              <BaseNativeSelect
                placeholder="Filter Tanggal"
                options={[
                  { label: "Terbaru", value: "terbaru" },
                  { label: "Terlama", value: "terlama" },
                ]}
                value={filters.tanggal}
                onChange={(e) => handleChangeFilter("tanggal", e.target.value)}
              />
            </Box>

            {/* search guru */}
            <Box>
              <Stack direction="row">
                <InputGroup startElement={<CiSearch size={22} />}>
                  <Input
                    placeholder="Search"
                    value={filters.search}
                    onChange={(e) => handleChangeFilter("search", e.target.value)}
                    w="full" bg="white" borderColor="gray.300" color="text.primary" fontFamily="poppins" _placeholder={{ color: { _dark: "gray.400" } }}
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
                {/* table column: Product | Category | Price */}
                <Table.Row bg="white">
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    No
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    Nama Pelanggaran
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    Poin Pelanggaran
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontFamily="poppins" fontWeight="semibold" letterSpacing="1px" color="text.primary">
                    Tanggal Dibuat
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              {/* table body/content */}
              <Table.Body>
                {paginatedData?.map((djp, i) => (
                  <Table.Row key={i} bg={i % 2 === 0 ? "gray.100" : "white"} className="group" color="text.primary" role="group">
                    <Table.Cell pt="3" pb="10" fontFamily="poppins">{i + 1 + (currentPage - 1) * pageSize}</Table.Cell>
                    <Table.Cell fontFamily="poppins">
                      <Stack gap="2">
                        <Heading unstyled>{djp?.nama_pelanggaran}</Heading>

                        {/* action */}
                        <Stack direction="row" gap="3" opacity={0} _groupHover={{ opacity: 1 }} transition="0.2s">
                          <Button
                            unstyled
                            onClick={() => handleBukaUpdateData(djp)}
                            size="xs" color="blue" cursor="pointer"
                          >
                            Update
                          </Button>
                          <Button
                            unstyled
                            onClick={() => confirmDeleteData(djp.id, djp.nama_pelanggaran)}
                            size="xs" color="red" cursor="pointer"
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Stack>
                    </Table.Cell>
                    <Table.Cell pt="3" pb="10" fontFamily="poppins">{djp?.poin}</Table.Cell>
                    <Table.Cell pt="3" pb="10" fontFamily="poppins">{djp?.created_at}</Table.Cell>
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
                {totalItems} Items
              </Heading>
            </Stack>
        </Box>
      </Box>
    </>
  );
}
