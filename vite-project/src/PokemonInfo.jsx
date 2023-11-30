import React, { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import {
  createRoutesFromChildren,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

// import "./PokemonInfo.css";

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
    fetchAllPokemon(100).then((pokemonData) => {
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
    <Card sx={{ width: 300 }}>
      <Box sx={{ flexDirection: "column", display: "flex", alignItems: "center" }}>
        {/* <div>
        <img className="profile" src={pokemon.image} alt="" />
      </div> */}
        <Avatar

          src={pokemon.image}
          sx={{

            border: "black solid",
            width: 200, height: 200,
          }} />
        <Box sx={{ flexDirection: "column", display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <div>name:{pokemon.name}</div>
            <div>type:{pokemon.types}</div>
            <div>weaknesses:{pokemon.weaknesses}</div>
          </Box>
          <button onClick={handleBackClick}>Back</button>
        </Box>
      </Box>
    </Card>
  ) : (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Box sx={
        { display:"flex",width: "100%" }
      }>

        <button onClick={handleBackClick}>Back</button>
      </Box>
      {

        allpokemon.map((pokemon) => (
          <Card key={pokemon.id} sx={{ width: 300,  marginBottom:"50px"}}>
            <Box sx={{ flexDirection: "column", display: "flex", alignItems: "center",  padding:"20px"}}>
              {/* <div>
        <img className="profile" src={pokemon.image} alt="" />
      </div> */}
              <Box sx={{ alignItems: "center" }}>
                <Avatar
                  src={pokemon.image}
                  sx={{

                    border: `black solid`,
                    width: 200, height: 200,
                  }}
                />
              </Box>
              <Box sx={{ flexDirection: "column", display: "flex" }}>
                <Box sx={{ display: "flex", flexDirection: "column", textAlign:"left"}}>
                  <div>name:{pokemon.name}</div>
                  <div>type:{pokemon.types}</div>
                  <div>weaknesses:{pokemon.weaknesses}</div>
                </Box>

              </Box>
            </Box>
          </Card>
        ))
      }
    </Box>);
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
