import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const CreatePost = () => {
  // async function onSbmit(params:type) {

  // }

  return (
    <>
      <FormControl width="md" margin={5}>
        <FormLabel>Title</FormLabel>
        <Input placeholder="input title" />
        <FormLabel>Content</FormLabel>
        <Textarea placeholder="input content" resize="none" />
        <Button colorScheme="teal" marginTop={4}>
          Submit
        </Button>
      </FormControl>
    </>
  );
};

export default CreatePost;
