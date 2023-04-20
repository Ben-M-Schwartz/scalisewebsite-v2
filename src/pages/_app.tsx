import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import{ Analytics } from '@vercel/analytics/react';
import { api } from "~/utils/api";
import "~/styles/globals.css";

import { NavBar } from '~/components/NavBar'
import SubscribeForm from '~/components/SubscribeForm'

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

