import { Button, Code, Heading, Text } from "@chakra-ui/react";


export default function Dashboard() {
  const token = localStorage.getItem("jwtToken");

  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  }

  return (
    <>
      <Heading>Dashboard</Heading>
      <Text>Token Akun Ini: <Code colorPalette="red">{token}</Code></Text>
      <Button onClick={logout}>Logout</Button>
    </>
  )
}
