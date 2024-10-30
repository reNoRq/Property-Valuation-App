import { useGetMapAllData } from "./hooks/useGetMapAllData";
import { MapRender } from "./components/MapRender";

//??? Is this?
// import { map } from "framer-motion/client";

// function fail() {
//   alert("位置情報の取得に失敗しました。");
// }

export default async function Home() {
  // navigator.geolocation.getCurrentPosition((pos) => {
  //   position.lat = pos.coords.latitude;
  //   position.lng = pos.coords.longitude;
  // }, fail);

  const mapAllData = await useGetMapAllData();

  return <MapRender mapAllData={mapAllData} />;
}

// type Point = google.maps.LatLngLiteral & { lat: number } & {
//   lng: number;
// } & { category: number };
// type Props = { points: Point[] };

// interface MAPALLDataProps {
//   mapAllData: MapData[];
// }

// const Markers = ({ mapAllData }: MAPALLDataProps) => {
//   return (
//     <>
//       {mapAllData.map((mapData) => (
//         <AdvancedMarker
//           position={{ lat: mapData.lat, lng: mapData.lng }}
//           key={mapData.id}
//         >
//           <Pin background={"blue"} borderColor={"green"} glyphColor={"green"} />
//         </AdvancedMarker>
//       ))}
//     </>
//   );
// };
