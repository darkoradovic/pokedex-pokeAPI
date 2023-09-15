import { useEffect, useRef, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getFavorites } from "../api/firebase/firebase";
import { fetchPokemonList } from "../api/fetchPokemonList";
import { SearchBar } from "../components/SearchBar";
import { Pokedex } from "../components/Pokedex";
import { PokemonModal } from "../components/PokemonModal";
import { AuthModal } from "../components/AuthModal";
import { getStripe } from "../api/stripe/stripe";

type Favorite = {
  isFavoritePage: boolean;
  setIsFavoritePage?: (e: boolean) => void;
};

export const HomePage = ({ setIsFavoritePage, isFavoritePage }: Favorite) => {
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
  const [stripeError, setStripeError] = useState(null);

  const redirectToCheckout = async (priceId: string, plan: string) => {
    localStorage.setItem(
      "subscription",
      JSON.stringify({ plan, email: user.email })
    );
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/`,
    });
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

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
      {/*   <button
        type="submit"
        onClick={() =>
          redirectToCheckout("price_1NqVRtJvPcU6RzVuwOF9WePe", "basic")
        }
      >
        Basic
      </button>
      <button
        type="submit"
        onClick={() =>
          redirectToCheckout("price_1NqE5XJvPcU6RzVuLkceV50c", "premium")
        }
      >
        Premium
      </button> */}

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
      {pokemonData && modal && (
        <PokemonModal setModal={setModal} pokemonData={pokemonData} />
      )}
      {authModal && <AuthModal setModal={setAuthModal} />}
    </>
  );
};
