import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import "./index.css";
import PokemonInfo from "./components/PokemonInfo.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

// const navigate = useNavigate();
const AuthContext = React.createContext(null);
let token = null;
const useAuth = () => {
  return React.useContext(AuthContext);
};

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app",
  cache: new InMemoryCache(),
});

const ProtectedRoute = ({ children }) => {
  token = window.localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
    // navigate("/login");
  }

  return children;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // <AuthContext.Provider value={token}>
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/pokemonInfo" element={<PokemonInfo />} />
        <Route path="/pokemonInfo/:name" element={<PokemonInfo />} />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
  // </AuthContext.Provider>
);
