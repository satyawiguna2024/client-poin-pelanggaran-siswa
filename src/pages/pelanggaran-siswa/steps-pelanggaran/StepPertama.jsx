import {
  Box,
  Table,
  Stack,
  Input,
  InputGroup,
  RadioGroup,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { findAllSiswa } from "../../../services/dataUsers";
import { useState } from "react";

export default function StepPertama({
  register,
  errors,
  setValue,
  selectedNis,
  setSelectedNis,
}) {
  const [search, setSearch] = useState("");

  // ── fetch semua siswa dari API ──
  const { data: allSiswa, isPending: isPendingSiswa } = useQuery({
    queryKey: ["get-all-siswa"],
    queryFn: findAllSiswa,
  });

  // ── filter lokal: search nama/nis & kelas ──
  const filteredSiswa = (allSiswa ?? []).filter((s) => {
    const cocokSearch =
      search === "" ||
      s.nama?.toLowerCase().includes(search.toLowerCase()) ||
      s.nis?.toLowerCase().includes(search.toLowerCase());

    return cocokSearch;
  });

  // ── saat siswa dipilih via radio ──
  const handlePilihSiswa = (siswa) => {
    setSelectedNis(siswa.nis);
    setValue("nis", siswa.nis, { shouldValidate: true });
  };

  return (
    <>
      <Heading>Pilih Siswa</Heading>

      {/* error jika nis belum dipilih */}
      {errors.nis && (
        <Text color="red.500" fontFamily="poppins" fontSize="sm" mt="1">
          {errors.nis.message}
        </Text>
      )}

      {/* register hidden — menyimpan nis ke react-hook-form */}
      <input
        type="hidden"
        {...register("nis", { required: "Siswa wajib dipilih" })}
      />

      {/* action: filter & search */}
      <Box mt="6">
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          {/* search siswa */}
          <Box width="full">
            <InputGroup startElement={<CiSearch size={22} />}>
              <Input
                placeholder="Cari nama / Nis Siswa"
                w="full"
                bg="white"
                borderColor="gray.300"
                color="text.primary"
                fontFamily="poppins"
                _placeholder={{ color: { _dark: "gray.400" } }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Box>
        </Stack>
      </Box>

      {/* table siswa */}
      <Box
        position="relative"
        mt="5"
        width="full"
        rounded="xl"
        shadow="sm"
        bg="white"
      >
        <Box
          overflowX="auto"
          overflowY="auto"
          p={{ base: "0", md: "4" }}
          maxHeight="400px"
        >
          {isPendingSiswa ? (
            <Box textAlign="center" py="10">
              <Spinner size="md" />
            </Box>
          ) : filteredSiswa.length === 0 ? (
            <Box textAlign="center" py="10">
              <Text fontFamily="poppins" color="text.primary">
                Tidak ada siswa ditemukan
              </Text>
            </Box>
          ) : (
            <RadioGroup.Root value={selectedNis ?? ""}>
              <Table.Root
                whiteSpace="nowrap"
                variant="line"
                border="1px solid"
                borderColor="gray.200"
                rounded="lg"
              >
                <Table.Header>
                  <Table.Row bg="white">
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
                      NIS
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
                      Pilih
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {filteredSiswa.map((siswa, i) => (
                    <Table.Row
                      key={siswa.nis}
                      bg={
                        selectedNis === siswa.nis
                          ? "blue.50"
                          : i % 2 === 0
                            ? "gray.100"
                            : "white"
                      }
                      className="group"
                      color="text.primary"
                      role="group"
                      cursor="pointer"
                      onClick={() => handlePilihSiswa(siswa)}
                    >
                      <Table.Cell fontFamily="poppins">{i + 1}</Table.Cell>
                      <Table.Cell fontFamily="poppins">{siswa.nis}</Table.Cell>
                      <Table.Cell fontFamily="poppins">{siswa.nama}</Table.Cell>
                      <Table.Cell fontFamily="poppins">
                        {siswa.kelas?.nama_kelas ?? "-"}
                      </Table.Cell>
                      <Table.Cell>
                        <RadioGroup.Item
                          value={siswa.nis}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                        </RadioGroup.Item>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </RadioGroup.Root>
          )}
        </Box>

        {/* shadow overlay scroll */}
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
    </>
  );
}
