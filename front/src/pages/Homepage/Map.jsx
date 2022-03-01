import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { useHistory } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";
import { CloseIcon } from "@chakra-ui/icons";

// const places = [
//   { lat: 40.184728, lng: 44.507815 },
//   { lat: 40.178422, lng: 44.511086 },
//   { lat: 40.192433, lng: 44.532962 },
// ];

const Map = ({ coords, values }) => {
  const [info, setInfo] = useState({ place: "", bool: false });

  const coordinates = { lat: 40.182133, lng: 44.51028 };
  const history = useHistory();

  const handleUnique = ({ lat, lng }) => {
    const unique = values.filter(
      (value) => value.coords.lat === lat && value.coords.lng === lng
    );
    history.push(`/restaurant?id=${unique[0]._id}`);
  };

  return (
    <Box height="85vh" width="60%" mr="4">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAUsHN0-hDDnahVhzNd8-6aWcRTbnmLM7E" }}
        center={coordinates}
        defaultZoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
        margin={[50, 50, 50, 50]}
      >
        {coords?.map((place, i) => (
          <Box key={i} lat={place.lat} lng={place.lng}>
            <GoLocation
              size={30}
              color="red"
              onClick={() => handleUnique({ lat: place.lat, lng: place.lng })}
              onMouseEnter={() => setInfo({ place: place, bool: true })}
            />
          </Box>
        ))}
        {info?.bool && (
          <Box lat={info.place.lat} lng={info.place.lng}>
            {values
              .filter(
                (value) =>
                  value.coords.lat === info.place.lat &&
                  value.coords.lng === info.place.lng
              )
              .map((item) => (
                <VStack
                  pr="15px"
                  key={item._id}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    pr="30px"
                    _hover={{ color: "red" }}
                    onClick={() => setInfo({ bool: false })}
                  >
                    <CloseIcon />
                  </Box>
                  <Box fontWeight="bold" pt="10px" fontSize="12px">
                    {item.title}
                  </Box>
                  <Box fontWeight="bold" fontSize="12px">
                    {item.address}
                  </Box>
                </VStack>
              ))}
          </Box>
        )}
      </GoogleMapReact>
    </Box>
  );
};

export default Map;
