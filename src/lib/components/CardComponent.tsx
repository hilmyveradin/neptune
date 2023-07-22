import { VStack, Text, Box, AspectRatio, Center } from '@chakra-ui/react';
import Image from 'next/image';

import type { BooksDataTypes } from '~/customHooks/types';

const CardComponent = ({ title, description, image }: BooksDataTypes) => {
  return (
    <VStack
      width="300px"
      height="400px"
      spacing={3}
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      padding="4"
      alignItems="center"
      outline="1"
    >
      <Box width="150px" height="200px">
        {' '}
        {/* Use AspectRatio component */}
        <AspectRatio ratio={3 / 4}>
          <Center>
            <Image
              src={image === '-9' ? '/404 Error-pana.svg' : image}
              alt={title}
              width={150}
              height={200}
            />
          </Center>
        </AspectRatio>
      </Box>
      <Text
        fontWeight="bold"
        fontSize="xl"
        textAlign="center"
        noOfLines={2}
        maxWidth={280}
      >
        {title}
      </Text>
      <Box maxW="280px" className="truncate-text">
        <Text noOfLines={3}>{description}</Text>
      </Box>
    </VStack>
  );
};

export default CardComponent;
