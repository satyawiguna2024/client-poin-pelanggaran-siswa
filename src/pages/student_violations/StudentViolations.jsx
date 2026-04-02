import { Button, Heading, Stack, Menu, Portal, Box } from "@chakra-ui/react";
import { Plus } from "lucide-react";

export default function StudentViolations() {
  return (
    <>
      <Stack direction={{ base: "column", sm: "row" }} alignItems={{ base: "normal", sm: "center" }} pt="16">
        <Heading unstyled as="h2" fontFamily="poppins" fontWeight="semibold" fontSize={{ base: "xl", xs: "2xl", lg: "3xl" }}>
          Pelanggaran Siswa
        </Heading>
        <Button
          fontFamily="poppins"
          fontWeight="semibold"
          size={{ base: "xs", xs: "sm" }}
        >
          <Plus size={20} /> Langgaran Siswa
        </Button>
      </Stack>

      {/* action */}
      <Box mt="14">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button size="sm" unstyled bg="gray.200" p="5px 15px">
              Aksi
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item>Delete</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
    </>
  );
}
