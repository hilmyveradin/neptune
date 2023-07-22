'use client';

import { Box, Center, Spinner, Flex } from '@chakra-ui/react';

import type { BooksDataTypes } from '~/customHooks/types';
import useReceiveBooks from '~/customHooks/useRecieveBooks';
import CardComponent from '~/lib/components/CardComponent';

const RequestBookPage = () => {
  const { receiveBooks, loading: userReceiveBooksLoading } = useReceiveBooks();

  if (userReceiveBooksLoading) {
    return (
      <Center h="100%">
        <Spinner size="xl" speed="1s" />
      </Center>
    );
  }

  return (
    <Box bg="green.500" width="100%" height="100%">
      <Flex wrap="wrap" justifyContent="flex-start" alignItems="start" p={4}>
        {receiveBooks.map((book: BooksDataTypes, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={`Card${index}`} margin={4}>
            <CardComponent
              title={book.title}
              description={book.description}
              image={book.image}
              contact={book.contact}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default RequestBookPage;
