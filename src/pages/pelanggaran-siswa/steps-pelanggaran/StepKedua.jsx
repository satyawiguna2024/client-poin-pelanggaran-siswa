import { Box, Text, Stack } from "@chakra-ui/react";
import BaseInput from "../../../components/forms/BaseInput";
import BaseNativeSelect from "../../../components/forms/BaseNativeSelect";
import { useFindAll as useFindAllJenisPelanggaran } from "../../../hooks/useDataJenisPelanggaran";
import { useState } from "react";

export default function StepKedua({ register, errors }) {
  const { jenisPelanggaran, isPendingJenisPelanggaran } = useFindAllJenisPelanggaran();
  const [selectedPoin, setSelectedPoin] = useState(null);

  const handleChangeJenis = (e) => {
    const selectedId = e.target.value;
    const found = (jenisPelanggaran ?? []).find((jp) => String(jp.id) === String(selectedId));
    setSelectedPoin(found ? found.poin : null);
  };

  const optionsJenis = isPendingJenisPelanggaran
    ? [{ label: "Memuat...", value: "" }]
    : (jenisPelanggaran ?? []).map((jp) => ({
        label: jp.nama_pelanggaran,
        value: String(jp.id),
      }));

  return (
    <>
      {/* input jenis pelanggaran */}
      <Box my="8">
        <BaseNativeSelect
          placeholder="Pilih Jenis Pelanggaran"
          label="Jenis Pelanggaran"
          required
          options={optionsJenis}
          {...register("id_jenis_pelanggaran", {
            required: "Jenis Pelanggaran wajib dipilih",
          })}
          onChange={(e) => {
            // jalankan onChange dari register dulu
            register("id_jenis_pelanggaran").onChange(e);
            handleChangeJenis(e);
          }}
          error={errors.id_jenis_pelanggaran?.message}
        />

        {/* tampilkan poin sesuai jenis yang dipilih */}
        {selectedPoin !== null && (
          <Stack direction="row" mt="2" alignItems="center" gap="1">
            <Text fontFamily="poppins" fontSize="sm" color="gray.500">
              Poin pelanggaran:
            </Text>
            <Text fontFamily="poppins" fontSize="sm" fontWeight="bold" color="red.500">
              {selectedPoin} poin
            </Text>
          </Stack>
        )}
      </Box>

      {/* input keterangan */}
      <Box my="8">
        <BaseInput
          label="Keterangan"
          required
          placeholder="Masukkan keterangan pelanggaran"
          {...register("keterangan", {
            required: "Keterangan wajib diisi",
          })}
          error={errors.keterangan?.message}
        />
      </Box>
    </>
  );
}
