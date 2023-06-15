import React, { useEffect, useState } from 'react';
import PokemonThumbnail from './components/PokemonThumbnail';

function App() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
  
    setLoadMore(data.next);
  
    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const data = await res.json();
      return data;
    });
  
    const pokemonData = await Promise.all(promises);
    const sortedPokemonData = [...allPokemons, ...pokemonData].sort((a, b) => a.id - b.id);
    setAllPokemons(sortedPokemonData);
  };
  
  useEffect(() => {
    getAllPokemons();
  }, []);


  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => 
            <PokemonThumbnail
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other.dream_world.front_default}
            type={pokemon.types[0].type.name}
            key={index}
            />
          )}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Load More</button>
      </div>
    </div>
  );
}

export default App;
