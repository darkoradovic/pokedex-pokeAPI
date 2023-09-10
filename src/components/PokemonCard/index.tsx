import { PokemonType } from "../PokemonType";
import * as C from "./styles";
import { ReactComponent as WeightIcon } from "../../assets/icon-weight.svg";
import { ReactComponent as RulerIcon } from "../../assets/icon-ruler.svg";
import { ReactComponent as BoltIcon } from "../../assets/icon-bolt.svg";
import { ReactComponent as HeartIcon } from "../../assets/icon-heart.svg";
import { ReactComponent as HeartIconFull } from "../../assets/icon-heart-full.svg";
import { Pokemon } from "../../types/Pokemon";
import { pokemonTypes } from "../../pokemonTypes";
import { fetchPokemon } from "../../api/fetchPokemon";
import { SkeletonLoading } from "../helper/SkeletonLoading";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addToFavorites,
  auth,
  removeFavorites,
} from "../../api/firebase/firebase";

type PokemonCardProps = {
  pokemon: Pokemon;
  setModal: (value: boolean) => void;
  setPokemonData: (data: Pokemon) => void;
  setAuthModal: (value: boolean) => void;
  favorites: number[];
  setFavorites: (value: number[]) => void;
};

export const PokemonCard = (props: PokemonCardProps) => {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${props.pokemon.id}.png`;
  const [user] = useAuthState(auth);

  const filteredFavorites = props.favorites?.filter(
    (item, index) => props.favorites.indexOf(item) === index
  );

  const [{ color }] = pokemonTypes.filter(
    (type) => props.pokemon.types[0].type.name.indexOf(type.name) !== -1
  );

  const handleClick = async () => {
    const requestPokemon = await fetchPokemon(props.pokemon.name);
    props.setPokemonData(requestPokemon.data);
    props.setModal(true);
  };

  const handleFavorite = async (id: number) => {
    if (!user) {
      props.setAuthModal(true);
    } else {
      addToFavorites(user.email, id, props.setFavorites);
    }
  };

  const formatPokemonId = (id: number) => {
    if (id < 10) return `#00${id}`;
    else if (id >= 10 && id < 99) return `#0${id}`;
    else return `#${id}`;
  };

  return (
    <C.Container>
      <C.CardOverlay color={color} />
      <C.PokemonImg>
        <SkeletonLoading src={imgUrl} alt={props.pokemon.name} />
      </C.PokemonImg>
      <C.PokemonNumber>{formatPokemonId(props.pokemon.id)}</C.PokemonNumber>
      <C.PokemonName>{props.pokemon.name}</C.PokemonName>
      <C.PokemonType>
        {props.pokemon.types.map(({ type }) => (
          <PokemonType key={type.name} type={type.name} tabIndex={false} />
        ))}
      </C.PokemonType>
      <C.PokemonFeatures>
        <C.PokemonWeight>
          <div>
            <WeightIcon />
            <span>{`${props.pokemon.weight / 10}`} kg</span>
          </div>
          <span>Weight</span>
        </C.PokemonWeight>
        <C.PokemonHeight>
          <div>
            <RulerIcon />
            <span>{`${props.pokemon.height / 10}`} m</span>
          </div>
          <span>Height</span>
        </C.PokemonHeight>
      </C.PokemonFeatures>
      <C.CardFooter>
        <C.MoreDetailsButton
          color={color}
          onClick={handleClick}
          footerType="details"
        >
          <BoltIcon />
          More details
        </C.MoreDetailsButton>
        {user && filteredFavorites?.includes(props.pokemon.id) ? (
          <C.MoreDetailsButton
            color={color}
            onClick={() =>
              removeFavorites(user.email, props.pokemon.id, props.setFavorites)
            }
            footerType="favorite"
          >
            <HeartIconFull />
          </C.MoreDetailsButton>
        ) : (
          <C.MoreDetailsButton
            color={color}
            onClick={() => handleFavorite(props.pokemon.id)}
            footerType="favorite"
          >
            <HeartIcon />
          </C.MoreDetailsButton>
        )}
      </C.CardFooter>
    </C.Container>
  );
};
