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
  useBreakpointValue,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { AuthContextType } from '~/customHooks/interfaces';
import type { BooksDataTypes } from '~/customHooks/types';
import { useAuth } from '~/customHooks/useAuth';
import useReceiveBooks from '~/customHooks/useRecieveBooks';
import CardComponent from '~/lib/components/CardComponent';
import CardPreviewComponent from '~/lib/components/CardPreviewComponent';

const RequestBookPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth() as AuthContextType;
  const { receiveBooks, loading: userReceiveBooksLoading } = useReceiveBooks(
    user?.uid ?? '1'
  );
  const [selectedBookData, setSelectedBookData] =
    useState<BooksDataTypes | null>(null);

  const {
    isOpen: isCardPreviewOpened,
    onOpen: onCardPreviewOpened,
    onClose: onCloseCardPreview,
  } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!isLoading && user === null) {
      router.push('/');
    }
  }, [isLoading, user]);

  if (userReceiveBooksLoading || isLoading) {
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
    <>
      <Text
        fontSize="2xl"
        textAlign="center"
        fontWeight="bold"
        mt={isMobile ? '10px' : ''}
      >
        Daftar Permintaan Buku
      </Text>
      <Box width="100%" height="100%" mt={isMobile ? '10px' : ''}>
        <Flex wrap="wrap" justifyContent="flex-start" alignItems="start" p={4}>
          {receiveBooks.map((book: BooksDataTypes, index: number) => (
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
                userID=""
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
    </>
  );
};

export default RequestBookPage;
