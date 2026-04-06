import { Dialog, Portal, CloseButton, Button } from "@chakra-ui/react";

export default function BaseDialog() {
  return (
    <>
      <Dialog.Root placement={{ base: "center", md: "top" }}>
        <Dialog.Trigger asChild>
          <Button
            unstyled
            bg="white"
            border='1px solid var(--chakra-colors-gray-300)'
            p={{base: "5px 6px", md:"6px 15px"}}
            display="flex"
            gapX="1"
            rounded="sm"
            fontFamily="poppins"
            fontWeight="semibold"
            cursor="pointer"
            color="blue.500"
          >
            Add New
          </Button>
        </Dialog.Trigger>

        {/* portal dialog */}
        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content>
              {/* header dialog */}
              <Dialog.Header>
                <Dialog.Title>Title Dialog</Dialog.Title>
              </Dialog.Header>

              {/* isi content */}
              <Dialog.Body>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Harum provident similique laborum quis, quod sequi amet
                  praesentium quo voluptatibus quidem?
                </p>
              </Dialog.Body>

              {/* footer dialog */}
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button>Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>

                {/* dialog close icon */}
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
