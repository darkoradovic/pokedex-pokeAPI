import { useState } from "react";
import { logInWithEmailAndPassword } from "../../api/firebase/firebase";
import { useKeyDownHook, useKeyDownHookAuth } from "../../hooks/useKeyPress";

type LoginProps = {
  setAuthType: (value: string) => void;
  setModal: (value: boolean) => void;
};

export const Login = ({ setAuthType, setModal }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //useKeyDownHookAuth(() => login());

  const login = () => {
    if (!email) alert("Error");
    logInWithEmailAndPassword(email, password, setModal, setError);
  };

  return (
    <div className="login">
      {error !== "" && (
        <p
          style={{
            textAlign: "center",
            textDecoration: "underline",
            marginBottom: "20px",
          }}
        >
          {error}!
        </p>
      )}
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="login__btn" onClick={() => login()}>
          Login
        </button>
        {/*  <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button> */}
        <div>
          <button className="forgot_password">Forgot Password?</button>
        </div>
        <div className="register__switch">
          <p>Don't have an account?</p>
          <p>
            <span onClick={() => setAuthType("register")}>Register</span> now.
          </p>
        </div>
      </div>
    </div>
  );
};
