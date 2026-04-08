import { Dialog, Portal, CloseButton, Button } from "@chakra-ui/react";

export default function BaseDialog({title, footer, open, onOpenChange, onClickAdd, children}) {
  return (
    <>
      <Dialog.Root placement={{ base: "center", md: "top" }} open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>
          <Button
            unstyled
            onClick={onClickAdd}
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
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>

              {/* isi content */}
              <Dialog.Body>
                {children}
              </Dialog.Body>

              {/* footer dialog */}
              <Dialog.Footer>
                {footer}
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
