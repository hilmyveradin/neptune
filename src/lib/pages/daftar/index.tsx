/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import {
  Box,
  Button,
  Checkbox,
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
} from '@chakra-ui/react';

// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { NextSeo } from 'next-seo';
// import { useState, useEffect } from 'react';

// import { useAuth } from '../../../customHooks/useAuth';
// import type { AuthContextType } from '~/customHooks/interfaces';
import { Logo } from '../../components/daftar/Logo';
import { OAuthButtonGroup } from '../../components/daftar/OAuthButtonGroup';
import { PasswordField } from '~/lib/components/masuk/PasswordField';
// import * as fbq from '~/utils/fpixel';

const Daftar = () => (
  <Container
    maxW="lg"
    py={{ base: '12', md: '24' }}
    px={{ base: '0', sm: '8' }}
  >
    <Stack spacing="8">
      <Stack spacing="6">
        <Logo />
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: 'xs', md: 'sm' }}>Daftar Akun</Heading>
          <Text>Daftar akun Anda sekarang!</Text>
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
            <FormControl isRequired>
              <FormLabel htmlFor="nama">Nama</FormLabel>
              <Input id="nama" type="text" placeholder="Nama Lengkap" />
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
              backgroundColor="#6528F7"
              color="#EDE4FF"
              _hover={{ bg: '#BAA1F6' }}
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
            <Button>
              <OAuthButtonGroup /> Daftar dengan Google
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>
);

export default Daftar;
