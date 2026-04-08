import { Field, Textarea } from "@chakra-ui/react";

export default function BaseTextarea({
  label,
  error,
  required,
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

        <Textarea {...inputProps} />
        {error && (<Field.ErrorText>{error}</Field.ErrorText>)}
      </Field.Root>
    </>
  );
}
