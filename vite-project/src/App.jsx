import { useState, useEffect } from "react";
import PokemonInfo from "./PokemonInfo";

function App() {
  const [status, setStatus] = useState("idle");
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [inputName, setInputName] = useState("");

  function getAllPokemon(num) {

    return()
  }
  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setStatus("pending");
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
          setStatus("resolved");
        }
      )
      .catch((e) => console.log(e));
  }, [pokemonName]);

  function handleSubmit(event) {
    event.preventDefault();
    setPokemonName(event.target.elements.pokemonName.value);
  }

  function handleChange(event) {
    {
      setInputName(event.target.value);
    }
  }

  function handleBackClick() {
    console.log("back");
    setInputName("");
    setPokemon(null);
    setPokemonName("");
    console.log("in", setInputName);
    console.log("setname", setPokemonName);
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
  return pokemon ? (
    <div>
      <PokemonInfo
        pokemon={pokemon}
        setInputName={setInputName}
        status={status}
        setPokemon={setPokemon}
        handleBackClick={handleBackClick}
        setPokemonName={setPokemonName}
      />
    </div>
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName">Pokemon Name</label>
        <div>
          <input id="pokemonName" onChange={handleChange} value={inputName} />
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />

      {/* <PokemonInfo
        pokemon={pokemon}
        setInputName={setInputName}
        status={status}
        setPokemon={setPokemon}
        setPokemonName={setPokemonName}
      /> */}
    </div>
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
export default App;
