'use client';

import { Box, VStack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import type { AuthContextType } from '~/customHooks/interfaces';
import { useAuth } from '~/customHooks/useAuth';
import Footer from '~/lib/layout/Footer';
import Header from '~/lib/layout/Header';

const Home = () => {
  const router = useRouter();

  const { user } = useAuth() as AuthContextType;

  const cobaSekarangButtonClick = () => {
    if (user) {
      router.push('/app/dashboard');
    } else {
      router.push('/daftar');
    }
  };

  return (
    <VStack
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      // gap={4}
      mb={8}
      p="4"
      w="100%"
      spacing="8px"
    >
      <Header />
      <Box minHeight="500px" width="100%" textAlign="center" bg="red.100">
        <Button onClick={cobaSekarangButtonClick}> Coba Sekarang </Button>
      </Box>
      <Footer />
    </VStack>
  );
};

export default Home;
