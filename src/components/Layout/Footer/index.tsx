import { SocialMedia } from "../../SocialMedia";
import * as C from "./styles";

export const Footer = () => {
  return (
    <div className="main-container">
      <C.Container>
        <C.Copy>
          <span>Image rights @ Nintendo & The Pokémon Company</span>
          <span>Data API - pokeapi.co</span>
        </C.Copy>
        <SocialMedia />
      </C.Container>
    </div>
  );
};
