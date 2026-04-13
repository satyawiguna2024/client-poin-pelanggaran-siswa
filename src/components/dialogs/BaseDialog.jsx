import { Dialog, Portal, CloseButton, Button } from "@chakra-ui/react";

export default function BaseDialog({title, footer, open, onOpenChange, onClickAdd, children, size, variant, labelButton}) {
  const isCostume = !variant;
  return (
    <>
      <Dialog.Root placement={{ base: "center", md: "top" }} size={size || "md"} open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>
          <Button
            unstyled
            onClick={onClickAdd}
            bg={isCostume ? "white" : undefined}
            border={isCostume ? '1px solid var(--chakra-colors-gray-300)' : undefined}
            p={ isCostume ? {base: "5px 6px", md:"6px 15px"} : {base: "5px 6px", md:"0px"}}
            display="flex"
            gapX="1"
            rounded="sm"
            fontFamily="poppins"
            fontWeight={ isCostume ? "semibold" : "medium"}
            cursor="pointer"
            color={isCostume ? "blue.500" : "yellow.600"}
          >
            {labelButton || "Add New"}
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
