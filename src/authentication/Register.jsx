import { Box, Button, Container, Field, Input, InputGroup } from "@chakra-ui/react";
import { useRegisterHook } from "../hooks/useAuthenticationHook";
import { Lock, Mail, User } from "lucide-react";

export default function Register() {
  const {register, handleSubmit, errors, isPending, onSubmit} = useRegisterHook();

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDir="column" gap="5">
            {/* username */}
            <Field.Root invalid={!!errors.username}>
              <Field.Label>Username</Field.Label>
              <InputGroup startElement={<User size={15} />} >
                <Input
                  type="text"
                  placeholder="Masukan Username"
                  variant="outline"
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
                />
              </InputGroup>
              <Field.ErrorText width="full">
                <Field.ErrorIcon width="3" />
                {errors.username?.message}
              </Field.ErrorText>
            </Field.Root>
            
            {/* email */}
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <InputGroup startElement={<Mail size={15} />}>
                <Input
                  type="email"
                  placeholder="Masukan Email"
                  variant="outline"
                  {...register("email", {
                    required: "Wajib Memasukan Email!",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Format email tidak valid",
                    }
                  })}
                />
              </InputGroup>
              <Field.ErrorText width="full">
                <Field.ErrorIcon width="3" />
                {errors.email?.message}
              </Field.ErrorText>
            </Field.Root>
            
            {/* password */}
            <Field.Root invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <InputGroup startElement={<Lock size={15} />}>
                <Input
                  type="password"
                  placeholder="Masukan Password"
                  variant="outline"
                  {...register("password", {
                    required: "Wajib Memasukan Password!",
                    minLength: {
                      value: 6,
                      message: "Password minimal 6 karakter",
                    },
                  })}
                />
              </InputGroup>
              <Field.ErrorText width="full">
                <Field.ErrorIcon width="3" />
                {errors.password?.message}
              </Field.ErrorText>
            </Field.Root>

            {isPending ? (
              <>
                <Button disabled variant="outline" loading loadingText="Proses..." />
              </>
            ) : (
              <>
                <Button type="submit" variant="outline">
                  Daftar
                </Button>
              </>
            )}
          </Box>
        </form>
      </Container>
    </>
  )
}
