import { useEffect, useState } from "react";
import * as C from "./styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../api/firebase/firebase";
import { getStripe } from "../../api/stripe/stripe";

export const Subscriptions = () => {
  const [user] = useAuthState(auth);
  const [stripeError, setStripeError] = useState(null);
  const [stripeModal, setStripeModal] = useState(false);

  const plan = JSON.parse(localStorage.getItem("user")).subscription;

  const redirectToCheckout = async (
    priceId: string,
    plan: string,
    limit: number
  ) => {
    localStorage.setItem(
      "subscription",
      JSON.stringify({ plan, email: user.email, limit: limit })
    );
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/`,
    });
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
  };

  if (stripeError) alert(stripeError);
  return (
    <C.Container>
      <ul className="plans">
        <li className="plan highlight">
          <div>
            <span className="price price-green">0€</span>

            <div className="details">
              <h1 className="plan-title">Free</h1>
              <p className="plan-description">20 favorite Pokemons</p>
            </div>
          </div>

          <button className="btn select" disabled>
            Default on register
          </button>
        </li>

        <li className="plan highlight">
          <div>
            <span className="price price-green">0€</span>

            <div className="details">
              <h1 className="plan-title">Basic</h1>
              <p className="plan-description">50 favorite Pokemons</p>
            </div>
          </div>

          <button
            disabled={plan === "basic"}
            className="btn select"
            type="submit"
            onClick={() =>
              redirectToCheckout("price_1NqVRtJvPcU6RzVuwOF9WePe", "basic", 50)
            }
          >
            {plan === "basic" ? "Subscribed" : "Select plan"}
          </button>
        </li>

        <li className="plan">
          <div>
            <span className="price price-red">10€</span>

            <div className="details">
              <h1 className="plan-title">Premium</h1>
              <p className="plan-description">Unlimited favorite Pokemons</p>
            </div>
          </div>

          <button
            disabled={plan === "premium"}
            className="btn select"
            type="submit"
            onClick={() =>
              redirectToCheckout(
                "price_1NrKANJvPcU6RzVuP9Weiwt6",
                "premium",
                1000
              )
            }
          >
            {plan === "premium" ? "Subscribed" : "Select plan"}
          </button>
        </li>
      </ul>
    </C.Container>
  );
};
