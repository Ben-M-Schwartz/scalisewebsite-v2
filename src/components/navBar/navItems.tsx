import Link from "next/link";
import {
  SpotifyIcon,
  AppleMusicIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YoutubeIcon,
  CartIcon,
} from "../icons";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { api } from "~/utils/api";
import { getCookie, hasCookie } from "cookies-next";
import { useState, useContext } from "react";
import { CartContext, type CartContextType } from "~/pages/_app";

const item_variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const list_variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export function HomeLink() {
  return (
    <div className="z-10">
      <Link href="/" className="items-center">
        <motion.div
          variants={item_variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Scalise
          </span>
        </motion.div>
      </Link>
    </div>
  );
}

export function CartLink() {
  const [enabled, setEnabled] = useState(true);
  const { cartAmount, updateAmount } = useContext<CartContextType>(CartContext);

  hasCookie("cart_id")
    ? api.cart.getCartAmount.useQuery(
        {
          id: getCookie("cart_id")!.toString(),
        },
        {
          onSuccess: (data) => {
            updateAmount(data);
            setEnabled(false);
          },
          enabled: enabled,
        }
      )
    : 0;

  return (
    <Link
      href="/Cart"
      className="z-10 block rounded text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
    >
      <motion.div
        className="flex items-center justify-center align-middle"
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <CartIcon />
        <p className="pr-4 text-white">{cartAmount || 0}</p>
      </motion.div>
    </Link>
  );
}

export function PageLinks() {
  const router = useRouter();
  return (
    <motion.ul
      variants={list_variants}
      className="absolute left-0 top-24 flex w-full flex-col justify-center gap-5 overflow-hidden rounded-lg text-center font-medium md:relative md:left-0 md:top-0 md:mt-0 md:flex-row md:border-0 md:p-4"
    >
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/Music"
          className={
            (router.pathname === "/Music"
              ? "font-bold underline underline-offset-8"
              : "") +
            "block rounded py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          }
        >
          Music
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/Shows"
          className={
            (router.pathname === "/Shows"
              ? "font-bold underline underline-offset-8"
              : "") +
            "block rounded py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          }
        >
          Shows
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/Videos"
          className={
            (router.pathname === "/Videos"
              ? "font-bold underline underline-offset-8"
              : "") +
            "block rounded py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          }
        >
          Videos
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/Store"
          className={
            (router.pathname === "/Store"
              ? "font-bold underline underline-offset-8"
              : "") +
            "block rounded py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          }
        >
          Store
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/Contact"
          className={
            (router.pathname === "/Contact"
              ? "font-bold underline underline-offset-8"
              : "") +
            "block rounded py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          }
        >
          Contact
        </Link>
      </motion.li>
    </motion.ul>
  );
}

export function SocialLinks() {
  return (
    <motion.ul
      variants={list_variants}
      className="absolute top-96 flex w-full justify-center md:relative md:right-0 md:top-0 md:flex-row md:space-x-4 md:border-0"
    >
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="https://open.spotify.com/artist/1p2Ey5OjAPtcfhzmwlfIPZ?si=E5OkbxepRJSOZ1Zq7eeiKg"
          className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SpotifyIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="https://music.apple.com/us/artist/scalise/1529031635"
          className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          <AppleMusicIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="https://twitter.com/ScaliseTheBand"
          className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TwitterIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="https://www.facebook.com/ScaliseTheBand"
          className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FacebookIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="https://www.instagram.com/ScaliseTheBand/"
          className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          <InstagramIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="https://www.tiktok.com/@scaliseband"
          className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TikTokIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="https://www.youtube.com/channel/UCWBsxAAhmKP1nRHWQQ5N0Qg"
          className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          <YoutubeIcon />
        </Link>
      </motion.li>
    </motion.ul>
  );
}
