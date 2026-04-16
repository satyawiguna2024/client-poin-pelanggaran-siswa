import { Box, Button, Container, Field, Input, InputGroup } from "@chakra-ui/react";
import { useLoginHook } from "../../hooks/useAuthenticationHook";
import { Lock, User } from "lucide-react";

export default function Login() {
  const { register, handleSubmit, errors, watch, onSubmit, isPending } = useLoginHook();

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDir="column" gap="5">
            <Field.Root invalid={!!errors.username}>
              <Field.Label color="text.primary">Username</Field.Label>
              <InputGroup startElement={<User size={15} />}>
                <Input
                  type="text"
                  placeholder="Masukan Username"
                  variant="outline"
                  borderColor="gray.200" color="text.primary"
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

            <Field.Root invalid={!!errors.password}>
              <Field.Label color="text.primary">Password</Field.Label>
              <InputGroup startElement={<Lock size={15} />}>
                <Input
                  type="password"
                  placeholder="Masukan Password"
                  variant="outline"
                  borderColor="gray.200" color="text.primary"
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

            <Field.Root invalid={!!errors.confirm_password}>
              <Field.Label color="text.primary">Konfirmasi Password</Field.Label>
              <InputGroup startElement={<Lock size={15} />}>
                <Input
                  type="password"
                  placeholder="Masukan Ulang Password"
                  variant="outline"
                  borderColor="gray.200" color="text.primary"
                  {...register("confirm_password", {
                    required: "Wajib Mengkonfirmasi Password!",
                    validate: (value) => value === watch("password") || "Konfirmasi Password tidak cocok",
                  })}
                />
              </InputGroup>
              <Field.ErrorText width="full">
                <Field.ErrorIcon width="3" />
                {errors.confirm_password?.message}
              </Field.ErrorText>
            </Field.Root>

            {isPending ? (
              <>
                <Button disabled variant="outline" borderColor="gray.200" color="text.primary" loading loadingText="Proses..." />
              </>
            ) : (
              <>
                <Button type="submit" variant="outline" borderColor="gray.200" _hover={{bg: "gray.100"}} color="text.primary">
                  Login
                </Button>
              </>
            )}
          </Box>
        </form>
      </Container>
    </>
  );
}
