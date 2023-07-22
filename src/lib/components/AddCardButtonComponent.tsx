import { VStack, Box, AspectRatio, Button, Icon, Text } from '@chakra-ui/react';
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
      boxShadow="md"
      borderRadius="md"
      padding="4"
      alignItems="center"
      outline="1"
      spacing={0}
      borderWidth="1px"
    >
      <Box width="100%" height="100%">
        {/* <VStack> */}
        <AspectRatio ratio={3 / 4}>
          {/* <Center> */}
          <VStack>
            <Button
              size="lg"
              variant="outline"
              bgColor="primary.300"
              width="100px"
              height="100px"
              borderRadius={50}
              borderWidth="1px"
            >
              <Icon as={AiOutlinePlus} boxSize={8} opacity={0.5} />
            </Button>
            <Text pt={2}> {textString} </Text>
          </VStack>
          {/* </Center> */}
        </AspectRatio>

        {/* </VStack> */}
      </Box>
    </VStack>
  );
};

export default AddCardButtonComponent;
