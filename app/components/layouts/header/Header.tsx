"use client";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Link as ChakraLink,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        as="nav"
        bg="cyan.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex align="center" as="div" mr={8} _hover={{ cursor: "pointer" }}>
          <NextLink href="/">
            <Heading as="h1" fontSize={{ base: "md", md: "xl" }}>
              PROPERTY VALUATION APP
            </Heading>
          </NextLink>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <ChakraLink href="/">Home</ChakraLink>
          </Box>
          <Box pr={4}>
            <ChakraLink href="/about">About</ChakraLink>
          </Box>
          <NextLink href="map-posts/create">
            <Button colorPalette="gray" size="sm">
              Create Post
            </Button>
          </NextLink>
        </Flex>
        {/* <IconButton
          aria-label="メニューボタン"
          icon={<HamburgerIcon />}
          size="sm"
          variant="unstyled"
          display={{ base: "block", md: "none" }}
          onClick={onOpen}
        /> */}
      </Flex>
      {/* <Flex>
        <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerBody p={0} bg="gray.100">
                <Button w="100%">TOP</Button>
                <Button w="100%">HOME</Button>
                <Button w="100%">ABOUT</Button>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Flex> */}
    </>
  );
};
