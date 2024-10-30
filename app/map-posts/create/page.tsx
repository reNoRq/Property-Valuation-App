"use client";

import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
// import {
//   RadioCardItem,
//   RadioCardLabel,
//   RadioCardRoot,
// } from "@/components/ui/radio-card"
import { PlacesAutocomplete } from "@/app/components/PlacesAutocomplete";

import { useRouter } from "next/navigation";

const CreatePost = () => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [selected, setSelected] = useState(null);

  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  async function onSubmit(title: string, content: string) {
    if (title === "" || content === "" || selected === null) return;
    // setTitle("");
    // setContent("");
    try {
      await fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          address,
          lat,
          lng,
          category: 1,
        }),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <FormControl width="md" margin={5}>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="input title"
          value={title}
          onChange={onChangeTitle}
        />
        <br />
        <br />
        <FormLabel>Content</FormLabel>
        <Textarea
          placeholder="input content"
          value={content}
          onChange={onChangeContent}
          resize="none"
        />
        <br />
        <br />
        <FormLabel>Address</FormLabel>
        <PlacesAutocomplete
          setSelected={setSelected}
          setAddress={setAddress}
          setLat={setLat}
          setLng={setLng}
        />
        <br />
        <br />
        {/* <FormLabel>Select category</FormLabel>
        <RadioCardRoot>
          <RadioCardLabel />
          <RadioCardItem />
        </RadioCardRoot> */}
        <Button
          colorScheme="teal"
          marginTop={4}
          onClick={() => onSubmit(title, content)}
        >
          Submit
        </Button>
      </FormControl>
    </>
  );
};

export default CreatePost;
