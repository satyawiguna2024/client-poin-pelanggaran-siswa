import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { Avatar, Box, Container, Flex, IconButton, Heading, Drawer, List, Image, HStack, Separator, Link } from "@chakra-ui/react";
import { TextAlignJustify, X, House, Users, GraduationCap, Layers, AlertTriangle, ClipboardList } from "lucide-react";
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

  return (
    <>
      <Box shadow="md" p="5">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <HStack gap="2" alignItems="center">
              {/* Drawer */}
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
                                _hover={{ bg: "gray.200" }}
                                bg={isActive ? "gray.200" : "transparent"}
                                color="gray.800"
                              >
                                {list.icon}
                                {list.title}
                              </List.Item>
                            )}
                          </NavLink>
                        ))}
                      </List.Root>
                      <Separator my="3" display={{ sm: "none" }} />
                      <Link href="/dashboard/profile">
                        <HStack
                          display={{ base: "flex", sm: "none" }}
                          justifyContent="start"
                          alignItems="center"
                          flexDirection="row-reverse"
                        >
                          <Box>
                            <Heading unstyled as="h3">
                              Satya Wiguna
                            </Heading>
                            <Heading unstyled as="h3">
                              satya01@gmail.com
                            </Heading>
                          </Box>

                          <Avatar.Root size={{ base: "lg", sm: "xl" }}>
                            <Avatar.Fallback name="Ahmad Subarjo" />
                            <Avatar.Image src="https://bit.ly/sage-adebayo" />
                          </Avatar.Root>
                        </HStack>
                      </Link>
                    </Drawer.Body>

                    {/* close trigger */}
                    <Drawer.CloseTrigger>
                      <X />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Drawer.Root>
              {/* title */}
              <HStack>
                <Image
                  src={IconWeb}
                  alt="Icon Website"
                  width={{ base: "53px", sm: "70px" }}
                />
                <Heading as="h1">
                  Pelanggaran <span style={{ display: "block" }}>Siswa</span>
                </Heading>
              </HStack>
            </HStack>
          </Box>

          <Box>
            <Link href="/dashboard/profile">
              <HStack gap="3" alignItems="center">
                <Box display={{ base: "none", md: "block" }} textAlign="end">
                  <Heading unstyled as="h3">
                    Satya Wiguna
                  </Heading>
                  <Heading unstyled as="h3">
                    satya01@gmail.com
                  </Heading>
                </Box>

                {/* avatar profile */}
                <Avatar.Root
                  size={{ base: "lg", sm: "xl" }}
                  display={{ base: "none", sm: "block" }}
                >
                  <Avatar.Fallback name="Ahmad Subarjo" />
                  <Avatar.Image src="https://bit.ly/sage-adebayo" />
                </Avatar.Root>
              </HStack>
            </Link>
          </Box>
        </Flex>
      </Box>

      {/* outlet */}
      <Container pt="3">
        <Outlet />
      </Container>
    </>
  );
}
