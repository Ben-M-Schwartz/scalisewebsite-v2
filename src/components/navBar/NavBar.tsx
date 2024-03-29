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
    <main className="max-w-screen sticky left-0 top-0 z-20 w-full border-b bg-stone-100">
      <nav>
        <div className="mx-auto flex flex-wrap items-center justify-between p-4 md:px-12 md:py-4 lg:px-0 xl:px-2 xl:py-5">
          <div className="flex flex-row items-center justify-center align-middle">
            <div className="z-10 md:pl-2 lg:pl-2">
              <HomeLink />
            </div>
            <div
              className="hidden w-full items-center justify-start text-center md:pl-2 lg:order-1 lg:flex lg:w-auto lg:pl-6 xl:pl-12"
              id="page-links"
            >
              <PageLinks />
            </div>
          </div>
          <div className="flex flex-row align-middle md:order-2">
            <div className="flex flex-row items-center justify-center">
              <div className="pml-6 z-10 order-1 mr-4 scale-150 md:ml-8 md:mr-4 lg:ml-16 lg:mr-6 xl:ml-20 xl:mr-4">
                <CartLink />
              </div>
              <div
                className="hidden w-full lg:flex lg:w-auto"
                id="social_links"
              >
                <SocialLinks />
              </div>
            </div>
            <motion.nav
              initial={false}
              animate={isOpen ? "open" : "closed"}
              className="flex align-middle lg:hidden"
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
            className="absolute left-0 top-0 h-full w-full lg:hidden"
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
    </main>
  );
}
