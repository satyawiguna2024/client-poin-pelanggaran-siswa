import { 
  Box, 
  SimpleGrid, 
  Text, 
  Heading, 
  Stack, 
  Flex, 
  Icon, 
  Spinner,
  Container
} from "@chakra-ui/react";
import { 
  Users, 
  UserRound, 
  ShieldAlert, 
  School, 
  LayoutDashboard 
} from "lucide-react";

// Import hooks untuk fetch data
import { useShowAllKelas } from "../../hooks/useDataKelas";
import { useFindAll as useFindAllPelanggaran } from "../../hooks/usePelanggaranSiswa";
import { useQuery } from "@tanstack/react-query";
import { findAllSiswa, findAllGuru } from "../../services/dataUsers";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// ... existing imports ...

export default function Dashboard() {
  // 1. Fetch data dari berbagai endpoint
  const { getAllDataKelas, isPendingKelas } = useShowAllKelas();
  const { pelanggaranSiswa, isPendingPelanggaranSiswa } = useFindAllPelanggaran();
  
  // Fetch Siswa
  const { data: dataSiswa, isPending: isPendingSiswa } = useQuery({
    queryKey: ["get-all-siswa"],
    queryFn: findAllSiswa,
  });

  // Fetch Guru
  const { data: dataGuru, isPending: isPendingGuru } = useQuery({
    queryKey: ["get-all-guru"],
    queryFn: findAllGuru,
  });

  const isLoading = isPendingKelas || isPendingPelanggaranSiswa || isPendingSiswa || isPendingGuru;

  // 2. Logic Mengolah Data untuk Chart (30 hari terakhir)
  const chartData = (() => {
    if (!pelanggaranSiswa) return [];

    const countMap = {};
    
    // Inisialisasi 30 hari terakhir dengan format YYYY-MM-DD LOKAL
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      
      // Format manual ke YYYY-MM-DD agar aman dari masalah timezone
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      countMap[dateStr] = 0;
    }

    // Isi data dari hasil API
    pelanggaranSiswa.forEach((p) => {
      // Kita ambil bagian tanggal saja "YYYY-MM-DD" jika API mengirim "YYYY-MM-DD HH:mm:ss"
      const pDate = p.tanggal?.split(' ')[0]; 
      
      if (countMap[pDate] !== undefined) {
        countMap[pDate] += 1;
      }
    });

    // Urutkan kunci tanggal agar chart berjalan dari kiri ke kanan (terlama ke terbaru)
    const sortedDates = Object.keys(countMap).sort();

    return sortedDates.map((date) => ({
      date: new Date(date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' }),
      total: countMap[date]
    }));
  })();

  // 3. Definisi Stats Data
  const stats = [
    {
      label: "Total Siswa",
      value: dataSiswa?.length || 0,
      icon: UserRound,
      color: "blue.500",
      bg: "blue.50",
    },
    {
      label: "Total Guru",
      value: dataGuru?.length || 0,
      icon: Users,
      color: "purple.500",
      bg: "purple.50",
    },
    {
      label: "Total Kelas",
      value: getAllDataKelas?.length || 0,
      icon: School,
      color: "orange.500",
      bg: "orange.50",
    },
    {
      label: "Total Pelanggaran",
      value: pelanggaranSiswa?.length || 0,
      icon: ShieldAlert,
      color: "red.500",
      bg: "red.50",
    },
  ];

  return (
    <Container maxW="container.xl" py="8">
      <Stack gap="8">
        {/* Header Section */}
        <Box>
          <Flex alignItems="center" gap="3" mb="2">
            <Icon as={LayoutDashboard} boxSize={6} color="blue.600" />
            <Heading size="lg" fontFamily="poppins" fontWeight="bold">
              Dashboard Overview
            </Heading>
          </Flex>
          <Text color="gray.600" fontFamily="poppins">
            Selamat datang kembali! Berikut ringkasan data statistik sistem saat ini.
          </Text>
        </Box>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6">
          {stats.map((stat, index) => (
            <StatCard 
              key={index} 
              {...stat} 
              isLoading={isLoading} 
            />
          ))}
        </SimpleGrid>

        {/* Chart Section */}
        <Box 
          p="6" 
          bg="white" 
          rounded="2xl" 
          shadow="sm" 
          border="1px solid" 
          borderColor="gray.100"
        >
          <Heading size="md" mb="6" fontFamily="poppins" fontWeight="semibold">
            Pelanggaran Siswa (30 Hari Terakhir)
          </Heading>
          
          <Box h="300px" w="full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E53E3E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#E53E3E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontFamily: 'poppins', fill: '#718096' }}
                  interval={3}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontFamily: 'poppins', fill: '#718096' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'poppins'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#E53E3E" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}

// ── Komponen Kecil: StatCard ─────────────────────────────────────────────────

function StatCard({ label, value, icon, color, bg, isLoading }) {
  return (
    <Box
      bg="white"
      p="6"
      rounded="2xl"
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "md" }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Stack gap="1">
          <Text fontSize="sm" fontWeight="medium" color="gray.500" fontFamily="poppins">
            {label}
          </Text>
          {isLoading ? (
            <Spinner size="sm" color={color} />
          ) : (
            <Heading size="xl" fontFamily="poppins" fontWeight="bold" color="gray.800">
              {value}
            </Heading>
          )}
        </Stack>
        
        <Flex
          w="12"
          h="12"
          bg={bg}
          alignItems="center"
          justifyContent="center"
          rounded="xl"
        >
          <Icon as={icon} boxSize={6} color={color} />
        </Flex>
      </Flex>
    </Box>
  );
}
