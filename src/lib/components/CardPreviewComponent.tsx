import {
  VStack,
  Box,
  Text,
  AspectRatio,
  Center,
  Button,
  Divider,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

import type { BooksDataTypes } from '~/customHooks/types';

interface CardPreviewComponentProps {
  data: BooksDataTypes;
}

const CardPreviewComponent = ({ data }: CardPreviewComponentProps) => {
  const { title, description, image, contact } = data;
  return (
    <VStack alignItems="center" p="0 10px 10px 10px">
      <VStack alignItems="center" w="full" spacing={4}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          noOfLines={2}
          maxWidth="80%"
        >
          {title}
        </Text>
        {image !== '-9' && (
          <Box width="150px" height="200px">
            <AspectRatio ratio={3 / 4}>
              <Center>
                <Image src={image} alt={title} width={150} height={200} />
              </Center>
            </AspectRatio>
          </Box>
        )}
        <Text>{description}</Text>
        <Divider pt="6" />
        <Text textAlign="center"> Tertarik? </Text>
        <a href={contact}>
          <Button
            display="flex"
            alignItems="center"
            justifyContent="center"
            leftIcon={<FaWhatsapp />}
          >
            Hubungi melalui Whatsapp
          </Button>
        </a>
      </VStack>
    </VStack>
  );
};

export default CardPreviewComponent;
