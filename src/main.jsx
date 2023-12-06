import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./features/Home.jsx";
import Login from "./features/Login.jsx";
import PokemonInfo from "./components/PokemonInfo.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import "./index.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const AuthContext = React.createContext(null);

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <AuthContext.Provider value={token}>
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/pokemonInfo" element={<PokemonInfo />} /> */}
        {/* <Route path="/pokemonInfo/:name" element={<PokemonInfo />} /> */}
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="pokemonInfo"
          element={
            <ProtectedRoute>
              <PokemonInfo />
            </ProtectedRoute>
          }
        />

        <Route
          path="pokemonInfo/:name"
          element={
            <ProtectedRoute>
              <PokemonInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
