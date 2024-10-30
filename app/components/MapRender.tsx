// // "use client";

// // import {
// //   AdvancedMarker,
// //   APIProvider,
// //   Map,
// //   Pin,
// // } from "@vis.gl/react-google-maps";
// // import { Flex } from "@chakra-ui/react";
// // import { MapData } from "../types/type";

// // interface MAPALLDataProps {
// //   mapAllData: MapData[];
// // }

// // export const MapRender = ({ mapAllData }: MAPALLDataProps) => {
// //   const position = { lat: 35.689, lng: 139.692 };

// //   return (
// //     <APIProvider
// //       apiKey="AIzaSyBN2E7WJ1Nm-u4-RxC4ZDPjEoVA0pRhh_A"
// //       libraries={["places"]}
// //     >
// //       <Flex flex="1">
// //         <Map
// //           defaultZoom={10}
// //           defaultCenter={position}
// //           mapId={"64d154fcc4cf1d4e"}
// //         >

// //             <AdvancedMarker
// //               position={{ lat: parseFloat(mapAllData[0].lat), lng: mapAllData[0].lng }}
// //             >
// //               <Pin />
// //             </AdvancedMarker>

// //           {/* {mapAllData.map((mapData) => (
// //             <AdvancedMarker
// //               position={{ lat: mapData.lat, lng: mapData.lng }}
// //               key={mapData.id}
// //             >
// //               <Pin
// //                 background={"blue"}
// //                 borderColor={"green"}
// //                 glyphColor={"green"}
// //               />
// //             </AdvancedMarker>
// //           ))} */}
// //           {/* <Markers mapAllData={mapAllData} /> */}
// //         </Map>
// //       </Flex>
// //     </APIProvider>
// //   );
// // };

// "use client";

// import {
//   AdvancedMarker,
//   APIProvider,
//   InfoWindow,
//   Map,
//   Pin,
// } from "@vis.gl/react-google-maps";
// import { Flex } from "@chakra-ui/react";
// import { MapData } from "../types/type";
// import { useState } from "react";

// interface MAPALLDataProps {
//     mapAllData: MapData[];
// }

// export const MapRender = ({ mapAllData }: MAPALLDataProps) => {
//   const position = { lat: 35.689, lng: 139.692 };

//   const [selectedPin, setSelectedPin] = useState<number | null>(null);
//   const selectedPinData = mapAllData.find((mapData) => mapData.id === selectedPin);

//   return (
//     <APIProvider
//       apiKey="AIzaSyBN2E7WJ1Nm-u4-RxC4ZDPjEoVA0pRhh_A"
//       libraries={["places"]}
//     >
//       <Flex flex="1">
//         <Map
//           defaultZoom={10}
//           defaultCenter={position}
//           mapId={"64d154fcc4cf1d4e"}
//         >
//           {mapAllData.map((mapData) => (
//             <AdvancedMarker
//               position={{
//                 lat: typeof mapData.lat === "string" ? parseFloat(mapData.lat) : mapData.lat,
//                 lng: typeof mapData.lng === "string" ? parseFloat(mapData.lng) : mapData.lng,
//               }}
//               key={mapData.id}
//               onClick={() => setSelectedPin(mapData.id)}
//             >
//               <Pin
//                 background={"blue"}
//                 borderColor={"green"}
//                 glyphColor={"green"}
//               />
//             </AdvancedMarker>
//           ))}
//           {selectedPin !== null && (
//             <InfoWindow
//             position={{
//                 lat: typeof selectedPinData.lat === "string" ? parseFloat(selectedPinData.lat) : selectedPinData.lat,
//                 lng: typeof selectedPinData.lng === "string" ? parseFloat(selectedPinData.lng) : selectedPinData.lng,
//               }}
//               onCloseClick={() => setSelectedPin(null)}
//             >
//               <p>{mapAllData.find((pin) => pin.id === selectedPin)?.title}</p>
//             </InfoWindow>
//           )}
//         </Map>
//       </Flex>
//     </APIProvider>
//   );
// };

"use client";

import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { Flex, Box, Heading, Text, Divider } from "@chakra-ui/react";
import { MapData } from "../types/type";
import { useState } from "react";
import { format } from "date-fns";

interface MAPALLDataProps {
  mapAllData: MapData[];
}

export const MapRender = ({ mapAllData }: MAPALLDataProps) => {
  const position = { lat: 35.689, lng: 139.692 };

  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const selectedPinData = mapAllData.find(
    (mapData) => mapData.id === selectedPin
  );

  return (
    <APIProvider
      apiKey="AIzaSyBN2E7WJ1Nm-u4-RxC4ZDPjEoVA0pRhh_A"
      libraries={["places"]}
    >
      <Flex flex="1">
        <Map
          defaultZoom={10}
          defaultCenter={position}
          mapId={"64d154fcc4cf1d4e"}
        >
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
            >
              <Pin
                background={"blue"}
                borderColor={"green"}
                glyphColor={"green"}
              />
            </AdvancedMarker>
          ))}
          {selectedPinData && (
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
                height="250px"
                padding="4"
                bg="gray.100"
                // boxShadow="md"
                // borderRadius="md"
                // border="1px solid"
                // borderColor="gray.300"
              >
                <Heading as="h3" size="xl" mb="2" color="teal.400">
                  {selectedPinData.title}
                </Heading>
                <Text color="blue.400" fontSize="sm">{`${format(
                  new Date(selectedPinData.createdAt),
                  "yyyy/MM/dd"
                )} - ${selectedPinData.address}`}</Text>
                <Divider borderColor="gray.500" />
                <Text fontSize="lg" color="gray.700" marginTop={4}>
                  {selectedPinData.content}
                </Text>
              </Box>
            </InfoWindow>
          )}
        </Map>
      </Flex>
    </APIProvider>
  );
};
