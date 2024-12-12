"use client";

import { useState } from "react";
import { Fieldset, HStack, Input, Textarea } from "@chakra-ui/react";
// import {
//   RadioCardItem,
//   RadioCardLabel,
//   RadioCardRoot,
// } from "@/components/ui/radio-card"
import { PlacesAutocomplete } from "@/app/components/PlacesAutocomplete";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";

import { useRouter } from "next/navigation";

const CreatePost = () => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [selected, setSelected] = useState(null);

  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const [value, setValue] = useState("");

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
          category: parseInt(value),
        }),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Fieldset.Root width="md" margin={5}>
        <Fieldset.Legend>Create Post</Fieldset.Legend>
        <Field label="タイトル">
          <Input
            placeholder="タイトルを入力"
            value={title}
            onChange={onChangeTitle}
          />
        </Field>

        <Field label="内容">
          <Textarea
            placeholder="内容を入力"
            value={content}
            onChange={onChangeContent}
            resize="none"
          />
        </Field>

        <Field label="住所">
          <PlacesAutocomplete
            setSelected={setSelected}
            setAddress={setAddress}
            setLat={setLat}
            setLng={setLng}
          />
        </Field>

        <Field label="種類">
          <RadioCardRoot value={value} onValueChange={(e) => setValue(e.value)}>
            <HStack align="stretch">
              {items.map((item) => (
                <RadioCardItem
                  label={item.title}
                  key={item.value}
                  value={item.value}
                />
              ))}
            </HStack>
          </RadioCardRoot>
        </Field>

        <Button
          w="100px"
          colorPalette="teal"
          marginTop={4}
          onClick={() => onSubmit(title, content)}
        >
          Submit
        </Button>
      </Fieldset.Root>
    </>
  );
};

export default CreatePost;
