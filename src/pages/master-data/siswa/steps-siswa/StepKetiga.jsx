import { Box, Text } from "@chakra-ui/react";
import BaseInput from "../../../../components/forms/BaseInput";

export default function StepKetiga({ register, errors }) {
  return (
    <>
      <Text>Data Orang Tua Siswa</Text>

      {/* Input Nama Ayah */}
      <Box my="8">
        <BaseInput
          type="text"
          label="Nama Ayah"
          required
          placeholder="Nama Ayah (Bapak Mulyadi)"
          {...register("nama_ayah", {
            required: "Nama ayah wajib di isi",
          })}
          error={errors.nama_ayah?.message}
        />
      </Box>

      {/* Input Nama Ibu */}
      <Box my="8">
        <BaseInput
          type="text"
          label="Nama Ibu"
          required
          placeholder="Nama Ibu (Ibu Siti)"
          {...register("nama_ibu", {
            required: "Nama ibu wajib di isi",
          })}
          error={errors.nama_ibu?.message}
        />
      </Box>

      {/* Input Pekerjaan Ayah */}
      <Box my="8">
        <BaseInput
          type="text"
          label="Pekerjaan Ayah"
          required
          placeholder="Pekerjaan Ayah (Wirausaha)"
          {...register("pekerjaan_ayah", {
            required: "Pekerjaan ayah wajib di isi",
          })}
          error={errors.pekerjaan_ayah?.message}
        />
      </Box>

      {/* Input Pekerjaan Ibu */}
      <Box my="8">
        <BaseInput
          type="text"
          label="Pekerjaan Ibu"
          required
          placeholder="Pekerjaan Ibu (Ibu Rumah Tangga)"
          {...register("pekerjaan_ibu", {
            required: "Pekerjaan ibu wajib di isi",
          })}
          error={errors.pekerjaan_ibu?.message}
        />
      </Box>

      {/* Input Telepon Ayah */}
      <Box my="8">
        <BaseInput
          type="number"
          label="No HP Ayah"
          required
          placeholder="(+62) 81893289789"
          {...register("telepon_ayah", {
            required: "No HP ayah wajib di isi",
          })}
          error={errors.telepon_ayah?.message}
        />
      </Box>

      {/* Input Telepon Ibu */}
      <Box my="8">
        <BaseInput
          type="number"
          label="No HP Ibu"
          required
          placeholder="(+62) 81893289789"
          {...register("telepon_ibu", {
            required: "No HP ibu wajib di isi",
          })}
          error={errors.telepon_ibu?.message}
        />
      </Box>
    </>
  );
}
