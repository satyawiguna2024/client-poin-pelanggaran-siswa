import { Box, Text } from "@chakra-ui/react";
import BaseInput from "../../../../components/forms/BaseInput";
import BaseNativeSelect from "../../../../components/forms/BaseNativeSelect";
import BaseTextarea from "../../../../components/forms/BaseTextarea";

export default function StepKedua({ register, errors, editId, getAllDataKelas }) {
  return (
    <>
      <Text>Data Diri Siswa</Text>

      {/* Input Nis */}
      <Box my="8">
        <BaseInput
          type="number"
          label="Nis"
          disabled={editId ? true : false}
          required
          placeholder="Nis (1234)"
          {...register("nis", {
            message: "Nis Wajib Di isi",
            maxLength: {
              value: 4,
              message: "Nis harus panjangnya 4 angka",
            },
            minLength: {
              value: 4,
              message: "Nis tidak boleh kurang dari 4 angka",
            },
          })}
          error={errors.nis?.message}
        />
      </Box>

      {/* Input Nama */}
      <Box my="8">
        <BaseInput
          type="text"
          label="Nama"
          required
          placeholder="Nama (Adi)"
          {...register("nama", {
            message: "Nama Wajib di Isi",
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

      {/* input jenis kelamin */}
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

      {/* input kelas */}
      <Box my="8">
        <BaseNativeSelect
          placeholder="Kelas"
          label="Kelas"
          required
          options={getAllDataKelas?.map((kl) => ({
            label: kl?.nama_kelas,
            value: kl?.id,
          }))}
          {...register("id_kelas", {
            required: "Kelas wajib di isi",
          })}
          error={errors.id_kelas?.message}
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
    </>
  );
}
