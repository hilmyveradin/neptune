import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import SideBar from '../components/SideBar';

type LayoutProps = {
  children?: ReactNode;
  withoutNavbar: boolean;
  currentSegment: string;
};

const AppContainer = ({
  children,
  withoutNavbar,
  currentSegment,
}: LayoutProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex minHeight="100vh">
      {!withoutNavbar && <SideBar currentSegment={currentSegment} />}
      <Box
        as="main"
        marginLeft={!withoutNavbar && !isMobile ? '250px' : '0'}
        marginTop={!withoutNavbar && isMobile ? '50px' : '0'}
        padding={4}
        width="full"
        minHeight="100vh"
        dropShadow="sm"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default AppContainer;
