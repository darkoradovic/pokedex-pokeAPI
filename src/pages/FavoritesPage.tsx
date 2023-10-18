import * as C from "./styles";
import { useContext, useEffect, useState } from "react";
import { Pokedex } from "../components/Pokedex";
import { Pokemon } from "../types/Pokemon";
import { auth, getFavorites } from "../api/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { PokemonModal } from "../components/PokemonModal";
import Button from "@mui/material/Button";
import { PokemonContext } from "../context/pokemonContext";
import { Link, redirect } from "react-router-dom";

type Favorite = {
  isFavoritePage: boolean;
  setIsFavoritePage?: (e: boolean) => void;
};

export const FavoritesPage = ({
  setIsFavoritePage,
  isFavoritePage,
}: Favorite) => {
  const {
    pokemonData,
    setPokemonData,
    loading,
    setLoading,
    modal,
    setModal,
    favorites,
    setFavorites,
  } = useContext(PokemonContext);
  const [user] = useAuthState(auth);
  const [activeSort, setActiveSort] = useState("date");
  let sorted: Pokemon[];

  const sortBy = () => {
    if (activeSort == "date") {
      sorted = favorites.sort(function (o1: Pokemon, o2: Pokemon) {
        return o1.timestamp - o2.timestamp;
      });
    } else if (activeSort == "id") {
      sorted = favorites.sort(function (o1: Pokemon, o2: Pokemon) {
        return o1.id - o2.id;
      });
    }
    return sorted;
  };

  useEffect(() => {
    if (user) {
      getFavorites(user.email, setFavorites);
      setIsFavoritePage(true);
    }
  }, [user]);

  console.log(favorites)

  return (
    <C.Container>
      <h1 className="favorite__title">My pokemons</h1>
     
       {favorites?.length === 0 ? <div className="no_pokemons"><p>Add pokemons to your list</p>  <Button><Link to='/'>Add</Link></Button></div> : <><C.Filters className="main-container"> <p>Sort by:</p>
        <Button
          onClick={() => setActiveSort("date")}
          title="Date added"
          variant="outlined"
        >
          Date added
        </Button>
        <Button
          onClick={() => setActiveSort("id")}
          title="ID"
          variant="outlined"
        >
          ID
        </Button>
      </C.Filters>
      <Pokedex
        setModal={setModal}
        setPokemonData={setPokemonData}
        loading={loading}
        setLoading={setLoading}
        favoritesPokemonList={sortBy()}
        isFavoritePage={isFavoritePage}
        setFavorites={setFavorites}
        favorites={favorites}
      /></>}
      {pokemonData && modal && (
        <PokemonModal setModal={setModal} pokemonData={pokemonData} />
      )}
    </C.Container>
  );
};
