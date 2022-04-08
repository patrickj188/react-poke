import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import { Container } from '@mantine/core';
import { PokemonProvider } from "./components/PokemonContext";



function App() {

  return (
    <div>
      <PokemonProvider>
        <Search />
      </PokemonProvider>

    </div>
  );
}

export default App;
