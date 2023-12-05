import React, { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useQuery, gql } from "@apollo/client";

import {
  createRoutesFromChildren,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function PokemonInfo() {
  const navigate = useNavigate();

  const first = +100;

  const { name } = useParams();

  const GET_ALL_POKEMON = gql`
    query ($first: Int!) {
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
    }
  `;
  const GET_POKEMON = gql`
    query Pokemon($name: String) {
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
    }
  `;

  const { loading, error, data } = name
    ? useQuery(GET_POKEMON, {
        variables: { name },
      })
    : useQuery(GET_ALL_POKEMON, {
        variables: { first },
      });

  console.log("data", data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  function handleBackClick() {
    console.log("back");

    navigate("/home");
  }

  return name ? (
    <Card sx={{ width: 300 }}>
      <Box
        sx={{ flexDirection: "column", display: "flex", alignItems: "center" }}
      >
        <Avatar
          src={data.pokemon.image}
          sx={{
            border: "black solid",
            width: 200,
            height: 200,
          }}
        />
        <Box sx={{ flexDirection: "column", display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <div>name:{data.pokemon.name}</div>
            <div>type:{data.pokemon.types}</div>
            <div>weaknesses:{data.pokemon.weaknesses}</div>
          </Box>
          <button onClick={handleBackClick}>Back</button>
        </Box>
      </Box>
    </Card>
  ) : (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <button onClick={handleBackClick}>Back</button>
      </Box>
      {data.pokemons.map((pokemon) => (
        <Card key={pokemon.id} sx={{ width: 300, marginBottom: "50px" }}>
          <Box
            sx={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Box sx={{ alignItems: "center" }}>
              <Avatar
                src={pokemon.image}
                sx={{
                  border: `black solid`,
                  width: 200,
                  height: 200,
                }}
              />
            </Box>
            <Box sx={{ flexDirection: "column", display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <div>name:{pokemon.name}</div>
                <div>type:{pokemon.types}</div>
                <div>weaknesses:{pokemon.weaknesses}</div>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

export default PokemonInfo;
