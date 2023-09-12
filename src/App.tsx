import { useEffect, useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Layout/Footer";
import { PokemonModal } from "./components/PokemonModal";
import { Pokemon } from "./types/Pokemon";
import { AuthModal } from "./components/AuthModal";
import { Routes, Route } from "react-router-dom";
import { FavoritesPage, HomePage } from "./pages";

const App = () => {
  const [modal, setModal] = useState(false);
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [loading, setLoading] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [isFavoritePage, setIsFavoritePage] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    modal
      ? (html.style.overflow = "hidden")
      : (html.style.overflow = "initial");
  }, [modal]);

  return (
    <>
      <HeroSection
        setModal={setModal}
        setPokemonData={setPokemonData}
        setLoading={setLoading}
        loading={loading}
        setAuthModal={setAuthModal}
        isFavoritePage={isFavoritePage}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isFavoritePage={isFavoritePage}
              setIsFavoritePage={setIsFavoritePage}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              isFavoritePage={isFavoritePage}
              setIsFavoritePage={setIsFavoritePage}
            />
          }
        />
      </Routes>

      <Footer />
      {pokemonData && modal && (
        <PokemonModal setModal={setModal} pokemonData={pokemonData} />
      )}
      {authModal && <AuthModal setModal={setAuthModal} />}
    </>
  );
};

export default App;
