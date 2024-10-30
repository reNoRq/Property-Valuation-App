"use client";

//Google Places API
import { Input, List, ListItem } from "@chakra-ui/react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export const PlacesAutocomplete = ({ setSelected, setAddress, setLat, setLng }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    setAddress(address);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setLat(lat);
    setLng(lng);
    setSelected({ lat, lng });
  };

  return (
    <>
      <Input
        placeholder="Search an address"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
      />
      {status === "OK" && (
        <List
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          mt={2}
          shadow="sm"
        >
          {data.map(({ place_id, description }) => (
            <ListItem
              key={place_id}
              _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
              onClick={() => handleSelect(description)}
            >
              {description}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};
