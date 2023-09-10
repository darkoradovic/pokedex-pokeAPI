import React from "react";
import { useState, useEffect } from "react";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../api/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

type RegisterProps = {
  setAuthType: (value: string) => void;
  setModal: (value: boolean) => void;
};

export const Register = ({ setAuthType, setModal }: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password).then(() =>
      setModal(false)
    );
  };
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
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
        <button className="login__btn" onClick={register}>
          Register
        </button>

        <div className="register__switch">
          <p> Already have an account?</p>
          <p>
            <span onClick={() => setAuthType("login")}>Login</span> now.
          </p>
        </div>
      </div>
    </div>
  );
};
