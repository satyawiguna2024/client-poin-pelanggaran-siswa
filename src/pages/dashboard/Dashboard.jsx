import { Code, Heading, Text } from "@chakra-ui/react";

export default function Dashboard() {
  const token = localStorage.getItem("jwtToken");

  return (
    <>
      <Heading>Dashboard</Heading>
      <Text>Token Akun Ini: <Code colorPalette="red">{token}</Code></Text>
    </>
  )
}
