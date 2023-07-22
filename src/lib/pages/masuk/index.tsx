'use client';

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Logo } from '../../components/Logo';
import { PasswordField } from '../../components/masuk/PasswordField';
import { OAuthButtonGroup } from '../../components/OAuthButtonGroup';
import type { AuthContextType } from '~/customHooks/interfaces';
import { useAuth } from '~/customHooks/useAuth';

const DASHBOARD_LINK = '/app/dashboard';

const Masuk = () => {
  const { signIn, user } = useAuth() as AuthContextType;
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  type ErrorMessages = {
    [key: string]: string;
  };

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

  useEffect(() => {
    if (user !== null) {
      router.push(DASHBOARD_LINK);
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      await signIn(email, password);
      toast({
        title: 'Signed in',
        description: 'You have successfully signed in',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        router.push(DASHBOARD_LINK);
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Error',
        description: getErrorMessage(error.code),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
              Masuk menggunakan akun Anda
            </Heading>
            <Text>
              Sudah memiliki akun?{' '}
              <Button variant="link" color="primary.500">
                <Link href="/daftar">Daftar</Link>
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
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" />
                </FormControl>
                <PasswordField />
              </Stack>
              <Stack spacing="6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  backgroundColor="primary.500"
                  color="primary.200"
                  _hover={{ bg: '#BAA1F6' }}
                  isLoading={isLoading}
                >
                  Masuk
                </Button>
                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    atau
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup
                  action="sign-in"
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

export default Masuk;
