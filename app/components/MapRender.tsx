"use client";

import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer, Marker } from "@googlemaps/markerclusterer";
import {
  Flex,
  Box,
  Heading,
  Text,
  Separator,
  Spinner,
  VStack,
  IconBUtton,
  IconButton,
  CheckboxGroup,
  Grid,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MapData } from "../types/type";
import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import Image from "next/image";
import { items } from "../data/itemsData";
import { PlacesAutocomplete } from "./PlacesAutocomplete";

import { SettingsIcon } from "@chakra-ui/icons";

import { CheckboxCard } from "@/components/ui/checkbox-card";

interface MAPALLDataProps {
  mapAllData: MapData[];
}

export const MapRender = ({ mapAllData }: MAPALLDataProps) => {
  // 緯度、経度を管理 (初期値は東京)
  const [lat, setLat] = useState<number | null>(35.689);
  const [lng, setLng] = useState<number | null>(139.692);

  // ピンのホバーアクション
  // const [hoverId, setHoverId] = useState<number | null>(null);
  // const onMouseEnter = useCallback((id: number | null) => setHoverId(id), []);
  // const onMouseLeave = useCallback(() => setHoverId(null), []);

  // const hoverIdRef = useRef<number | null>(null);

  // const onMouseEnter = useCallback((id: number | null) => {
  //   if (hoverIdRef.current !== id) {
  //     hoverIdRef.current = id;
  //     setHoverId(id);
  //   }
  // }, []);

  // const onMouseLeave = useCallback(() => {
  //   if (hoverIdRef.current !== null) {
  //     hoverIdRef.current = null;
  //     setHoverId(null);
  //   }
  // }, []);

  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const selectedPinData = mapAllData.find(
    (mapData) => mapData.id === selectedPin
  );

  const selectedPinItem = items.find(
    (item) => parseInt(item.value) === selectedPinData?.category
  );

  // clusterer処理
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: number]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: number) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const imageStyle = {
    borderRadius: "100%",
  };

  // Google Maps API の準備が整うタイミングまで遅延する
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // lat, lng が更新されたらマップを移動させる
  useEffect(() => {
    if (map && lat !== null && lng !== null) {
      map.panTo({ lat, lng });
      map.setZoom(10);
    }
  }, [lat, lng, map]);

  return (
    <Flex flex="1" width="100%" height="100%">
      {!loading ? (
        <>
          {/* 検索欄からマップの場所を移動する */}
          <Box
            position="absolute"
            top="100px"
            left="50%"
            transform="translateX(-50%)"
            zIndex={10}
            width="90%"
            maxWidth="600px"
          >
            <PlacesAutocomplete
              setSelected={() => {}}
              setAddress={() => {}}
              setLat={setLat}
              setLng={setLng}
            />
          </Box>
          {/* 歯車Drawerボタン */}
          <DrawerRoot size="md">
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <Box
                position="absolute"
                top="150px" // 画面の上から20pxに配置
                right="30px" // 画面の右から20pxに配置
                zIndex={10} // 他の要素よりも前面に表示
              >
                <IconButton
                  aria-label="Settings"
                  variant="solid"
                  size="xl" // ボタンサイズ
                  colorPalette="teal" // カラースキーム
                  onClick={() => {}} // ボタンのクリックイベント
                >
                  <SettingsIcon />
                </IconButton>
              </Box>
            </DrawerTrigger>
            <DrawerContent bg="cyan.100" color="gray.800">
              <DrawerHeader>
                <DrawerTitle fontSize="2xl" fontWeight="bold">
                  検索
                </DrawerTitle>
              </DrawerHeader>
              <DrawerBody bg="white" borderRadius="md" margin={3}>
                <CheckboxGroup>
                  <Text textStyle="lg" padding={3}>
                    表示するカテゴリーを選択
                  </Text>
                  <Grid templateColumns="repeat(3, 1fr)" gap="3">
                    {items.map((item) => (
                      <CheckboxCard
                        label={item.title}
                        key={item.value}
                        icon={
                          <Image
                            src={item.iconPath}
                            alt={item.title}
                            width={45}
                            height={45}
                          />
                        }
                        bg="gray.50"
                        colorPalette="cyan"
                      />
                    ))}
                  </Grid>
                </CheckboxGroup>
              </DrawerBody>
              <DrawerFooter>
                <DrawerActionTrigger asChild>
                  {/* <Button variant="outline">Cancel</Button> */}
                  <Button
                    bg="gray.50"
                    color="gray.700"
                    variant="outline"
                    _hover={{ bg: "gray.300", color: "black" }}
                    borderRadius="md"
                  >
                    キャンセル
                  </Button>
                </DrawerActionTrigger>
                <Button size={"md"} colorPalette="teal" borderRadius="md">
                  検索
                </Button>
              </DrawerFooter>
              {/* <DrawerCloseTrigger /> */}
              <DrawerCloseTrigger
                position="absolute"
                top="4"
                right="4"
                bg="cyan.100"
                color="gray.700"
                _hover={{ bg: "gray.300", color: "black" }}
                borderRadius="full"
                p="2"
              />
            </DrawerContent>
          </DrawerRoot>

          <Map defaultZoom={10} mapId={"64d154fcc4cf1d4e"}>
            {mapAllData.map((mapData) => (
              <AdvancedMarker
                position={{
                  lat:
                    typeof mapData.lat === "string"
                      ? parseFloat(mapData.lat)
                      : mapData.lat,
                  lng:
                    typeof mapData.lng === "string"
                      ? parseFloat(mapData.lng)
                      : mapData.lng,
                }}
                key={mapData.id}
                onClick={() => setSelectedPin(mapData.id)}
                ref={(marker) => setMarkerRef(marker, mapData.id)}
                // onMouseEnter={() => onMouseEnter(mapData.id)}
                // onMouseLeave={onMouseLeave}
              >
                {/* {items.map(
                  (item) =>
                    parseInt(item.value) === mapData.category && (
                      <Pin
                        background={item.colorCode}
                        borderColor={"#696969"}
                        scale={2}
                        key={mapData.id}
                      >
                        <Flex
                          bg={"#f5f5f5"}
                          width={45}
                          height={45}
                          borderRadius="full"
                        >
                          <Image
                            src={item.iconPath}
                            alt={item.title}
                            width={45}
                            height={45}
                            style={imageStyle}
                          />
                        </Flex>
                      </Pin>
                    )
                )} */}
                {items.map(
                  (item) =>
                    parseInt(item.value) === mapData.category && (
                      <Pin
                        background={item.colorCode}
                        borderColor={"#696969"}
                        scale={2}
                        // scale={hoverId === mapData.id ? 2.5 : 2} // ホバー時にスケールを増加
                        key={mapData.id}
                      >
                        <Flex
                          bg={"#f5f5f5"}
                          width={45}
                          height={45}
                          borderRadius="full"
                        >
                          <Image
                            src={item.iconPath}
                            alt={item.title}
                            width={45}
                            height={45}
                            style={imageStyle}
                            // style={{
                            //   ...imageStyle,
                            //   transform:
                            //     hoverId === mapData.id
                            //       ? "scale(1.1)"
                            //       : "scale(1)", // ホバー時に画像も拡大
                            //   transition: "transform 0.2s ease-in-out", // スムーズな拡大縮小
                            // }}
                          />
                        </Flex>
                      </Pin>
                    )
                )}
              </AdvancedMarker>
            ))}
            {selectedPinData && (
              // <InfoWindow
              //   position={{
              //     lat:
              //       typeof selectedPinData.lat === "string"
              //         ? parseFloat(selectedPinData.lat)
              //         : selectedPinData.lat,
              //     lng:
              //       typeof selectedPinData.lng === "string"
              //         ? parseFloat(selectedPinData.lng)
              //         : selectedPinData.lng,
              //   }}
              //   onCloseClick={() => setSelectedPin(null)}
              // >
              //   <Box
              //     width="600px"
              //     height="250px"
              //     padding="4"
              //     bg="gray.100"
              //     // boxShadow="md"
              //     borderRadius="lg"
              //     border="1px solid"
              //     borderColor={selectedPinItem?.colorCode}
              //   >
              //     {selectedPinItem && (
              //       <Image
              //         src={selectedPinItem.iconPath}
              //         alt={selectedPinItem.title}
              //         width={45}
              //         height={45}
              //         // style={imageStyle}
              //       />
              //     )}
              //     <Heading
              //       as="h3"
              //       size="xl"
              //       mb="2"
              //       color={selectedPinItem?.colorCode}
              //     >
              //       {selectedPinData.title}
              //     </Heading>
              //     <Text color="blue.400" fontSize="sm">{`${format(
              //       new Date(selectedPinData.createdAt),
              //       "yyyy/MM/dd"
              //     )} - ${selectedPinData.address}`}</Text>
              //     <Separator borderColor="gray.500" />
              //     <Text fontSize="lg" color="gray.700" marginTop={4}>
              //       {selectedPinData.content}
              //     </Text>
              //   </Box>
              // </InfoWindow>
              <InfoWindow
                position={{
                  lat:
                    typeof selectedPinData.lat === "string"
                      ? parseFloat(selectedPinData.lat)
                      : selectedPinData.lat,
                  lng:
                    typeof selectedPinData.lng === "string"
                      ? parseFloat(selectedPinData.lng)
                      : selectedPinData.lng,
                }}
                onCloseClick={() => setSelectedPin(null)}
              >
                <Box
                  width="600px"
                  padding="4"
                  bg="white"
                  // boxShadow="lg"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={selectedPinItem?.colorCode}
                >
                  {/* 上部のアイコンとタイトル */}
                  <Flex align="center" marginBottom="4">
                    {selectedPinItem && (
                      <Image
                        src={selectedPinItem.iconPath}
                        alt={selectedPinItem.title}
                        width={50}
                        height={50}
                        style={{ borderRadius: "50%", marginRight: "12px" }}
                      />
                    )}
                    <Heading
                      as="h3"
                      size="xl"
                      color={selectedPinItem?.colorCode}
                      maxWidth="500px" /* タイトル幅を制限 */
                      whiteSpace="normal" /* 折り返しを許可 */
                      wordWrap="break-word" /* 単語単位で折り返す */
                      textOverflow="ellipsis" /* 省略記号を表示 */
                    >
                      {selectedPinData.title}
                    </Heading>
                  </Flex>

                  {/* 住所と日付 */}
                  <Text color="gray.600" fontSize="sm" marginBottom="2">
                    {`${format(
                      new Date(selectedPinData.createdAt),
                      "yyyy/MM/dd"
                    )} - ${selectedPinData.address}`}
                  </Text>

                  <Separator borderColor="gray.300" marginBottom="4" />

                  {/* 内容部分 */}
                  <Text fontSize="md" color="gray.800" marginBottom="4">
                    {selectedPinData.content}
                  </Text>

                  {/* 下部のアクションや追加情報（必要ならここに追加） */}
                  <Flex justify="space-between" align="center">
                    <Text fontSize="sm" color="gray.500">
                      カテゴリ: {selectedPinItem?.title || "不明"}
                    </Text>
                    {/* <Text fontSize="sm" color="blue.400" cursor="pointer">
                  詳細を見る
                </Text> */}
                  </Flex>
                </Box>
              </InfoWindow>
            )}
          </Map>
        </>
      ) : (
        // ロード画面
        <Flex
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          bg="gray.100"
          zIndex={10}
        >
          <Spinner color="gray.600" size="xl" />
          <Text mt={4} fontSize="lg" color="gray.600">
            Loading Google Maps...
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
