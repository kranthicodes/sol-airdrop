import { Box, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import AirDrop from "./components/AirDrop";


export default function App() {

  return (
    <ChakraProvider>
      <Flex
        h="100vh"
        display="flex"
        w="100vw"
        bg="radial-gradient(ellipse farthest-side at 76% 77%, rgba(245, 228, 212, 0.25) 4%, rgba(255, 255, 255, 0) calc(4% + 1px)), radial-gradient(circle at 76% 40%, #fef6ec 4%, rgba(255, 255, 255, 0) 4.18%), linear-gradient(135deg, #ff0000 0%, #000036 100%), radial-gradient(ellipse at 28% 0%, #ffcfac 0%, rgba(98, 149, 144, 0.5) 100%), linear-gradient(180deg, #cd6e8a 0%, #f5eab0 69%, #d6c8a2 70%, #a2758d 100%); background-blend-mode: normal, normal, screen, overlay, normal"
        direction="column"
        justify="center"
        align="center"
      >
        <Box mb={8}>
          <Heading as="h1" color="#0d004d" fontSize="3rem">
            Solana Airdrop App
          </Heading>
        </Box>
        <AirDrop />
      </Flex>
    </ChakraProvider>
  );
}
