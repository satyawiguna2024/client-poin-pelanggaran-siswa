import { Avatar, Box, Heading, HStack, Menu } from "@chakra-ui/react";

export default function Profile({ getProfileSiswa, setDrawerOpen, onProfileClick }) {
  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  }

  return (
    <Menu.Root>
      <Menu.Trigger>
        <HStack gap="3" flexDir={{base: "row-reverse", md: "row"}}>
          <Box textAlign={{base: "start", md: "end"}}>
            <Heading unstyled as="h3">
              {getProfileSiswa?.data?.users?.username}
            </Heading>
            <Heading unstyled as="h3">
              {getProfileSiswa?.data?.users?.email}
            </Heading>
          </Box>

          {/* avatar profile */}
          <Avatar.Root
            size={{ base: "lg", md: "xl" }}
          >
            <Avatar.Fallback name="Ahmad Subarjo" />
            <Avatar.Image
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${getProfileSiswa?.data?.users?.id}&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffeaa7`}
            />
          </Avatar.Root>
        </HStack>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item
            _hover={{ bg: "gray.100", rounded: "sm" }}
            onClick={() => {
              onProfileClick(); // Buka dialog
              setDrawerOpen(false); // Tutup drawer di mobile
            }}
          >
            Profil
          </Menu.Item>
          <Menu.Item onClick={logout} color="red.500" _hover={{ bg: "gray.100", rounded: "sm" }}>
            Logout
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}