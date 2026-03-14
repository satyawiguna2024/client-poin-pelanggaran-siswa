import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { Box, Container, Flex, IconButton, Heading, Drawer, List, Image, HStack, Separator, Dialog, Text, CloseButton } from "@chakra-ui/react";
import { TextAlignJustify, House, Users, GraduationCap, Layers, AlertTriangle, ClipboardList } from "lucide-react";
import { useProfileHook } from "../hooks/useProfileHooks";
import { Profile } from "../pages";
import IconWeb from "../assets/icon/illegal.png";

const sidebarList = [
  { icon: <House size={27} />, title: "Dashboard", url: "/dashboard" },
  { icon: <GraduationCap size={27} />, title: "Siswa", url: "/" },
  { icon: <Users size={27} />, title: "Guru", url: "/" },
  { icon: <Layers size={27} />, title: "Kelas", url: "/" },
  { icon: <AlertTriangle size={27} />, title: "Jenis Pelanggaran", url: "/" },
  { icon: <ClipboardList size={27} />, title: "Pelanggaran Siswa", url: "/" },
];

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const { getProfileSiswa } = useProfileHook();

  return (
    <>
      <Box shadow="md" p="5">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <HStack gap="2" alignItems="center">
              <Drawer.Root
                placement="start"
                open={isOpen}
                onOpenChange={(e) => setIsOpen(e.open)}
              >
                <Drawer.Trigger>
                  <IconButton size={{ base: "sm", sm: "md" }} variant="subtle">
                    <TextAlignJustify />
                  </IconButton>
                </Drawer.Trigger>

                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>
                        <HStack>
                          <Image
                            src={IconWeb}
                            alt="Icon Website"
                            width="53px"
                          />
                          <Heading as="h1">
                            Pelanggaran{" "}
                            <span style={{ display: "block" }}>Siswa</span>
                          </Heading>
                        </HStack>
                      </Drawer.Title>
                    </Drawer.Header>
                    <Separator my="3" />
                    <Drawer.Body>
                      <List.Root variant="none" spaceY="6">
                        {sidebarList.map((list) => (
                          <NavLink key={list.url} to={list.url}>
                            {({ isActive }) => (
                              <List.Item
                                fontWeight="medium"
                                fontSize="lg"
                                display="flex"
                                gapX="2"
                                alignItems="center"
                                p="2"
                                rounded="md"
                                _hover={{ bg: "gray.100" }}
                                bg={isActive ? "gray.100" : "transparent"}
                                color="gray.800"
                              >
                                {list.icon}
                                {list.title}
                              </List.Item>
                            )}
                          </NavLink>
                        ))}
                      </List.Root>

                      <Separator my="3" display={{md: "none"}} />

                      {/* Mobile Profile */}
                      <Box mt="4" display={{md: "none"}}>
                        <Profile
                          getProfileSiswa={getProfileSiswa}
                          setDrawerOpen={setIsOpen}
                          onProfileClick={() => setIsProfileDialogOpen(true)}
                        />
                      </Box>
                    </Drawer.Body>

                    <Drawer.CloseTrigger>
                      <CloseButton />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Drawer.Root>

              <HStack>
                <Image
                  src={IconWeb}
                  alt="Icon Website"
                  width={{ base: "53px", sm: "70px" }}
                />
                <Heading as="h1">
                  Pelanggaran <br /> Siswa
                </Heading>
              </HStack>
            </HStack>
          </Box>

          {/* Desktop Profile */}
          <Box display={{base: "none", md: "block"}}>
            <Profile
              getProfileSiswa={getProfileSiswa}
              onProfileClick={() => setIsProfileDialogOpen(true)}
            />
          </Box>
        </Flex>
      </Box>

      {/* Dialog di Luar Drawer */}
      <Dialog.Root
        open={isProfileDialogOpen}
        onOpenChange={(e) => setIsProfileDialogOpen(e.open)}
        placement="center"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Profile</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                praesentium!
              </Text>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      {/* outlet */}
      <Container pt="3">
        <Outlet />
      </Container>
    </>
  );
}
