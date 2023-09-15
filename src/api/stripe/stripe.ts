import { loadStripe } from "@stripe/stripe-js";

let stripePromise: any;

export  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_test_51NqE23JvPcU6RzVuFuVkKVdRxxpAnGnCWoVQOJYY84brWxsPekeQIuXZduJGadS0tpMH0OFILXpdjxJ1NYiToRfl00GGPwcdEZ"
      );
    }

    return stripePromise;
  };