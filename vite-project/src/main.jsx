import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import PokemonInfo from "./PokemonInfo.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  //   {/* <PokemonInfo /> */}
  //   {/* <Home /> */}
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<App />}> */}
      <Route index element={<App />} />
      <Route path="/home" element={<App />} />
      <Route path="/pokemonInfo" element={<PokemonInfo />} />
      <Route path="/pokemonInfo/:name" element={<PokemonInfo />} />
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
);
