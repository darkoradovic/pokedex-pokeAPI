import * as C from "./styles";
import { ReactComponent as BoltIcon } from "../../assets/icon-bolt.svg";
import { ReactComponent as DividerIcon } from "../../assets/divider-fire.svg";
import { Waves } from "../Waves";
import { PokemonType } from "../PokemonType";
import { Header } from "../Layout/Header";
import { fetchPokemon, fetchPokemonDescription } from "../../api/fetchPokemon";
import imgSrc from "../../assets/img-charizard-min.png";
import { Pokemon } from "../../types/Pokemon";
import { useEffect, useState } from "react";
import { Loading } from "../helper/Loading";

type HeroSectionProps = {
  setModal: (value: boolean) => void;
  setPokemonData: (data: Pokemon) => void;
  setLoading: (event: boolean) => void;
  loading: boolean;
};

export const HeroSection = ({
  setModal,
  setPokemonData,
  setLoading,
  loading,
}: HeroSectionProps) => {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon>();
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      setLoading(true);
      const { data } = await fetchPokemon(
        Math.floor(Math.random() * 1000).toString()
      );
      setRandomPokemon(data);
      const { data: descriptionData } = await fetchPokemonDescription(
        data.id.toString()
      );
      const filteredEnglish = descriptionData?.flavor_text_entries.filter(
        (desc: any) => {
          if (desc.language.name === "en") {
            return desc;
          }
        }
      );
      setDescription(filteredEnglish[0].flavor_text);
      setLoading(false);
    };

    fetchRandomPokemon();
  }, []);

  const handleClick = async () => {
    setPokemonData(randomPokemon);
    setModal(true);
  };

  const imgUrl = new URL(
    `/src/assets/pokemonTypes/${randomPokemon?.types[0].type.name}.svg`,
    import.meta.url
  ).href;

  return (
    <C.Container type={randomPokemon?.types[0].type.name}>
      <Header />
      {loading ? (
        <div className="main-container-loading">
          <Loading />
        </div>
      ) : (
        <div className="main-container">
          <C.Content>
            <C.CharizardData>
              <C.CharizardNumber>#{randomPokemon?.id}</C.CharizardNumber>
              <C.CharizardTypes>
                <PokemonType
                  type={
                    randomPokemon?.types
                      ? randomPokemon?.types[0].type.name
                      : "fire"
                  }
                  tabIndex={false}
                />
              </C.CharizardTypes>
              <C.CharizardName>{randomPokemon?.name}</C.CharizardName>
              <C.CharizardDescription>{description}</C.CharizardDescription>
              <C.MoreDetailsButton
                onClick={handleClick}
                buttonType={randomPokemon?.types[0].type.name}
              >
                <BoltIcon />
                <p> More Details</p>
              </C.MoreDetailsButton>
            </C.CharizardData>

            <C.Divider>
              <img src={imgUrl} alt="type_icon" height={56} width={56} />
            </C.Divider>

            <C.CharizardImg>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${randomPokemon?.id}.png`}
                alt="Imagem do Charizard"
              />
            </C.CharizardImg>
          </C.Content>
        </div>
      )}

      <Waves />
    </C.Container>
  );
};
