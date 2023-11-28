import React, { useState, useEffect } from "react";

function PokemonInfo({
  pokemon,
  setInputName,
  status,
  setPokemon,
  // setPokemonName,
  handleBackClick,
  allpokemon
}) {
  // const [status, setStatus] = useState("idle");
  // const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  // if (status === "idle") {
  //   return "Submit a pokemon";
  // }

  // if (status === "rejected") {
  //   return "Oh no...";
  // }

  // if (status === "pending") {
  //   return "...";
  // }

  // if (status === "resolved") {
    // function handleBackClick() {
    //   console.log("back");
    //   setInputName("");
    //   setPokemon(null);
    //   setPokemonName("");
    //   // console.log("in", setInputName);
    //   console.log("setname", setPokemonName);
    // }
    // console.log(pokemon);
    // console.log(setPokemonName);
    return (
      pokemon?(


      <div className="container">
        <div>
          <img className="profile" src={pokemon.image} alt="" />
        </div>
        <div className="textField">
          <div className="firstFlied">
            <div>name:{pokemon.name}</div>
            <div>type:{pokemon.types}</div>
            <div>weaknesses:{pokemon.weaknesses}</div>
          </div>
          <button onClick={handleBackClick}>Back</button>
        </div>
      </div>
      ):(

        allpokemon.map((pokemon)=>pokemon.name)
      )

    );

    // return <pre>{JSON.stringify(pokemon, null, 2)}</pre>;
    // return "resolved";
  }
// }

export default PokemonInfo;
