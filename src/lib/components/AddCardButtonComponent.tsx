import {
  VStack,
  Box,
  AspectRatio,
  Center,
  Button,
  Icon,
  Text,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';

interface AddCardButtonComponentProps {
  textString: string;
}

const AddCardButtonComponent = ({
  textString,
}: AddCardButtonComponentProps) => {
  return (
    <VStack
      width="300px"
      height="400px"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      padding="4"
      alignItems="center"
      outline="1"
      spacing={0}
    >
      <Box width="100%" height="100%">
        <AspectRatio ratio={3 / 4}>
          <Center>
            <Button size="lg" variant="outline" colorScheme="gray">
              <Icon as={AiOutlinePlus} boxSize={8} />
            </Button>
          </Center>
        </AspectRatio>
      </Box>
      <Text> {textString} </Text>
    </VStack>
  );
};

export default AddCardButtonComponent;
