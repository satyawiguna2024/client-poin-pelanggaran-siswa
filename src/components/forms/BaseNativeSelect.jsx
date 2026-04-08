import { NativeSelect, Field } from "@chakra-ui/react";

export default function BaseNativeSelect({
  placeholder = "Pilih Aksi",
  label,
  required,
  error,
  options = [],
  ...fieldProps
}) {
  return (
    <Field.Root invalid={!!error} required={required}>
      {label && (
        <Field.Label>
          {label} <Field.RequiredIndicator />
        </Field.Label>
      )}

      <NativeSelect.Root unstyled position="relative" width="full">
        <NativeSelect.Field
          placeholder={placeholder}
          {...fieldProps}
          width="full"
          px="10px"
          py="6px"
          fontFamily="poppins"
          color="text.primary"
          fontSize="sm"
          border="1px solid var(--chakra-colors-gray-300)"
          bg="white"
          rounded="sm"
          _hover={{ borderColor: "gray.400" }}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
        >
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </NativeSelect.Field>
      </NativeSelect.Root>

      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
}
