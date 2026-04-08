import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Stat,
  StatHelpText,
} from "@chakra-ui/react";
import { FiDollarSign, FiShare2, FiThumbsUp } from "react-icons/fi";

export default function Dashboard() {
  const token = localStorage.getItem('token');

  return (
    <Box minH="100vh" p={6}>
      {/* Header */}
      <Heading size="lg" mb={6}>
        Dashboard
      </Heading>
      <Heading size="lg" mb={6}>
        Token: {token}
      </Heading>

      {/* Chart Section */}
      <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" mb={6}>
        <Flex justify="space-between" mb={4}>
          <Text fontWeight="semibold">Result</Text>
          <Box
            px={3}
            py={1}
            bg="orange.400"
            color="white"
            borderRadius="md"
            fontSize="sm"
          >
            Check Now
          </Box>
        </Flex>

        {/* Dummy Chart */}
        <Box
          h="200px"
          borderRadius="md"
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="gray.400"
        >
          Chart Placeholder
        </Box>
      </Box>

      {/* Bottom Section */}
      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
        {/* Area Chart Dummy */}
        <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="semibold" mb={4}>
            Overview
          </Text>

          <Box
            h="180px"
            bg="gray.100"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray.400"
          >
            Area Chart Placeholder
          </Box>
        </Box>

        {/* Calendar Dummy */}
        <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="semibold" mb={4}>
            Calendar
          </Text>

          <Box
            h="180px"
            bg="gray.100"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray.400"
          >
            Calendar Placeholder
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

/* 🔹 Reusable Stat Card */
function StatCard({ title, value, icon, bg = "white", color = "black" }) {
  return (
    <Box bg={bg} color={color} p={5} borderRadius="xl" boxShadow="md">
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontSize="sm" opacity={0.8}>
          {title}
        </Text>
        <Box fontSize="lg">{icon}</Box>
      </Flex>

      <Stat>
        <Stat fontSize="2xl">{value}</Stat>
        <StatHelpText fontSize="xs">Updated just now</StatHelpText>
      </Stat>
    </Box>
  );
}
