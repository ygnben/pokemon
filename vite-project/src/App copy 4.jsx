import { useState, useEffect } from "react";
import PokemonInfo from "./PokemonInfo";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  // const [status, setStatus] = useState("one");
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [inputName, setInputName] = useState("");
  const [allpokemon, setAllPokemon] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // setPokemonName(event.target.elements.pokemonName.value);
    setPokemonName("abc");
    console.log("pokemonSName", pokemonName);
    navigate(`/pokemonInfo/${inputName}`);
    // navigate(`/pokemonInfo/${event.target.elements.pokemonName.value}`); // another way to set status value
    // navigate(`/pokemonInfo/Bulbasaur`);
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
    <div className="card">
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName">Pokemon Name</label>
        <div>
          <input id="pokemonName" onChange={handleChange} value={inputName} />
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />
      <button onClick={handleAllClick}>get all pokemon</button>
    </div>
  );
}

export default App;
