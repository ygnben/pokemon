import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import "./index.css";
import PokemonInfo from "./PokemonInfo.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="297248572097-v24t8i1jbbivtkdr1ef13qn0sid8gbjh.apps.googleusercontent.com">
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pokemonInfo" element={<PokemonInfo />} />
          <Route path="/pokemonInfo/:name" element={<PokemonInfo />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </GoogleOAuthProvider>
);
