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

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

//TODO: Test out different email senders
//TODO: Set up email templating for mailing list
//TODO: Figure out why clerk isn't loadign on vercel deployment

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <ClerkProvider {...pageProps}>
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
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <SubscribeForm />
      <Analytics />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
