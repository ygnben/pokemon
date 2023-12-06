import { useState, useEffect } from "react";
import PokemonInfo from "../components/PokemonInfo";
import { useNavigate } from "react-router-dom";
import ".././App.css";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Logout from ".././features/Logout";

function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [inputName, setInputName] = useState("");
  const [allpokemon, setAllPokemon] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/pokemonInfo/${event.target.elements.pokemonName.value}`);

    console.log("submit");
  }

  function handleChange(event) {
    {
      setInputName(event.target.value);
    }
  }

  function handleAllClick() {
    navigate("/pokemonInfo");
  }

  return (
    <>
      <Card sx={{ minWidth: 400 }}>
        <div>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Search Pokemon
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
            <TextField
              id="pokemonName"
              label="Pokemon"
              // onChange={handleChange}
              // value={inputName}
            />

            <Button type="submit" variant="contained" size="large">
              Search
            </Button>
          </CardContent>
        </form>
        <CardActions>
          <Button onClick={handleAllClick} size="small">
            Get All Pokemon
          </Button>
        </CardActions>
      </Card>
      <Logout />
    </>
  );
}

export default Home;
