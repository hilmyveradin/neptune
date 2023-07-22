'use client';

import {
  Flex,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Avatar,
  Divider,
  Text,
  Box,
  Center,
  Spinner,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import type { AuthContextType } from '~/customHooks/interfaces';
import type { BooksDataTypes } from '~/customHooks/types';
import { useAuth } from '~/customHooks/useAuth';
import useDashboardBooks from '~/customHooks/useDashboardBooks';
import AddBookDonationForm from '~/lib/components/AddBookDonationForm';
import AddBookRequestForm from '~/lib/components/addBookRequestForm';
import AddCardButtonComponent from '~/lib/components/AddCardButtonComponent';
import CardComponent from '~/lib/components/CardComponent';

const DashboardBookPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth() as AuthContextType;
  const { loading, donateBooks, receiveBooks } = useDashboardBooks(
    user?.uid ?? '1'
  );
  const {
    isOpen: isAddDonationOpen,
    onOpen: onAddDonationOpen,
    onClose: onCloseAddDonation,
  } = useDisclosure();
  const {
    isOpen: isAddRequestOpen,
    onOpen: onAddRequestOpen,
    onClose: onCloseAddRequest,
  } = useDisclosure();
  const addDonationClick = () => {
    onAddDonationOpen();
  };

  const addRequestClick = () => {
    onAddRequestOpen();
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!isLoading && user === null) {
      router.push('/');
    }
  }, [isLoading, user]);

  if (loading) {
    return (
      <Center h="100%">
        <Spinner size="xl" speed="1s" />
      </Center>
    );
  }

  return user !== null ? (
    <Flex
      bg="white"
      width="100%"
      height="100%"
      alignItems="center"
      flexDirection="column"
      mt={isMobile ? '10px' : ''}
    >
      <VStack spacing="20px" width="90%">
        <Avatar name={user.displayName ?? ''} size="2xl" />
        <Text fontSize="2xl" fontWeight="bold">
          {user.displayName}
        </Text>
        <VStack width="100%" align="start">
          <Text fontSize="lg" fontWeight="semibold">
            Donasi Buku Saya
          </Text>
          <HStack flexDirection="row" flexWrap="wrap" spacing="8px">
            {donateBooks.map((book: BooksDataTypes, index) => (
              <CardComponent
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                title={book.title}
                description={book.description}
                image={book.image}
                contact={book.contact}
                userID=""
              />
            ))}
            <Box onClick={addDonationClick}>
              <AddCardButtonComponent textString="Tambah Donasi Buku" />
            </Box>
          </HStack>
        </VStack>
        <Divider
          w="full"
          borderWidth="1px"
          borderColor="black"
          borderRadius="5px"
        />
        <VStack width="100%" align="start">
          <Text fontSize="lg" fontWeight="semibold">
            Permintaan Buku Saya
          </Text>
          <HStack flexDirection="row" flexWrap="wrap" spacing="8px">
            {receiveBooks.map((book: BooksDataTypes, index) => (
              <CardComponent
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                title={book.title}
                description={book.description}
                image={book.image}
                contact={book.contact}
                userID=""
              />
            ))}
            <Box onClick={addRequestClick}>
              <AddCardButtonComponent textString="Tambah Permintaan Buku" />
            </Box>
          </HStack>
        </VStack>
      </VStack>
      <Modal
        isOpen={isAddDonationOpen}
        onClose={onCloseAddDonation}
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <AddBookDonationForm
              onClose={onCloseAddDonation}
              userID={user.uid}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isAddRequestOpen}
        onClose={onCloseAddRequest}
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <AddBookRequestForm onClose={onCloseAddRequest} userID={user.uid} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  ) : (
    <h1> user not found! </h1>
  );
};

export default DashboardBookPage;
