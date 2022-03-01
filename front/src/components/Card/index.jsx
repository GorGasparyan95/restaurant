import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { StarIcon, CloseIcon } from "@chakra-ui/icons";

const Card = ({ item, middle, setMiddle }) => {
  const history = useHistory();
  return (
    <Box
      minW="sm"
      borderRadius="8px"
      overflow="hidden"
      boxShadow="0 0 24px 4px rgba(0, 0, 0, 0.15)"
    >
      <Box p="6">
        {middle && (
          <Box float="right" onClick={() => setMiddle(false)}>
            <CloseIcon />
          </Box>
        )}
        <Box mt="1" fontWeight="semibold" as="h3" lineHeight="tight">
          {middle ? "Name: " : ""} {item.title}
        </Box>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {middle ? "Description: " : ""}
          {item.description}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {middle ? "Address: " : ""}
          {item.address}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {middle ? "phone: " : ""}
          {item.phone}
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < item.rateAll ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {item.rateing.length} reviews
          </Box>
          {!middle && (
            <Button
              colorScheme="teal"
              size="md"
              ml="auto"
              onClick={() => history.push(`/restaurant?id=${item._id}`)}
            >
              View
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
