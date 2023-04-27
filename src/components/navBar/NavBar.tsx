import { motion, useCycle } from "framer-motion";
import { PageLinks, SocialLinks, CartLink, HomeLink } from "./navItems";
import { MenuToggle } from "./menuToggle";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

export function NavBar() {
  const [isHidden, toggleHidden] = useCycle(true, false);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const router = useRouter();

  const closeMenu = () => {
    if (isOpen) {
      toggleOpen();
    }
  };

  /*eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (!isHidden) {
      setTimeout(() => toggleHidden(), 400);
    }
    closeMenu();
  }, [router.asPath]);

  return (
    <nav className="sticky left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <HomeLink />
        <div className="flex items-center justify-center align-middle md:order-2">
          <CartLink />
          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="flex align-middle md:hidden"
          >
            <MenuToggle
              toggle={() => {
                isHidden
                  ? toggleHidden()
                  : setTimeout(() => toggleHidden(), 400);
                toggleOpen();
              }}
            />
          </motion.nav>
        </div>
        <motion.nav
          className="absolute left-0 w-full md:hidden"
          initial={false}
          animate={isOpen ? "open" : "closed"}
        >
          <div
            className={`${
              isHidden ? "hidden" : "block"
            } h-full w-full bg-black`}
          >
            <PageLinks />
            <SocialLinks />
          </div>
        </motion.nav>
        <div
          className="hidden w-full items-center justify-between text-center md:order-1 md:flex md:w-auto"
          id="page-links"
        >
          <PageLinks />
        </div>
        <div
          className="hidden w-full md:order-1 md:flex md:w-auto"
          id="social_links"
        >
          <SocialLinks />
        </div>
      </div>
    </nav>
  );
}
