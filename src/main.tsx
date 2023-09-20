import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "./globalStyles";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/userContext";
import PokemonProvider from "./context/pokemonContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <PokemonProvider>
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </PokemonProvider>
  </UserProvider>
);
