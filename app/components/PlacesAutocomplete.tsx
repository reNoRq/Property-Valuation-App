"use client";

//Google Places API
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { LuSearch } from "react-icons/lu";

import { Box, Input } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { CloseButton } from "@/components/ui/close-button";

export const PlacesAutocomplete = ({
  setSelected,
  setAddress,
  setLat,
  setLng,
}) => {
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
      <InputGroup
        w="full"
        startElement={<LuSearch />}
        endElement={
          <CloseButton
            size="sm"
            bg="gray.50"
            color="gray.700"
            _hover={{ bg: "gray.300", color: "black" }}
            borderRadius="lg"
            onClick={() => {
              setValue("");
              setAddress("");
              setSelected(null);
            }}
          />
        }
      >
        <Input
          placeholder="場所を入力"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          borderRadius="md"
          color="gray.800"
          bg="gray.50"
        />
      </InputGroup>
      {status === "OK" && (
        <Box
          w="full"
          color="gray.800"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          mt={2}
          shadow="sm"
        >
          {data.map(({ place_id, description }) => (
            <Box
              key={place_id}
              _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
              onClick={() => handleSelect(description)}
            >
              {description}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};
