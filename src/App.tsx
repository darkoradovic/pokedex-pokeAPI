import { useEffect, useRef, useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { SearchBar } from "./components/SearchBar";
import { Pokedex } from "./components/Pokedex";
import { Footer } from "./components/Layout/Footer";
import { PokemonModal } from "./components/PokemonModal";
import { Pokemon } from "./types/Pokemon";
import { fetchPokemonList } from "./api/fetchPokemonList";
import { AuthModal } from "./components/AuthModal";
import { auth, getFavorites, logout } from "./api/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const [modal, setModal] = useState(false);
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonAmount, setPokemonAmount] = useState(21);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showPagination, setShowPagination] = useState(true);
  const [disabledButton, setDisabledButton] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [favorites, setFavorites] = useState([]);
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
    }
  }, [user]);

  useEffect(() => {
    const html = document.documentElement;

    modal
      ? (html.style.overflow = "hidden")
      : (html.style.overflow = "initial");
  }, [modal]);

  useEffect(() => {
    setError(false);
  }, [pokemonList]);

  return (
    <>
      <HeroSection
        setModal={setModal}
        setPokemonData={setPokemonData}
        setLoading={setLoading}
        loading={loading}
      />
      <button onClick={() => logout()}>out</button>
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
      />
      <Footer />
      {pokemonData && modal && (
        <PokemonModal setModal={setModal} pokemonData={pokemonData} />
      )}
      {authModal && <AuthModal setModal={setAuthModal} />}
    </>
  );
};

export default App;
