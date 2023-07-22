import type { ButtonProps } from '@chakra-ui/react';
import { Button, Box, Spinner, Flex } from '@chakra-ui/react';
import Link from 'next/link';

import { useAuth } from '../../customHooks/useAuth';
import type { AuthContextType } from '~/customHooks/interfaces';

const HeaderButton: React.FC<
  ButtonProps & { leftIcon?: JSX.Element; label?: string }
> = () => {
  const { user, isLoading } = useAuth() as AuthContextType;

  const renderAuthenticatedMenu = () => (
    <Link href="/app/dashboard" passHref>
      <Button colorScheme="teal" rounded="xl" variant="outline">
        Dashboard
      </Button>
    </Link>
  );

  const renderUnauthenticatedButton = () => (
    <Link href="/daftar" passHref>
      <Button colorScheme="teal" rounded="full" px="7">
        Daftar
      </Button>
    </Link>
  );

  const renderButton = () => {
    if (isLoading) {
      return (
        <Flex
          alignItems="center"
          justifyContent="center"
          width="120px"
          height="36px"
        >
          <Spinner />
        </Flex>
      );
    }

    return user ? renderAuthenticatedMenu() : renderUnauthenticatedButton();
  };

  return <Box ml="5">{renderButton()}</Box>;
};

export default HeaderButton;
