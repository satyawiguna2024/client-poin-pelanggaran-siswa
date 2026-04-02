import { Avatar, Box, CloseButton, Dialog, Float, Heading, Image, Text } from "@chakra-ui/react";
import bgAvatarImage from "../../assets/img/avatar-bg.jpg";

export default function DialogProfil({ openDialog, onOpenChangeDialog }) {
  return (
    <>
      {/* Dialog di Luar Drawer */}
      <Dialog.Root
        open={openDialog}
        onOpenChange={onOpenChangeDialog}
        placement="center"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content mx={{base: "1", sm: "0"}} bg="white">
            <Dialog.Header>
              <Dialog.Title unstyled fontFamily="poppins" fontSize={{base: "xl", xs: "2xl"}} fontWeight="medium" color="text.primary">Profil</Dialog.Title>
            </Dialog.Header>

            {/* content dialog */}
            <Dialog.Body>
              <Box pos="relative">
                {/* image */}
                <Image src={bgAvatarImage} alt="Avatar Image Cokda" w="full" h="230px" rounded="sm" bgPos="center" objectFit="cover" />
                <Box pos="absolute" top="0" left="0" w="full" h="full" bg="blackAlpha.400" rounded="sm" />
                {/* avatar akun */}
                <Float placement="bottom-start" offsetX="10">
                  <Avatar.Root size={{ base: "lg", md: "xl" }} border="2px solid white">
                    <Avatar.Fallback name="Cokda" />
                    <Avatar.Image
                      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=1&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffeaa7`}
                    />
                  </Avatar.Root>
                </Float>
              </Box>

                {/* text seperti: nama, email, umur */}
              <Box pt="8">
                <Heading unstyled as="h3" fontFamily="poppins" color="text.primary">cokda</Heading>
                <Heading unstyled as="h4" fontFamily="poppins" color="text.primary">cokda2026@gmail.com</Heading>
              </Box>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" color="text.primary" _hover={{bg: 'gray.200'}} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
}
