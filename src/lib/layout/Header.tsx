import { Box, Flex } from '@chakra-ui/react';

import HeaderButton from '../components/HeaderButton';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Box>BagiBuku.id</Box>
      <Box marginLeft="auto">
        <Flex justifyContent="space-between">
          <HeaderButton />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
