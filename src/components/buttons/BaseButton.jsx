import { Button } from "@chakra-ui/react";

export default function BaseButton({ label, ...buttonProps}) {
  return (
    <>
      <Button
        unstyled
        rounded="sm"
        p="5px 10px"
        bg="black"
        fontFamily="poppins"
        border="1px solid var(--chakra-colors-gray-300)"
        color="white"
        cursor="pointer"
        {...buttonProps}
      >
        {label}
      </Button>
    </>
  );
}
