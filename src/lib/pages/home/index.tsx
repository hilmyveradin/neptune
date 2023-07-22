'use client';

import {
  Box,
  VStack,
  Button,
  HStack,
  Flex,
  Text,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import type { AuthContextType } from '~/customHooks/interfaces';
import { useAuth } from '~/customHooks/useAuth';
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

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Header />
      <VStack
        flex="1"
        align="center"
        justify="center"
        px={isMobile ? '4px' : ''}
      >
        <Box width="100%" textAlign="center" maxWidth={1100}>
          <HStack justifyContent={isMobile ? 'center' : 'space-between'}>
            <Flex
              direction="column"
              alignItems={isMobile ? 'center' : 'start'}
              pb="100px"
            >
              <Text fontSize="5xl" fontWeight="bold">
                {' '}
                Selamat Datang di BagiBuku.id{' '}
              </Text>
              <Text fontSize="3xl" fontWeight="medium">
                {' '}
                Berbagi buku untuk semua!{' '}
              </Text>
              <Text textAlign={isMobile ? 'center' : 'left'}>
                Kami percaya bahwa setiap orang berhak mendapatkan akses
                terhadap buku. BagiBuku.id adalah wadah bagi Anda yang ingin
                meminta, mendonasikan, dan berdiskusi segala hal mengenai buku
                dengan mudah. Dimanapun. Kapanpun.
              </Text>
              <Button
                onClick={cobaSekarangButtonClick}
                mt="4"
                bgColor="primary.500"
                textColor="white"
                _hover={{ bg: '#BAA1F6' }}
              >
                {' '}
                Bergabung Sekarang!{' '}
              </Button>
              <Spacer />
            </Flex>
            {!isMobile && <Text fontSize="400px"> 📕 </Text>}
          </HStack>
        </Box>
      </VStack>
    </>
  );
};

export default Home;
