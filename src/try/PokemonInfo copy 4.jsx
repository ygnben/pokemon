import React, { useState, useEffect } from "react";
import {
  createRoutesFromChildren,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./PokemonInfo.css";

function PokemonInfo({ setInputName, status }) {
  const [allpokemon, setAllPokemon] = useState([]);
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  const { name } = useParams();

  console.log("name", name);
  useEffect(() => {
    if (!name) {
      return;
    }
    fetchPokemon(name)
      .then((pokemonData) => {
        console.log("data", pokemonData);
        setPokemon(pokemonData);
        // setStatus("resolved");
      })
      .catch((e) => console.log(e));
  }, [name]);
  useEffect(() => {
    fetchAllPokemon(1000).then((pokemonData) => {
      setAllPokemon(pokemonData);
    });
    console.log("test");
  }, []);

  function handleBackClick() {
    console.log("back");

    navigate("/home");
  }

  console.log("pokemon", pokemon);

  return pokemon ? (
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
  );
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
      .then(
        (response) => response.data.pokemons
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
        // console.log("resp", response)
        // console.log("resp getpokemon", response);
      )
  );
}
export default PokemonInfo;
