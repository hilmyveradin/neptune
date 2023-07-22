'use client';

import { Button, ButtonGroup, HStack } from '@chakra-ui/react';

import { useAuth } from '../../customHooks/useAuth';
import type { AuthContextType } from '~/customHooks/interfaces';

import { GoogleIcon } from './ProviderIcons';

const providers = [{ name: 'Google', icon: <GoogleIcon boxSize="5" /> }];

type Action = 'sign-in' | 'sign-up';

interface OAuthButtonGroupProps {
  action: Action;
  onSuccess?: () => void;
}

export const OAuthButtonGroup = ({
  action,
  onSuccess,
}: OAuthButtonGroupProps) => {
  const { signInWithGoogle } = useAuth() as AuthContextType;

  const handleGoogleAuth = async () => {
    await signInWithGoogle();
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
      {providers.map(({ name, icon }) => (
        <Button key={name} width="full" onClick={handleGoogleAuth}>
          <HStack spacing="2">
            {icon}
            <span>
              {action === 'sign-in' ? 'Masuk dengan' : 'Daftar dengan'} {name}
            </span>
          </HStack>
        </Button>
      ))}
    </ButtonGroup>
  );
};
