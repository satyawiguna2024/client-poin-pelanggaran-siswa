import { Avatar, Box, Heading, Image, Text, Link } from "@chakra-ui/react";
import image from "../../assets/img/front-school.jpg";
import icon from "../../assets/icon/illegal.png";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        w="100%"
      >
        {/* forms */}
        <Box w={{ base: "100%", md: "50%" }} maxW="500px" p={6}>
          <Box w="full" bg="gray.50" shadow="lg" boxShadow="0px 4px 10px var(--chakra-colors-gray-300)" p="5" rounded="md">
            <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" textAlign="center">
              {/* avatar */}
              <Avatar.Root size="2xl" bg="gray.200">
                <Avatar.Fallback name="Pelanggaran Siswa" />
                <Avatar.Image src={icon} />
              </Avatar.Root>

              <Heading color="text.primary">Pelanggaran Siswa</Heading>
              <Text color="text.primary" maxW='300px'>
                Jika anda belum memiliki akun silahkan hubungi pihak sekolah.
              </Text>
            </Box>

            {/* input */}
            <Box pt="5">
              <Outlet />
            </Box>
          </Box>
        </Box>

        {/* gambar */}
        <Box flex="1" display={{ base: "none", md: "block" }} position="relative">
          <Image src={image} alt="Gambar background sekolah" w="100%" h="100vh" objectFit="cover" />

          {/* backdrop/overlay */}
          <Box position="absolute" inset="0" bg="blackAlpha.400" />
        </Box>
      </Box>
    </>
  );
}
