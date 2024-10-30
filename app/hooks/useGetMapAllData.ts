import { MapData } from "../types/type";

export const useGetMapAllData = async (): Promise<Array<MapData>> => {
    const response = await fetch("http://localhost:3000/api/post", {
        cache: "no-store",
    });

    const mapAllData: MapData[] = await response.json();

    return mapAllData;
};
