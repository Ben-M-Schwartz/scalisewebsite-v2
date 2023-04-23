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
  regions: ["cle1"],
};

//TODO: Test out different email senders
//TODO: Set up email templating for mailing list
//TODO: Cart is a dynamic pop up
//TODO: Set up the edge runtime for stripe
//TODO  Smooth transitions between pages
//TODO: Smooth transitions between product pages with a slider/navbar with product images
//TODO: Develop the rest of the front end visuals and UI

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
