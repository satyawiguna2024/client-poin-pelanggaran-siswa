import { Box, Text } from "@chakra-ui/react";
import BaseInput from "../../../../components/forms/BaseInput";
import BaseNativeSelect from "../../../../components/forms/BaseNativeSelect";
import BaseTextarea from "../../../../components/forms/BaseTextarea";

export default function StepKedua({register, errors, editId}) {
  return (
    <>
      <Text>Data Diri Guru</Text>

      {/* Input Nuptk */}
      <Box my="8">
        <BaseInput
          type="number"
          label="Nuptk"
          disabled={editId ? true : false}
          required
          placeholder="Nuptk (16 digit)"
          {...register("nuptk", {
            message: "Nuptk Wajib Di isi",
            maxLength: {
              value: 16,
              message: "Nuptk harus panjangnya 16 angka",
            },
            minLength: {
              value: 16,
              message: "Nuptk tidak boleh kurang dari 16 angka",
            },
          })}
          error={errors.nuptk?.message}
        />
      </Box>

      {/* Input Nama */}
      <Box my="8">
        <BaseInput
          type="text"
          label="Nama"
          required
          placeholder="Nama (Ayu)"
          {...register("nama", {
            message: "Nama Wajib Di isi",
          })}
          error={errors.nama?.message}
        />
      </Box>

      {/* input tanggal lahir */}
      <Box my="8">
        <BaseInput
          type="date"
          label="Tanggal Lahir"
          required
          {...register("tanggal_lahir", {
            message: "Tanggal Lahir wajib di isi",
          })}
          error={errors.tanggal_lahir?.message}
        />
      </Box>

      {/* Input Jenis Kelamin */}
      <Box my="8">
        <BaseNativeSelect
          placeholder="Jenis Kelamin"
          label="Jenis Kelamin"
          required
          options={[
            { label: "Laki-Laki", value: "L" },
            { label: "Perempuan", value: "P" },
          ]}
          {...register("jenis_kelamin", {
            required: "Jenis Kelamin wajib di isi",
          })}
          error={errors.jenis_kelamin?.message}
        />
      </Box>

      {/* input agama */}
      <Box my="8">
        <BaseNativeSelect
          placeholder="Agama"
          label="Agama"
          required
          options={[
            { label: "Islam", value: "Islam" },
            { label: "Kristen Protestan", value: "Kristen Protestan" },
            { label: "Katolik", value: "Katolik" },
            { label: "Hindu", value: "Hindu" },
            { label: "Buddha", value: "Buddha" },
            { label: "Konghucu", value: "Konghucu" },
          ]}
          {...register("agama", {
            required: "Agama wajib di isi",
          })}
          error={errors.agama?.message}
        />
      </Box>

      {/* input alamat */}
      <Box my="8">
        <BaseTextarea
          label="Alamat"
          required
          placeholder="Masukan Alamat.."
          {...register("alamat", {
            required: "Alamat wajib di isi",
          })}
          error={errors.alamat?.message}
        />
      </Box>

      {/* input telepon */}
      <Box my="8">
        <BaseInput
          type="number"
          label="No HP"
          required
          placeholder="(+62) 81783471289"
          {...register("telepon", {
            required: "No HP wajib di isi",
            maxLength: {
              value: 15,
              message: "No Hp tidak boleh melebihi dari 15 angka",
            },
            minLength: {
              value: 10,
              message: "No HP tidak boleh dibawah 10 angka",
            },
          })}
          error={errors.telepon?.message}
        />
      </Box>

      {/* Input Jabatan */}
      <Box my="8">
        <BaseNativeSelect
          placeholder="Pilih Jabatan"
          label="Jabatan Guru"
          required
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
          {...register("jabatan", {
            required: "Jabatan wajib di isi",
          })}
          error={errors.jabatan?.message}
        />
      </Box>
    </>
  )
}
