/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import {
  VStack,
  Text,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
  FormHelperText,
  Flex,
  Textarea,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import type { FieldInputProps, FormikProps } from 'formik';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

import { firestore, firebaseStorage } from '../utils/firebaseClient';

interface AddBookDonationFormProps {
  onClose: () => void;
}

interface FormValues {
  title: string;
  description: string;
  image: string | null;
  contact: string;
}

const AddBookDonationForm: React.FC<AddBookDonationFormProps> = ({
  onClose,
}) => {
  const [alertMessage, setAlertMessage] = useState('');
  const { isOpen, onOpen } = useDisclosure();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const cancelRef = React.useRef(null);
  const [imageTextData, setImageTextData] = useState('');

  const handleFileUpload = async (file: File) => {
    setIsButtonDisabled(true);
    try {
      const storageRef = firebaseStorage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);

      const downloadURL = await fileRef.getDownloadURL();

      console.log('Download URL:', downloadURL);
      setImageTextData(downloadURL);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setIsButtonDisabled(false);
  };

  const validateField = (value: string) => {
    let error;
    if (!value) {
      error = 'Tolong isi bagian ini';
    }
    return error;
  };

  return (
    <VStack alignItems="center" p="0 10px 10px 10px">
      <VStack alignItems="center" w="full">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Tambah Donasi Buku
        </Text>
        <Box w="100%">
          <Formik<FormValues>
            initialValues={{
              title: '',
              description: '',
              image: '',
              contact: '',
            }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              console.log('add book donation submit action');
              console.log(values);
              const { title, description, contact } = values;

              const modifiedValues: { [key: string]: string } = {
                title,
                description,
                contact,
              };

              modifiedValues.image =
                imageTextData !== '' ? imageTextData : '-9';

              try {
                firestore.collection('BookDonations').add(modifiedValues);
                setAlertMessage('Sukses! Donasi Kamu berhasil ditambahkan!');
                actions.resetForm();
              } catch (error) {
                console.error('Error adding document: ', error);
                setAlertMessage('Error! Mohon Coba beberapa saat lagi');
              } finally {
                onOpen();
                actions.setSubmitting(false);
              }
            }}

            //   try {
            //     console.log("abc");
            //     fetch('/api/submitDonation', {
            //       method: 'POST',
            //       headers: {
            //         'Content-Type': 'application/json',
            //       },
            //       body: JSON.stringify({ values }),
            //     });
            //     console.log("def");
            //     setAlertMessage('Sukses! Donasi Kamu berhasil ditambahkan!');
            //     actions.resetForm();
            //     actions.setSubmitting(false);
            //   } catch {
            //     setAlertMessage('Error! Mohon Coba beberapa saat lagi');
            //     actions.setSubmitting(false);
            //   } finally {
            //     onOpen();
            //     actions.setSubmitting(false);
            //   }
            // }}
          >
            {(props: FormikProps<FormValues>) => (
              <Form>
                <Field name="title" validate={validateField}>
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormValues>;
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.title && form.touched.title)}
                    >
                      <FormLabel
                        htmlFor="name"
                        fontWeight="medium"
                        fontSize="lg"
                      >
                        Judul Donasi
                      </FormLabel>
                      <FormHelperText mt="-6px" mb="4px">
                        {' '}
                        Masukkin judul donasi kamu disini. Bisa berupa judul
                        buku, tema, dan sebagainya.{' '}
                      </FormHelperText>
                      <Input
                        {...field}
                        id="title"
                        placeholder="Judul Donasi."
                        mb="12px"
                      />

                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description" validate={validateField}>
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormValues>;
                  }) => (
                    <FormControl
                      isInvalid={
                        !!(form.errors.description && form.touched.description)
                      }
                    >
                      <FormLabel
                        htmlFor="description"
                        fontWeight="medium"
                        fontSize="lg"
                      >
                        Cerita kamu
                      </FormLabel>
                      <FormHelperText mt="-6px" mb="4px">
                        {' '}
                        Ceritain cerita kamu disini. Kenapa kamu mau donasi
                        buku, tentang bukunya, dan sebagainya{' '}
                      </FormHelperText>

                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Ceritain cerita kamu disini."
                        mb="12px"
                      />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="image">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormValues>;
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.image && form.touched.image)}
                    >
                      <FormLabel
                        htmlFor="image"
                        fontWeight="medium"
                        fontSize="lg"
                      >
                        Gambar Pendukung (opsional){' '}
                      </FormLabel>
                      <FormHelperText mt="-6px" mb="4px">
                        {' '}
                        Unggah gambar pendukung cerita kamu!{' '}
                      </FormHelperText>
                      <Input
                        {...field}
                        id="image"
                        type="file"
                        pt="4px"
                        mb="12px"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            handleFileUpload(file);
                          }
                          field.onChange(event);
                        }}
                      />
                      <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="contact" validate={validateField}>
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormValues>;
                  }) => (
                    <FormControl
                      isInvalid={
                        !!(form.errors.contact && form.touched.contact)
                      }
                    >
                      <FormLabel
                        htmlFor="contact"
                        fontWeight="medium"
                        fontSize="lg"
                      >
                        Kontak Whatsapp
                      </FormLabel>
                      <FormHelperText mt="-6px" mb="4px">
                        {' '}
                        Masukin kontak whatsapp yang bisa dihubungi, diawali
                        dengan 62
                      </FormHelperText>
                      <Input
                        {...field}
                        id="contact"
                        placeholder="Contoh: 6282133118220"
                        mb="12px"
                      />
                      <FormErrorMessage>{form.errors.contact}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Flex justifyContent="flex-end">
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting || isButtonDisabled}
                    type="submit"
                    isDisabled={isButtonDisabled}
                  >
                    Submit
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </VStack>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{alertMessage}</AlertDialogHeader>
          <AlertDialogFooter>
            <Button colorScheme="teal" ml={3} onClick={onClose}>
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </VStack>
  );
};

export default AddBookDonationForm;
