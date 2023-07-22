import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  brand: {
    100: '',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  primary: {
    500: '#6528F7',
    400: '#A076F9',
    300: '#D7BBF5',
    200: '#EDE4FF',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
