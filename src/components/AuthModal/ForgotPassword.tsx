import { useState } from "react";
import { logInWithEmailAndPassword, sendPasswordReset } from "../../api/firebase/firebase";

type LoginProps = {
  setAuthType: (value: string) => void;
  setModal: (value: boolean) => void;
};

export const ForgotPassword = ({ setAuthType, setModal }: LoginProps) => {
  const [email, setEmail] = useState("");

  const reset = () => {
    if (!email) alert("Error");
    sendPasswordReset(email, setModal);
  };

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button className="login__btn" onClick={() => reset()}>
          Reset password
        </button>
      </div>
    </div>
  );
};
