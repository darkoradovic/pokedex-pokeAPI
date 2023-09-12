import * as C from "./styles";
import { ReactComponent as PokemonLogo } from "/src/assets/logo-pokemon.svg";
import { SocialMedia } from "../../SocialMedia";
import { Link } from "react-router-dom";

type Props = {
  setAuthModal: (value: boolean) => void;
  isFavoritePage: boolean;
};

export const Header = ({ setAuthModal, isFavoritePage }: Props) => {
  return (
    <div className="main-container">
      <C.Container isFavoritePage={isFavoritePage}>
        <Link to="/">
          <PokemonLogo />
        </Link>
        <SocialMedia header setAuthModal={setAuthModal} />
      </C.Container>
    </div>
  );
};
