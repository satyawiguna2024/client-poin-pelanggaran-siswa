import { Avatar, Box, Heading, HStack, Menu } from "@chakra-ui/react";

export default function Profile() {
  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  }

  return (
    <Menu.Root>
      <Menu.Trigger>
        <HStack gap="3" flexDir={{base: "row-reverse", md: "row"}}>
          <Box textAlign={{base: "start", md: "end"}}>
            <Heading unstyled as="h3" color="gray.200">
              cokda
            </Heading>
            <Heading unstyled as="h3" color="gray.200">
              cokdaganteng01@gmail.com
            </Heading>
          </Box>

          {/* avatar profile */}
          <Avatar.Root
            shape="square"
            size={{ base: "lg", md: "xl" }}
          >
            <Avatar.Fallback name="Cokda" />
            {/* <Avatar.Image
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${1}&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffeaa7`}
            /> */}
          </Avatar.Root>
        </HStack>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item 
            onClick={logout} 
            color="red.500" 
            _hover={{ bg: {base: "gray.100", _dark: "gray.600"}, rounded: "sm" }}
          >
            Logout
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}