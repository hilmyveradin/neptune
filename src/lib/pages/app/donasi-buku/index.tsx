'use client';

import {
  Box,
  Center,
  Spinner,
  Flex,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

import type { BooksDataTypes } from '~/customHooks/types';
import useDonateBooks from '~/customHooks/useDonateBooks';
import CardComponent from '~/lib/components/CardComponent';
import CardPreviewComponent from '~/lib/components/CardPreviewComponent';

const RequestBookPage = () => {
  const { donateBooks, loading: userReceiveBooksLoading } = useDonateBooks();
  const [selectedBookData, setSelectedBookData] =
    useState<BooksDataTypes | null>(null);

  const {
    isOpen: isCardPreviewOpened,
    onOpen: onCardPreviewOpened,
    onClose: onCloseCardPreview,
  } = useDisclosure();

  if (userReceiveBooksLoading) {
    return (
      <Center h="100%">
        <Spinner size="xl" speed="1s" />
      </Center>
    );
  }

  const onDataOpened = (data: BooksDataTypes) => {
    setSelectedBookData(data);
    onCardPreviewOpened();
  };

  return (
    <Box bg="green.500" width="100%" height="100%">
      <Flex wrap="wrap" justifyContent="flex-start" alignItems="start" p={4}>
        {donateBooks.map((book: BooksDataTypes, index: number) => (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={`Card${index}`}
            margin={4}
            onClick={() => onDataOpened(book)}
          >
            <CardComponent
              title={book.title}
              description={book.description}
              image={book.image}
              contact={book.contact}
            />
          </Box>
        ))}
      </Flex>
      <Modal
        isOpen={isCardPreviewOpened}
        onClose={onCloseCardPreview}
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            {selectedBookData !== null && (
              <CardPreviewComponent data={selectedBookData} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RequestBookPage;
