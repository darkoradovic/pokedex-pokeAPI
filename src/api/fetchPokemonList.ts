import { fetchPokemon } from "./fetchPokemon";

export const fetchPokemonList = async (page: number) => {
  const offset = 21 * (page - 1);
  const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=21`;

  const response = await fetch(URL);
  const data = await response.json();

  const promises = data.results.map(
    async (pokemon: { name: string }) => (await fetchPokemon(pokemon.name)).data
  );

  const pokemonList = Promise.all(promises);

  return pokemonList;
};
