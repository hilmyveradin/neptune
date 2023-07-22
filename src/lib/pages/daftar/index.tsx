'use client';

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import type { AuthContextType } from '~/customHooks/interfaces';
import { useAuth } from '~/customHooks/useAuth';
import { Logo } from '~/lib/components/Logo';
import { OAuthButtonGroup } from '~/lib/components/OAuthButtonGroup';

const DASHBOARD_LINK = '/app/dashboard';

const Daftar = () => {
  const { signUp, user } = useAuth() as AuthContextType;
  const toast = useToast();
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  type ErrorMessages = {
    [key: string]: string;
  };

  useEffect(() => {
    if (user !== null) {
      router.push(DASHBOARD_LINK);
    }
  }, [user]);

  const getErrorMessage = (errorCode: string) => {
    const errorMessages: ErrorMessages = {
      'auth/email-already-in-use': 'Email sudah digunakan',
      'auth/invalid-email': 'Email tidak valid',
      'auth/operation-not-allowed': 'Operasi tidak diizinkan',
      'auth/weak-password': 'Kata sandi kurang dari 6 karakter',
      'auth/user-disabled': 'Pengguna dinonaktifkan',
      'auth/user-not-found': 'Pengguna tidak ditemukan',
      'auth/wrong-password': 'Kata sandi salah',
      // Add more error codes and translations as needed
    };

    return errorMessages[errorCode] || 'Terjadi kesalahan';
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    setIsLoading(true); // Set isLoading to true when the form is submitted

    try {
      await signUp(email, password, displayName);
      toast({
        title: 'Akun berhasil dibuat',
        description: 'Akun anda berhasil dibuat!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push(DASHBOARD_LINK);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Error',
        description: getErrorMessage(error.code),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSuccess = () => {
    router.push(DASHBOARD_LINK);
  };

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>
              Daftarkan akun Anda sekarang!
            </Heading>
            <Text>
              Sudah memiliki akun?{' '}
              <Button variant="link" color="primary.500">
                <Link href="/daftar">Masuk</Link>
              </Button>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl isRequired>
                  <FormLabel htmlFor="nama">Nama</FormLabel>
                  <Input
                    id="nama"
                    type="text"
                    placeholder="Nama Lengkap"
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" placeholder="Email" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" placeholder="Password" />
                  <FormHelperText>
                    Minimal memiliki panjang 6 karakter
                  </FormHelperText>
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  backgroundColor="#6528F7"
                  color="#EDE4FF"
                  _hover={{ bg: '#BAA1F6' }}
                  isLoading={isLoading}
                >
                  Daftar
                </Button>
                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    atau
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup
                  action="sign-up"
                  onSuccess={handleSignInSuccess}
                />
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Daftar;
