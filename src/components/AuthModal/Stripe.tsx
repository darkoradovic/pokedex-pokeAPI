import * as C from "./styles";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type StripeProps = {
  setAuthType?: (value: string) => void;
  setStripeModal: (value: boolean) => void;
};

export const StripeModal = ({ setAuthType, setStripeModal }: StripeProps) => {
  const [limit, setLimit] = useState(20);
  const [plan, setPlan] = useState("Free");

  useEffect(() => {
    const subscription = JSON.parse(localStorage.getItem("subscription"));
    setPlan(subscription?.plan);
    setLimit(subscription?.limit);
  }, []);
  return (
    <C.Wrapper
      onClick={(e) => e.target === e.currentTarget && setStripeModal(false)}
    >
      <C.Modal>
        <div className="login">
          <p>
            You exceeded the favorites limit of {limit} pokemons for our {plan}{" "}
            Plan.
          </p>
          <p>
            To continue adding more favorite pokemons, subscribe to our{" "}
            {plan === "free" ? "Basic" : plan === "basic" && "Premium"} plan.
          </p>
          <Link to="/profile">
            <Button className="subsribe" variant="outlined">
              Subscribe
            </Button>
          </Link>
        </div>
      </C.Modal>
    </C.Wrapper>
  );
};
