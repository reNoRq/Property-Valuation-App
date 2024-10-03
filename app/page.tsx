"use client";

import { Flex } from "@chakra-ui/react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { useGetMapAllData } from "./hooks/useGetMapAllData";

export default function Home() {
  const position = { lat: 61.2176, lng: -149.8997 };

  const { mapAllData } = useGetMapAllData();

  return (
    <APIProvider apiKey="AIzaSyBN2E7WJ1Nm-u4-RxC4ZDPjEoVA0pRhh_A">
      <Flex flex="1">
        <Map zoom={9} center={position} />
      </Flex>
    </APIProvider>
  );
}
