import type { AppType } from "next/app";
import Head from "next/head";
/* import type { Session } from "next-auth"; */
/* import { SessionProvider } from "next-auth/react"; */
//import { Analytics } from "@vercel/analytics/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import { NavBar } from "~/components/navBar/NavBar";
import SubscribeForm from "~/components/SubscribeForm";

import { useState, createContext } from "react";

//export { reportWebVitals } from 'next-axiom';

export type CartContextType = {
  cartAmount: number;
  updateAmount: (amount: number) => void;
};
export const CartContext = createContext<CartContextType>({
  cartAmount: 0,
  updateAmount: () => {
    return;
  },
});

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

//TODO: Update robots.txt

const MyApp: AppType = ({ Component, pageProps }) => {
  const [cartAmount, setCartAmount] = useState(0);
  const updateAmount = (amount: number) => setCartAmount(cartAmount + amount);

  const router = useRouter();
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <meta name="description" content="Band Webpage for Scalise The Band" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/apple-touch-icon.png"
        />
      </Head>
      <CartContext.Provider
        value={{ cartAmount: cartAmount, updateAmount: updateAmount }}
      >
        <NavBar />
        <AnimatePresence mode="wait">
          {/* motion just here as a placeholder for now */}
          <motion.div
            key={router.route}
            initial="initialState"
            animate="animateState"
            exit="exitState"
            transition={{
              duration: 0,
            }}
            variants={{
              initialState: {
                opacity: 1,
                //clipPath: "polygon(100%, 0, 100%, 0, 100%, 100%, 100%, 100%)",
              },
              animateState: {
                opacity: 1,
                //clipPath: "polygon(0, 0, 100%, 0, 100%, 100%, 0, 100%)",
              },
              exitState: {
                opacity: 1,
                //clipPath: "polygon(0, 0, 0, 0, 0, 100%, 0, 100%)",
              },
            }}
          >
            <Component
              {...pageProps}
              updateAmount={(amount: number) =>
                setCartAmount(cartAmount + amount)
              }
            />
          </motion.div>
        </AnimatePresence>
      </CartContext.Provider>
      <SubscribeForm />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
