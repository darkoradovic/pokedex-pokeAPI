import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

type StripeProps = {
  setAuthType: (value: string) => void;
};

export const Stripe = ({ setAuthType }: StripeProps) => {
  useEffect(() => {
    setAuthType("stripe");
  }, []);
  return (
    <div className="login">
      <p>You exceeded the favorites limit of 20 pokemons for our Free Plan.</p>
      <p>
        To continue adding favorite pokemons, subscribe to one of our plans.
      </p>
      <Link to="/profile">
        <Button className="subsribe" variant="outlined">
          Subscribe
        </Button>
      </Link>
    </div>
  );
};
