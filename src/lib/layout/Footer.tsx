import { Box, Flex } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box>© 2023 BagiBuku.id. All rights reserved</Box>
    </Flex>
  );
};

export default Footer;
