import type { AppType } from "next/app";
/* import type { Session } from "next-auth"; */
/* import { SessionProvider } from "next-auth/react"; */
import { Analytics } from "@vercel/analytics/react";
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

//TODO: Add robots.txt, clinetaccesspolicy.xml, contribute.json, crossdomain.xml

const MyApp: AppType = ({ Component, pageProps }) => {
  const [cartAmount, setCartAmount] = useState(0);
  const updateAmount = (amount: number) => setCartAmount(cartAmount + amount);

  const router = useRouter();
  return (
    <ClerkProvider {...pageProps}>
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
      <Analytics />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
