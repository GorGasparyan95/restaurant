import React, { useEffect, useState } from "react";
import { Box, Heading, Flex, Button, useDisclosure } from "@chakra-ui/react";
import CreateRestaurant from "./CreateReastaurant";
import Card from "../../components/Card";
import { Spinner } from "@chakra-ui/react";
import Map from "./Map";

const Homepage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = useState();
  const [middle, setMiddle] = useState({ restaurant: "", bool: false });
  console.log(middle);

  const getRestaurants = async () => {
    try {
      await fetch("http://localhost:5000/restaurant").then(async (response) => {
        const res = await response.json();
        setValues(res);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <Box>
      <CreateRestaurant isOpen={isOpen} onClose={onClose} />
      <Box pb="8">
        <Flex>
          {" "}
          <Heading as="h1" mx="auto" fontSize="4xl" color="blue" mt="20px">
            Restaurants
          </Heading>
        </Flex>
        <Button colorScheme="teal" size="md" m="2" onClick={onOpen}>
          Add Restaurant
        </Button>
        <Flex justifyContent="space-between">
          {values ? (
            <Flex direction="column" overflowY="scroll" height="90vh">
              {values?.map((item) => (
                <Box
                  m="2"
                  key={item._id}
                  onClick={() => setMiddle({ restaurant: item, bool: true })}
                >
                  <Card item={item} middle={false} />
                </Box>
              ))}
            </Flex>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}

          <Box
            bg="blue.200"
            position="absolute"
            zIndex={1000}
            left="400px"
            top="300px"
            maxW="500px"
          >
            {middle?.bool && (
              <Card
                item={middle.restaurant}
                middle={middle.bool}
                setMiddle={setMiddle}
              />
            )}
          </Box>
          <Map
            coords={values?.map((restaurant) => restaurant.coords)}
            values={values}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default Homepage;
