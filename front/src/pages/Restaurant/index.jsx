import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Flex,
  Heading,
  Select,
  Button,
  Input,
} from "@chakra-ui/react";
import useQueryParams from "../../hooks/useQueryParams";
import { useHistory } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState();
  const [rate, setRate] = useState();
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const params = useQueryParams();
  const history = useHistory();
  const id = params.get("id");
  const rates = [1, 2, 3, 4, 5];

  const getRestaurant = async () => {
    try {
      await fetch(`http://localhost:5000/restaurant/${id}`).then((res) =>
        res.json().then((data) => setRestaurant(data))
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = async () => {
    setLoading(true);
    console.log(id);
    try {
      await fetch(`http://localhost:5000/restaurant/${id}`, {
        method: "PUT",
        body: JSON.stringify({ rateing: rate, comments: value }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        const res = await response.json();
        console.log(res);
        setRestaurant(res);
        setValue("");
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const deleteRestaurant = async () => {
    try {
      await fetch(`http://localhost:5000/restaurant/${id}`, {
        method: "DELETE",
      });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  const handleSelect = (e) => {
    setRate(e.target.value);
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <Box>
      <VStack>
        <Heading as="h1" fontSize="4xl" color="blue" m="4">
          Restaurant {restaurant?.title}
        </Heading>
        {restaurant ? (
          <Flex
            py="4"
            boxShadow="0 0 24px 4px rgba(0, 0, 0, 0.15)"
            mt="8"
            direction="column"
            border="2px solid teal"
            minW="550px"
            borderRadius="12px"
            justifyContent="center"
            alignItems="center"
          >
            <Box width="full">
              <Button
                colorScheme="red"
                size="md"
                float="right"
                mr="5"
                onClick={deleteRestaurant}
              >
                DELETE
              </Button>
            </Box>
            <Box p="4px" color="gray.600" fontSize="md" fontWeight="bold">
              Name: {restaurant?.title}
            </Box>
            <Box p="4px" color="gray.600" fontSize="md" fontWeight="bold">
              Description: {restaurant?.description}
            </Box>
            <Box p="4px" color="gray.600" fontSize="md" fontWeight="bold">
              Address: {restaurant?.address}
            </Box>
            <Box p="4px" color="gray.600" fontSize="md" fontWeight="bold">
              Phone: {restaurant?.phone}
            </Box>
            <Box p="4px" color="gray.600" fontSize="md" fontWeight="bold">
              Rateing: {restaurant?.rateAll}
            </Box>
            <Flex direction="row" p="2">
              {" "}
              <Select
                variant="filled"
                maxW="60px"
                size="sm"
                mr="2"
                onChange={handleSelect}
              >
                {rates.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <Button
                isLoading={loading}
                colorScheme="teal"
                size="sm"
                onClick={handleChange}
              >
                RATE
              </Button>
            </Flex>
            <Box
              overflowY="scroll"
              maxH="200px"
              width="80%"
              mb="5"
              bg="teal.100"
            >
              {restaurant?.comments.map((comment) => (
                <Box bg="gray.100" p="8px" m="16px">
                  {comment}
                </Box>
              ))}
            </Box>
            <Box
              width="400px"
              onKeyDown={(e) => e.keyCode === 13 && handleChange()}
            >
              <Input
                value={value}
                size="lg"
                placeholder="comment.."
                onChange={(e) => setValue(e.target.value)}
              />
            </Box>
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
      </VStack>
    </Box>
  );
};

export default Restaurant;
