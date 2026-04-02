import { Code, Heading, Text } from "@chakra-ui/react";

export default function Dashboard() {
  const token = localStorage.getItem("jwtToken");

  return (
    <>
      <Heading color="text.primary">Dashboard</Heading>
      <Text color="text.primary">Token Akun Ini: <Code colorPalette={{base: "red", _dark: "purple"}}>{token}</Code></Text>
    </>
  )
}
