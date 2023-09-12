import { useEffect, useState } from "react";
import { Pokedex } from "../components/Pokedex";
import { Pokemon } from "../types/Pokemon";
import { auth, getFavorites } from "../api/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { PokemonModal } from "../components/PokemonModal";

type Favorite = {
  isFavoritePage: boolean;
  setIsFavoritePage?: (e: boolean) => void;
};

export const FavoritesPage = ({
  setIsFavoritePage,
  isFavoritePage,
}: Favorite) => {
  const [modal, setModal] = useState(false);
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<any>([]); //set any becouse of different data structure
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      getFavorites(user.email, setFavorites);
      setIsFavoritePage(true);
    }
  }, [user]);

  return (
    <>
      <Pokedex
        setModal={setModal}
        setPokemonData={setPokemonData}
        loading={loading}
        setLoading={setLoading}
        favoritesPokemonList={favorites}
        isFavoritePage={isFavoritePage}
        setFavorites={setFavorites}
        favorites={favorites}
      />
      {pokemonData && modal && (
        <PokemonModal setModal={setModal} pokemonData={pokemonData} />
      )}
    </>
  );
};
