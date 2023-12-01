import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Login from "./Login.jsx";
import "./index.css";
import PokemonInfo from "./PokemonInfo.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  //   {/* <PokemonInfo /> */}
  //   {/* <Home /> */}
  // </React.StrictMode>
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />}> */}
        <Route index element={<App />} />
        <Route index element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/pokemonInfo" element={<PokemonInfo />} />
        <Route path="/pokemonInfo/:name" element={<PokemonInfo />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
