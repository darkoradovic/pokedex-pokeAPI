import { useContext, useEffect, useRef, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getFavorites } from "../api/firebase/firebase";
import { fetchPokemonList } from "../api/fetchPokemonList";
import { SearchBar } from "../components/SearchBar";
import { Pokedex } from "../components/Pokedex";
import { PokemonModal } from "../components/PokemonModal";
import { AuthModal } from "../components/AuthModal";
import { getStripe } from "../api/stripe/stripe";
import { StripeModal } from "../components/AuthModal/Stripe";
import { PokemonContext } from "../context/pokemonContext";
import { UserContext } from "../context/userContext";

type Favorite = {
  isFavoritePage: boolean;
  setIsFavoritePage?: (e: boolean) => void;
};

export const HomePage = ({ setIsFavoritePage, isFavoritePage }: Favorite) => {
  const {
    pokemonData,
    setPokemonData,
    pokemonList,
    setPokemonList,
    pokemonAmount,
    setPokemonAmount,
    error,
    setError,
    loading,
    setLoading,
    page,
    setPage,
    modal,
    setModal,
    showPagination,
    setShowPagination,
    disabledButton,
    setDisabledButton,
    authModal,
    setAuthModal,
    favorites,
    setFavorites,
  } = useContext(PokemonContext);
  const { stripeModal, setStripeModal } = useContext(UserContext);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setPokemonList(await fetchPokemonList(1));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (user) {
      getFavorites(user.email, setFavorites);
      setIsFavoritePage(false);
    }
  }, [user]);

  useEffect(() => {
    setError(false);
  }, [pokemonList]);

  return (
    <>
      <SearchBar
        setPokemonList={setPokemonList}
        pokemonAmount={pokemonAmount}
        setPokemonAmount={setPokemonAmount}
        setError={setError}
        setLoading={setLoading}
        setPage={setPage}
        setShowPagination={setShowPagination}
        disabledButton={disabledButton}
        setDisabledButton={setDisabledButton}
        searchBarRef={searchBarRef}
      />
      <Pokedex
        setModal={setModal}
        setPokemonData={setPokemonData}
        pokemonList={pokemonList}
        setPokemonList={setPokemonList}
        pokemonAmount={pokemonAmount}
        setPokemonAmount={setPokemonAmount}
        error={error}
        loading={loading}
        setLoading={setLoading}
        page={page}
        setPage={setPage}
        showPagination={showPagination}
        setShowPagination={setShowPagination}
        searchBarRef={searchBarRef}
        disabledButton={disabledButton}
        setAuthModal={setAuthModal}
        favorites={favorites}
        setFavorites={setFavorites}
        setStripeModal={setStripeModal}
      />
      {pokemonData && modal && (
        <PokemonModal setModal={setModal} pokemonData={pokemonData} />
      )}
      {authModal && <AuthModal setModal={setAuthModal} />}
      {stripeModal && <StripeModal setStripeModal={setStripeModal} />}
    </>
  );
};
