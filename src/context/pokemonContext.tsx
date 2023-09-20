import React, { createContext, useState } from "react";
import { Pokemon } from "../types/Pokemon";
export const PokemonContext = createContext(null);

interface Props {
  children: React.ReactNode;
}

const PokemonProvider: React.FC<Props> = ({ children }) => {
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonAmount, setPokemonAmount] = useState(21);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [showPagination, setShowPagination] = useState(true);
  const [disabledButton, setDisabledButton] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [favorites, setFavorites] = useState<any>([]);
  return (
    <PokemonContext.Provider
      value={{
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
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
