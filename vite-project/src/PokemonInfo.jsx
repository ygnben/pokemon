import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./PokemonInfo.css";

function PokemonInfo({
  // pokemon,
  setInputName,
  status,
  // setPokemon,
  // setPokemonName,
  // handleBackClick,
  // allpokemon,
  pokemonName
}) {
  // const [status, setStatus] = useState("idle");
  // const [pokemon, setPokemon] = useState(null);
  const [allpokemon, setAllPokemon] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  
  // const {state} = useLocation();
  // const {pokemonName} = state


  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    // setStatus("pending");
    fetchPokemon(pokemonName)
      .then(
        // (pokemonData) => {
        //   setStatus("resolved");
        //   console.log("data", pokemonData);
        //   setPokemon(pokemonData);
        // },
        // (errorData) => {
        //   setStatus("rejected");
        //   setError(errorData);
        // }
        (pokemonData) => {
          console.log("data", pokemonData);
          setPokemon(pokemonData);
          // setStatus("resolved");
        }
      )
      .catch((e) => console.log(e));
  }, [pokemonName]);
  useEffect(() => {
    fetchAllPokemon(1000).then((pokemonData) => {
      setAllPokemon(pokemonData);
      console.log("pokemonData", pokemonData);
    });
    console.log("test");
  }, []);

  console.log("allpokemon", allpokemon);
  console.log("pokemon", pokemon);


  function handleBackClick() {
    console.log("back");
    // setInputName("");
    // setPokemon(null);
    // setPokemonName("");
    // setAllPokemon("");
    // console.log("in", setInputName);
    // console.log("setname", setPokemonName);
    // setStatus("one");
    navigate("/home");
  }
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
  // return(

    return pokemonName ? (
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
      ) : (
        allpokemon.map((pokemon) => (
          <div key={pokemon.id} className="container">
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
    ))
      )
    // )
    // );
    // return;
  // return <pre>{JSON.stringify(pokemon, null, 2)}</pre>;
  // return "resolved";
}

function fetchAllPokemon(first) {
  const pokemonQuery = `
  query ($first: Int!){
    pokemons(first: $first) {
              id
              number
              name
              image
              weight {
                minimum
                maximum
              }
              types
              height {
                minimum
                maximum
              }
              classification
              resistant
              weaknesses
              fleeRate
              maxHP
              maxCP
              evolutions {
                id
              }
              evolutionRequirements {
                amount
                name
              }
    }
  }`;
  return (
    window
      // .fetch("https://graphqlpokemon.favware.tech/v7", {
      .fetch("https://graphql-pokemon2.vercel.app", {
        // learn more about this API here: https://graphql-pokemon.now.sh/
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify({
          query: pokemonQuery,
          variables: {
            first,
          },
        }),
      })
      .then((r) => r.json())
      .then((response) =>
        response.data.pokemons
        // console.log("resp", response)
        // console.log("resp getpokemon", response)
      )
  );
}

function fetchPokemon(name) {
  const pokemonQuery = `
    query ($name: String){
      pokemon(name: $name) {
                id
                number
                name
                image
                weight {
                  minimum
                  maximum
                }
                types
                height {
                  minimum
                  maximum
                }
                classification
                resistant
                weaknesses
                fleeRate
                maxHP
                maxCP
                evolutions {
                  id
                }
                evolutionRequirements {
                  amount
                  name
                }
      }
    }`;
  return (
    window
      // .fetch("https://graphqlpokemon.favware.tech/v7", {
      .fetch("https://graphql-pokemon2.vercel.app", {
        // learn more about this API here: https://graphql-pokemon.now.sh/
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify({
          query: pokemonQuery,
          variables: {
            name,
          },
        }),
      })
      .then((r) => r.json())
      .then(
        (response) => response.data.pokemon
        // console.log("resp", response);
        // console.log("resp getpokemon", response);
      )
  );
}
export default PokemonInfo;
