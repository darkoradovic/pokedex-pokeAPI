import { useState } from "react";
import { registerWithEmailAndPassword } from "../../api/firebase/firebase";

type RegisterProps = {
  setAuthType: (value: string) => void;
  setModal: (value: boolean) => void;
};

export const Register = ({ setAuthType, setModal }: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password, setModal, setError);
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
