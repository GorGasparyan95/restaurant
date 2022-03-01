import React from "react";
import { ChakraProvider as Chakra } from "@chakra-ui/react";

const ChakraProvider = ({ children }) => {
  return <Chakra>{children}</Chakra>;
};

export default ChakraProvider;
