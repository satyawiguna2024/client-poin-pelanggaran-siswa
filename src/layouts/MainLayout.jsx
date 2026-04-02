import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { Box, Container, Flex, IconButton, Heading, Drawer, List, Image, HStack, Separator, CloseButton, Collapsible } from "@chakra-ui/react";
import { TextAlignJustify, House, Layers, ClipboardList, Dot, Archive, FileText } from "lucide-react";
import { LuChevronRight } from "react-icons/lu";
import { useProfileHook } from "../hooks/useProfileHooks";
import { Profile } from "../pages";
import IconWeb from "../assets/icon/illegal.png";
import DialogProfil from "../pages/profile/DialogProfil";

const sidebarList = [
  { icon: <House size={27} />, title: "Dashboard", url: "/dashboard" },
  { icon: <ClipboardList size={27} />, title: "Pelanggaran Siswa", url: "/pelanggaran-siswa" },

  // submenu Master Data
  {
    icon: <Layers size={27} />,
    title: "Master Data",
    submenu: [
      { icon: <Dot size={27} />, title: "Data Siswa", url: "/" },
      { icon: <Dot size={27} />, title: "Data Guru", url: "/" },
      { icon: <Dot size={27} />, title: "Data Kelas", url: "/" },
      { icon: <Dot size={27} />, title: "Data Jenis Pelanggaran", url: "/",},
    ],
  },

  // submenu laporan
  {
    icon: <FileText size={27} />,
    title: "Laporan",
    submenu: [
      { icon: <Dot size={27} />, title: "Laporan Pelanggaran Siswa", url: "/" },
      { icon: <Dot size={27} />, title: "Laporan Surat Panggilan Ortu", url: "/" },
      { icon: <Dot size={27} />, title: "Laporan Surat Perjanjian", url: "/" },
      { icon: <Dot size={27} />, title: "Laporan Surat Pindah", url: "/",},
    ],
  },

  // submenu cetak surat
  {
    icon: <Archive size={27} />,
    title: "Cetak Surat",
    submenu: [
      { icon: <Dot size={27} />, title: "Cetak Surat Perjanjian", url: "/" },
      { icon: <Dot size={27} />, title: "Cetak Surat Panggilan Ortu", url: "/" },
      { icon: <Dot size={27} />, title: "Cetak Surat Perjanjian Ortu", url: "/" },
      { icon: <Dot size={27} />, title: "Cetak Surat Pindah", url: "/",},
    ],
  },
];

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const { getProfileSiswa } = useProfileHook();

  return (
    <>
      <Box shadow="md" boxShadow="0px 4px 10px var(--chakra-colors-gray-200)" p="5" bg="white">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <HStack gap="2" alignItems="center">
              <Drawer.Root
                placement="start"
                open={isOpen}
                onOpenChange={(e) => setIsOpen(e.open)}
              >
                <Drawer.Trigger>
                  <IconButton size={{ base: "sm", sm: "md" }} color="text.primary" variant="ghost" _hover={{bg: 'gray.100'}}>
                    <TextAlignJustify />
                  </IconButton>
                </Drawer.Trigger>

                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content bg="white">
                    <Drawer.Header>
                      <Drawer.Title>
                        <HStack>
                          <Image
                            src={IconWeb}
                            alt="Icon Website"
                            width="53px"
                          />
                          <Heading as="h1" unstyled fontFamily="poppins" fontSize="lg" color="text.primary">Pelanggaran <br/> Siswa</Heading>
                        </HStack>
                      </Drawer.Title>
                    </Drawer.Header>
                    <Separator my="3" borderColor="gray.200" />
                    <Drawer.Body>
                      <List.Root variant="none" spaceY="5">
                        {sidebarList.map((list) => {
                          // Menu dengan submenu (Master Data)
                          if (list.submenu) {
                            return (
                              <Collapsible.Root key={list.title}>
                                <Collapsible.Trigger>
                                  <List.Item
                                    unstyled
                                    fontFamily="poppins"
                                    fontWeight="medium"
                                    fontSize="lg"
                                    display="flex"
                                    gapX="2"
                                    alignItems="center"
                                    p="2"
                                    rounded="md"
                                    _hover={{ bg: "gray.100" }}
                                    color="gray.800"
                                    cursor="pointer"
                                  >
                                    {list.icon}
                                    <Box flex="1">{list.title}</Box>
                                    
                                    {/* animasi icon trigger */}
                                    <Collapsible.Indicator transition="transform 0.2s" _open={{ transform: "rotate(90deg)" }}>
                                      <LuChevronRight />
                                    </Collapsible.Indicator>
                                  </List.Item>
                                </Collapsible.Trigger>
                                <Collapsible.Content>
                                  <List.Root
                                    variant="none"
                                    spaceY="2"
                                    pl="8"
                                    pt="2"
                                  >
                                    {/* list menu yang berisi submenu */}
                                    {list.submenu.map((subitem) => (
                                      <NavLink
                                        key={subitem.url}
                                        to={subitem.url}
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {({ isActive }) => (
                                          <List.Item
                                            unstyled
                                            fontFamily="poppins"
                                            fontWeight="medium"
                                            fontSize="md"
                                            display="flex"
                                            gapX="2"
                                            alignItems="center"
                                            p="2"
                                            rounded="md"
                                            _hover={{ bg: "gray.100" }}
                                            bg={
                                              isActive
                                                ? "gray.100"
                                                : "transparent"
                                            }
                                            color="gray.800"
                                          >
                                            {subitem.icon}
                                            {subitem.title}
                                          </List.Item>
                                        )}
                                      </NavLink>
                                    ))}
                                  </List.Root>
                                </Collapsible.Content>
                              </Collapsible.Root>
                            );
                          }

                          // Menu regular tanpa submenu
                          return (
                            <NavLink key={list.url} to={list.url} onClick={() => setIsOpen(false)}>
                              {({ isActive }) => (
                                <List.Item
                                  unstyled
                                  fontFamily="poppins"
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
                          );
                        })}
                      </List.Root>

                      <Separator my="3" display={{ md: "none" }} />

                      {/* Mobile Profile */}
                      <Box mt="4" display={{ md: "none" }}>
                        <Profile
                          getProfileSiswa={getProfileSiswa}
                          setDrawerOpen={setIsOpen}
                          onProfileClick={() => setIsProfileDialogOpen(true)}
                        />
                      </Box>
                    </Drawer.Body>
                    <Drawer.CloseTrigger>
                      <CloseButton color="text.primary" _hover={{bg: 'gray.100'}} />
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
                <Heading as="h1" color="text.primary">
                  Pelanggaran <br /> Siswa
                </Heading>
              </HStack>
            </HStack>
          </Box>

          {/* Desktop Profile */}
          <Box display={{ base: "none", md: "block" }}>
            <Profile
              getProfileSiswa={getProfileSiswa}
              onProfileClick={() => setIsProfileDialogOpen(true)}
            />
          </Box>
        </Flex>
      </Box>

      {/* Dialog di Luar Drawer */}
      <DialogProfil openDialog={isProfileDialogOpen} onOpenChangeDialog={(e) => setIsProfileDialogOpen(e.open)} />

      {/* outlet / content dari file App.jsx */}
      <Container pt="3">
        <Outlet />
      </Container>
    </>
  );
}
