import { Box, Flex, Spacer, Image } from '@chakra-ui/react';
import Link from 'next/link';

import HeaderButton from '../components/HeaderButton';

const Header = () => {
  return (
    <Box
      background="white"
      as="header"
      width="full"
      margin="0 auto"
      shadow="xl"
      position="sticky"
      display="flex"
      justifyContent="center"
      top={0}
      zIndex={999}
    >
      <Flex
        paddingX={4}
        paddingY={5}
        width="full"
        maxWidth={1100}
        alignItems="center"
      >
        <Link href="/" passHref>
          <Box w="100%">
            <Flex
              align="center"
              w="100%"
              fontWeight="semibold"
              justifyContent="center"
            >
              <Image src="/UC logo.svg" maxW="22px" mr="1" />
              BagiBuku.id
            </Flex>
          </Box>
        </Link>
        <Spacer />
        <Flex justifyContent="space-between" alignItems="center">
          {/* <ThemeToggle /> */}
          <HeaderButton />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
