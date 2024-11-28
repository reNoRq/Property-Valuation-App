import type { Metadata } from "next";
import localFont from "next/font/local";

import ChakuraProvider from "./chakraproviders";
import { Flex } from "@chakra-ui/react";

import { Header } from "./components/layouts/header/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Property Valuation App",
  description: "Property Valuation App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ChakuraProvider>
            <Flex direction="column" height="100vh">
              <Header />
              {children}
            </Flex>
          </ChakuraProvider>
      </body>
    </html>
  );
}
