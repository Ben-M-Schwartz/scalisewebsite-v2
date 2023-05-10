import { motion, useCycle } from "framer-motion";
import { PageLinks, SocialLinks, CartLink, HomeLink } from "./navItems";
import { MenuToggle } from "./menuToggle";
import { MenuBackground } from "./menuBackground";
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
    closeMenu();
    if (!isHidden) {
      setTimeout(() => toggleHidden(), 1000);
    }
  }, [router.asPath]);

  return (
    <nav className="max-w-screen sticky left-0 top-0 z-20 w-full overflow-hidden border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex flex-wrap items-center justify-between p-4">
        <div className="flex flex-row items-center justify-center align-middle">
          <div className="z-10 sm:pl-4 lg:pl-6">
            <HomeLink />
          </div>
          <div
            className="hidden w-full items-center justify-start text-center md:order-1 md:flex md:w-auto md:pl-4 lg:pl-6 xl:pl-12"
            id="page-links"
          >
            <PageLinks />
          </div>
        </div>
        <div className="flex flex-row align-middle md:order-2">
          <div className="flex flex-row items-center justify-center">
            <div className="z-10 order-1 scale-150 pl-6 pr-4 md:pl-8 md:pr-4 lg:pl-16 lg:pr-6 xl:pl-20 xl:pr-12">
              <CartLink />
            </div>
            <div className="hidden w-full md:flex md:w-auto" id="social_links">
              <SocialLinks />
            </div>
          </div>
          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="flex align-middle md:hidden"
          >
            <div
              className={`${isHidden ? "hidden" : "block"} z-0 h-full w-full`}
            >
              <MenuBackground />
            </div>

            <MenuToggle
              toggle={() => {
                isHidden
                  ? toggleHidden()
                  : setTimeout(() => toggleHidden(), 1000);
                toggleOpen();
              }}
            />
          </motion.nav>
        </div>
        <motion.nav
          className="absolute left-0 top-0 h-full w-full md:hidden"
          initial={false}
          animate={isOpen ? "open" : "closed"}
        >
          <div className={`${isHidden ? "hidden" : "block"} h-screen w-full`}>
            <PageLinks />
            <SocialLinks />
          </div>
        </motion.nav>
      </div>
    </nav>
  );
}
