"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Input, Stack, Textarea, Grid } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";

import { PlacesAutocomplete } from "./PlacesAutocomplete";
import { items } from "../data/itemsData";

export const CreatePostDialog = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false); // ダイアログの開閉状態を管理

  // 投稿内容を管理
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");

  // 緯度、経度を管理
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  // 投稿内容の入力の処理
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  async function onSubmit(title: string, content: string) {
    // 入力が欠けていたら処理しない
    if (title === "" || content === "" || selected === null || value === "")
      return;

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

      // 投稿を白紙に戻す
      setTitle("");
      setContent("");
      setAddress("");
      setSelected(null);
      setValue("");

      setIsOpen(false); // ダイアログを閉じる
      router.refresh(); // 投稿を反映
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DialogRoot
      size="xl"
      placement="center"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <DialogTrigger asChild>
        <Button colorPalette="gray" size="sm" onClick={() => setIsOpen(true)}>
          Create Post
        </Button>
      </DialogTrigger>

      <DialogContent bg="white" color="gray.800" borderRadius="lg">
        <DialogHeader>
          <DialogTitle fontSize="2xl" fontWeight="bold">
            投稿を作成
          </DialogTitle>
        </DialogHeader>
        <DialogBody pb="6">
          <Stack gap="4">
            <Field label="タイトル">
              <Input
                placeholder="タイトルを入力"
                value={title}
                onChange={onChangeTitle}
                borderRadius="md"
                bg="gray.50"
              />
            </Field>
            <Field label="内容">
              <Textarea
                placeholder="内容を入力"
                value={content}
                onChange={onChangeContent}
                resize="none"
                borderRadius="md"
                bg="gray.50"
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
            <Field label="カテゴリー">
              <RadioCardRoot
                value={value}
                orientation="vertical"
                align="center"
                onValueChange={(e) => setValue(e.value)}
                padding={2}
              >
                <Grid templateColumns="repeat(6, 1fr)" gap="5">
                  {items.map((item) => (
                    <RadioCardItem
                      label={item.title}
                      icon={
                        <Image
                          src={item.iconPath}
                          alt={item.title}
                          width={45}
                          height={45}
                        />
                      }
                      key={item.value}
                      value={item.value}
                      colorPalette="teal"
                      bg={"gray.50"}
                    />
                  ))}
                </Grid>
              </RadioCardRoot>
            </Field>
          </Stack>
        </DialogBody>

        <DialogFooter margin={2}>
          <DialogActionTrigger asChild>
            <Button
              color="gray.700"
              variant="outline"
              _hover={{ bg: "gray.300", color: "black" }}
              borderRadius="md"
              onClick={() => {
                setTitle("");
                setContent("");
                setValue("");
              }}
            >
              キャンセル
            </Button>
          </DialogActionTrigger>
          <Button
            size={"md"}
            colorPalette="teal"
            onClick={() => onSubmit(title, content)}
            borderRadius="md"
          >
            投稿
          </Button>
        </DialogFooter>

        <DialogCloseTrigger
          position="absolute"
          top="4"
          right="4"
          bg="gray.200"
          color="gray.700"
          _hover={{ bg: "gray.300", color: "black" }}
          borderRadius="full"
          p="2"
          onClick={() => {
            setTitle("");
            setContent("");
            setValue("");
          }}
        />
      </DialogContent>
    </DialogRoot>
  );
};
