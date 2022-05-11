import { loadStripe } from "@stripe/stripe-js";

// 1st param - publish key
export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);
