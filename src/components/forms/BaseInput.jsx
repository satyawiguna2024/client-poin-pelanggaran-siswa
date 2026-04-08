import { Field, Input, InputGroup } from "@chakra-ui/react";

export default function BaseInput({
  label,
  error,
  required,
  icon,
  ...inputProps
}) {
  return (
    <>
      <Field.Root invalid={!!error} required={required}>
        {label && (
          <Field.Label>
            {label} <Field.RequiredIndicator />
          </Field.Label>
        )}

        {/* Input */}
        {icon ? (
          <InputGroup startElement={icon}>
            <Input required={required} {...inputProps} />
          </InputGroup>
        ) : (
          <Input required={required} {...inputProps} />
        )}

        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    </>
  );
}
