import * as C from "./styles";
import { Login } from "./Login";
import { useState } from "react";
import { Register } from "./Register";

type PokemonModalProps = {
  setModal: (value: boolean) => void;
};

type AuthTypeProps = {
  a: "login" | "register" | "forgot_password";
};

export const AuthModal = ({ setModal }: PokemonModalProps) => {
  const [authType, setAuthType] = useState("login");

  return (
    <C.Wrapper onClick={(e) => e.target === e.currentTarget && setModal(false)}>
      <C.Modal>
        {authType === "login" ? (
          <Login setAuthType={setAuthType} setModal={setModal} />
        ) : authType === "register" ? (
          <Register setAuthType={setAuthType} setModal={setModal} />
        ) : (
          <Login setAuthType={setAuthType} setModal={setModal} />
        )}
      </C.Modal>
    </C.Wrapper>
  );
};
