import type { AppType } from "next/app";
/* import type { Session } from "next-auth"; */
/* import { SessionProvider } from "next-auth/react"; */
import { Analytics } from "@vercel/analytics/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import { NavBar } from "~/components/navBar/NavBar";
import SubscribeForm from "~/components/SubscribeForm";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

//TODO: Test out different email senders
//TODO: Set up email templating for mailing list
//TODO  Smooth transitions between pages
//TODO: Smooth transitions between product pages with a slider/navbar with product images
//TODO: Develop the rest of the front end visuals and UI

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <ClerkProvider {...pageProps}>
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.5,
          }}
          variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {
              opacity: 1,
            },
            exitState: {
              opacity: 0,
            },
          }}
        >
          <Component {...pageProps} key={pathname} />
        </motion.div>
      </AnimatePresence>
      <SubscribeForm />
      <Analytics />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
