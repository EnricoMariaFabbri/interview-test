import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import MainPage from "./components/MainPage";

function App() {
  return (
    <>
      <ChakraProvider>
        <MainPage></MainPage>
      </ChakraProvider>
    </>
  );
}

export default App;
