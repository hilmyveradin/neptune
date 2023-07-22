'use client';

import {
  Box,
  Button,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import AddBookDonationForm from '~/lib/components/AddBookDonationForm';
import AddBookRequestForm from '~/lib/components/addBookRequestForm';

const DashboardBookPage = () => {
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

  return (
    <Box bg="yellow.500" width="100%" height="100%">
      <VStack>
        <Button onClick={addDonationClick}> Add donation </Button>
        <Button onClick={addRequestClick}> Add request </Button>
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
            <AddBookDonationForm onClose={onCloseAddDonation} />
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
            <AddBookRequestForm onClose={onCloseAddRequest} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DashboardBookPage;
