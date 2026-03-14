import { Avatar, Box, Button, Container, Flex, Float, Heading, HStack, IconButton, Image, List, Separator, Text, Link } from "@chakra-ui/react";
import { ArrowLeft, LogOut, User, UserPen } from "lucide-react";
import { useProfileHook } from "../../hooks/useProfileHooks";

export default function Profile() {
  const {getProfileSiswa, isPending} = useProfileHook();

  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  }

  return (
    <>
      {isPending ? (
        <>
          <Heading>Loading...</Heading>
        </>
      ):(
        !getProfileSiswa ? (
          <>
            <Box>
              <Container unstyled maxW="4xl" mx="auto">
                <Box position="relative">
                <Image src={`https://picsum.photos/seed/${getProfileSiswa?.data?.users?.id}/800/300`} alt="Bg Profile" w="full" h="72" />
                <Box position="absolute" inset="0" bg="blackAlpha.300" />
                {/* icon button back */}
                <Float offsetX="10" offsetY="8" placement="top-start">
                  <Link href="/dashboard">
                    <IconButton size="sm" variant="surface">
                      <ArrowLeft />
                    </IconButton>
                  </Link>
                </Float>
                {/* avatar */}
                <Float offsetX={{base: "14", sm: "20"}} placement="bottom-start">
                  <Avatar.Root boxSize={{ base: "70px", md: "80px" }} border="3px solid" borderColor="white">
                    <Avatar.Fallback name="Satya Wiguna" />
                    <Avatar.Image src="https://bit.ly/sage-adebayo" />
                  </Avatar.Root>
                </Float>
                </Box>
                {/* identitas */}
                <Box p={{base: "50px 10px", sm: "50px 45px"}}>
                  {/* username */}
                  <Heading unstyled fontSize="xl" fontWeight="semibold" as="h2">Satya</Heading>
                  {/* email */}
                  <Heading unstyled fontWeight="medium" as="h4">satya01@gmail.com</Heading>
                  {/* kelas */}
                  <Heading unstyled fontWeight="medium" as="h6">kelas: XII RPL 3</Heading>

                  {/* button */}
                  <Box display="flex" gap="5" pt="5">
                    <Button colorPalette="gray">
                      <UserPen size={18} /> Edit Profile
                    </Button>
                    <Button colorPalette="red" onClick={logout}>
                      <LogOut size={18} /> Logout
                    </Button>
                  </Box>
                </Box>
                <Box p={{base: "50px 10px", sm: "50px 45px"}}>
                  <Heading>Tidak ada profile silahkan buat terlebih dahulu!</Heading>
                </Box>
              </Container>
            </Box>
          </>
        ):(
          <Box>
            <Container unstyled maxW="4xl" mx="auto">
              <Box position="relative">
                <Image src={`https://picsum.photos/seed/${getProfileSiswa?.data?.users?.id}/800/300`} alt="Bg Profile" w="full" h="72" />
                <Box position="absolute" inset="0" bg="blackAlpha.300" />
                {/* icon button back */}
                <Float offsetX="10" offsetY="8" placement="top-start">
                  <Link href="/dashboard">
                    <IconButton size="sm" variant="surface">
                      <ArrowLeft />
                    </IconButton>
                  </Link>
                </Float>
                {/* avatar */}
                <Float offsetX={{base: "14", sm: "20"}} placement="bottom-start">
                  <Avatar.Root boxSize={{ base: "70px", md: "80px" }} border="3px solid" borderColor="white">
                    <Avatar.Fallback name={getProfileSiswa?.data?.users?.username} />
                    <Avatar.Image src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${getProfileSiswa?.data?.users?.id}&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffeaa7`} />
                  </Avatar.Root>
                </Float>
              </Box>

              {/* identitas */}
              <Box p={{base: "50px 10px", sm: "50px 45px"}}>
                {/* username */}
                <Heading unstyled fontSize="xl" fontWeight="semibold" as="h2">{getProfileSiswa?.data?.users?.username}</Heading>
                {/* email */}
                <Heading unstyled fontWeight="medium" as="h4">{getProfileSiswa?.data?.users?.email}</Heading>
                {/* kelas */}
                <Heading unstyled fontWeight="medium" as="h6">kelas: {getProfileSiswa?.data?.kelas?.nama_kelas}</Heading>

                {/* button */}
                <Box display="flex" gap="5" pt="5">
                  <Button colorPalette="gray">
                    <UserPen size={18} /> Edit Profile
                  </Button>
                  <Button colorPalette="red" onClick={logout}>
                    <LogOut size={18} /> Logout
                  </Button>
                </Box>
              </Box>

              <Separator />

              {/* datasiswa | data ortu */}
              <Box pt="10">
                <Flex gap="5" flexDir={{base: "column", sm: "row"}}>
                  <Box flex="1" p={{base: "0px 15px"}}>
                    <List.Root spaceY="10" variant="none">
                      {/* nama */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Nama: <Text unstyled display="block" textTransform="none">Satya Wiguna</Text></Heading>
                        </HStack>
                      </List.Item>

                      {/* alamat */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Alamat: <Text unstyled display="block" textTransform="none">JL. Jakarta Selatan</Text></Heading>
                        </HStack>
                      </List.Item>
                      
                      {/* Kelas */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Kelas: <Text unstyled display="block" textTransform="none">XII RPL 3</Text></Heading>
                        </HStack>
                      </List.Item>

                      {/* Nis */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Nis: <Text unstyled display="block" textTransform="none">8090</Text></Heading>
                        </HStack>
                      </List.Item>

                      {/* Tanggal Lahir */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Tanggal Lahir: <Text unstyled display="block" textTransform="none">2007-10-22</Text></Heading>
                        </HStack>
                      </List.Item>

                      {/* Jenis Kelamin */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Jenis Kelamin: <Text unstyled display="block" textTransform="none">Laki Laki</Text></Heading>
                        </HStack>
                      </List.Item>

                      {/* Agama */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Agama: <Text unstyled display="block" textTransform="none">Hindu</Text></Heading>
                        </HStack>
                      </List.Item>

                    </List.Root>
                  </Box>
                  <Separator orientation={{base: "horizontal", sm:"vertical"}} h="auto" />
                  <Box flex="1" p={{base: "0px 15px"}}>
                    <List.Root spaceY="10" variant="none">
                      {/* nama ayah*/}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Nama Ayah: <Text unstyled display="block" textTransform="none">Bapak Satya Wiguna</Text></Heading>
                        </HStack>
                      </List.Item>

                      {/* nama ibu */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Nama Ibu: <Text unstyled display="block" textTransform="none">Ibu Satya</Text></Heading>
                        </HStack>
                      </List.Item>
                      
                      {/* Pekerjaan ayah */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Pekerjaan Ayah: <Text unstyled display="block" textTransform="none">Desainer</Text></Heading>
                        </HStack>
                      </List.Item>

                      {/* Pekerjaan ibu */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Pekerjaan Ibu: <Text unstyled display="block" textTransform="none">Ibu Rumah Tangga</Text></Heading>
                        </HStack>
                      </List.Item>

                      {/* Tanggal Lahir */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Tanggal Lahir: <Text unstyled display="block" textTransform="none">2007-10-22</Text></Heading>
                        </HStack>
                      </List.Item>

                      {/* Telepon Ayah */}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Telepon Ayah: <Text unstyled display="block" textTransform="none">+62 812 3456 7890</Text></Heading>
                        </HStack>
                      </List.Item>

                      {/* Telepon Ibu*/}
                      <List.Item>
                        <HStack alignItems="center">
                          <User size={28} />
                          <Heading unstyled textTransform="uppercase">Telepon Ibu: <Text unstyled display="block" textTransform="none">+62 812 3456 7890</Text></Heading>
                        </HStack>
                      </List.Item>
                    </List.Root>
                  </Box>
                </Flex>
              </Box>
            </Container>
          </Box>
        )
      )}
    </>
  )
}
