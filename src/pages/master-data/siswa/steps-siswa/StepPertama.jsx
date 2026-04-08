import { Box, Text } from "@chakra-ui/react";
import { LuUser, LuLock } from "react-icons/lu";
import { CgMail } from "react-icons/cg";
import BaseInput from "../../../../components/forms/BaseInput";

export default function StepPertama({ register, errors }) {
  return (
    <>
      <Text>Data User</Text>

      {/* input username */}
      <Box my="8">
        <BaseInput
          type="text"
          label="Username"
          required
          placeholder="Masukan Username.."
          icon={<LuUser size={16} />}
          {...register("username", {
            required: "Wajib Memasukan Username!",
            minLength: {
              value: 3,
              message: "Username minimal 3 karakter",
            },
            maxLength: {
              value: 20,
              message: "Username maksimal 20 karakter",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Username hanya boleh huruf, angka, dan underscore",
            },
          })}
          error={errors.username?.message}
        />
      </Box>

      {/* Input email */}
      <Box my="8">
        <BaseInput
          type="email"
          label="Email"
          required
          placeholder="Masukan Email..."
          icon={<CgMail size={16} />}
          {...register("email", {
            required: "Email wajib diisi",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Format email tidak valid",
            },
          })}
          error={errors.email?.message}
        />
      </Box>

      {/* Input Password */}
      <Box my="8">
        <BaseInput
          type="password"
          label="Password"
          required
          placeholder="*********"
          icon={<LuLock size={16} />}
          {...register("password", {
            required: "Wajib Memasukan Password!",
            minLength: {
              value: 6,
              message: "Password minimal 6 karakter",
            },
          })}
          error={errors.password?.message}
        />
      </Box>
    </>
  );
}
