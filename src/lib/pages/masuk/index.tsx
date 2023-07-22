'use client';

import {
  Box,
  Button,
  Checkbox,
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
} from '@chakra-ui/react';

import { Logo } from '../../components/masuk/Logo';
import { OAuthButtonGroup } from '../../components/masuk/OAuthButtonGroup';
import { PasswordField } from '../../components/masuk/PasswordField';

const Masuk = () => (
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
            Belum memiliki akun?
            <Link href="http://localhost:3000/daftar" color="#A076F9">
              Daftar
            </Link>
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
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" />
            </FormControl>
            <PasswordField />
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Ingat Saya</Checkbox>
            <Button variant="text" size="sm" color="#A076F9">
              Lupa kata sandi?
            </Button>
          </HStack>
          <Stack spacing="6">
            <Button
              backgroundColor="#6528F7"
              color="#EDE4FF"
              _hover={{ bg: '#BAA1F6' }}
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
            <Button>
              <OAuthButtonGroup /> Masuk dengan Google
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>
);

export default Masuk;
