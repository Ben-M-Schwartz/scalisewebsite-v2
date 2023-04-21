import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";

import { NavBar } from "~/components/NavBar";
import SubscribeForm from "~/components/SubscribeForm";

export const config = {
  runtime: "experimental-edge",
};

/*
TODO: Keep track of items in cart not checkout
TODO: Set 30 minute timeout on carts
TODO: Cart is a dynamic pop up
TODO: Cart does all local changes in state and only updates to the database when checking out or closing the cart
TODO  Smooth transitions between pages
TODO: Smooth transitions between product pages with a slider/navbar with product images
*/

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NavBar />
      <Component {...pageProps} />
      <SubscribeForm />
      <Analytics />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
