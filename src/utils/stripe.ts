/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Stripe } from "stripe";

/* export const stripe = Stripe(process.env.STRIPE_SECRET_KEY!, {
  // This uses a native `fetch` now so it can work outside Node
  httpClient: Stripe.createFetchHttpClient(),
}); */

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "stripe-samples/checkout-one-time-payments",
    version: "0.0.1",
    url: "https://github.com/stripe-samples/checkout-one-time-payments",
  },
});
