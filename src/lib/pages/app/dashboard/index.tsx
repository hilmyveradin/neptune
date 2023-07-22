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
} from '@chakra-ui/react';

import type { BooksDataTypes } from '~/customHooks/types';
import useDashboardBooks from '~/customHooks/useDashboardBooks';
import AddBookDonationForm from '~/lib/components/AddBookDonationForm';
import AddBookRequestForm from '~/lib/components/addBookRequestForm';
import AddCardButtonComponent from '~/lib/components/AddCardButtonComponent';
import CardComponent from '~/lib/components/CardComponent';

const DashboardBookPage = () => {
  const userID = '1';
  const { loading, donateBooks, receiveBooks } = useDashboardBooks(userID);
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

  const name = 'foobar foo';

  if (loading) {
    return (
      <Center h="100%">
        <Spinner size="xl" speed="1s" />
      </Center>
    );
  }

  return (
    <Flex
      bg="white"
      width="100%"
      height="100%"
      alignItems="center"
      flexDirection="column"
    >
      <VStack spacing="20px" width="90%">
        <Avatar name={name} size="2xl" />
        <Text fontSize="2xl" fontWeight="bold">
          {name}
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
            {receiveBooks.map((book: BooksDataTypes) => (
              <CardComponent
                title={book.title}
                description={book.description}
                image={book.image}
                contact={book.contact}
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
            <AddBookDonationForm onClose={onCloseAddDonation} userID={userID} />
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
            <AddBookRequestForm onClose={onCloseAddRequest} userID={userID} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default DashboardBookPage;
