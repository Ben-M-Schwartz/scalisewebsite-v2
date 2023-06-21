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
        <span className="self-center whitespace-nowrap text-2xl font-semibold tracking-widest  text-red-800 md:text-4xl">
          SCALISE
        </span>
      </Link>
    </div>
  );
}

export function CartLink() {
  const [enabled, setEnabled] = useState(hasCookie("cart_id"));
  const { cartAmount, updateAmount } = useContext<CartContextType>(CartContext);

  hasCookie("cart_id")
    ? api.cart.getCartAmount.useQuery(
        {
          //eslint-disable-next-line
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
    : api.cart.getCartAmount.useQuery(
        {
          //eslint-disable-next-line
          id: "none",
        },
        {
          enabled: false,
        }
      );

  return (
    <Link
      href="/Cart"
      className="hover: ext-stone-950 z-10 block  rounded hover:text-red-800 md:p-0"
    >
      <motion.div
        className="flex items-center justify-center align-middle"
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <CartIcon />
        <p>{cartAmount || 0}</p>
      </motion.div>
    </Link>
  );
}

export function PageLinks() {
  const router = useRouter();
  return (
    <motion.ul
      variants={list_variants}
      className="absolute left-0 top-24 flex w-full flex-col justify-center gap-8 overflow-hidden rounded-lg text-center font-medium md:relative md:left-0 md:top-0 md:mt-0 md:flex-row md:gap-2 md:border-0 md:p-4 lg:gap-5"
    >
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/Music"
          className={
            "block rounded py-2 text-stone-950 hover:bg-stone-200 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          }
        >
          <p
            className={
              router.pathname === "/Music" ? "underline underline-offset-8" : ""
            }
          >
            MUSIC
          </p>
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
            "hover: block rounded py-2 text-stone-950 hover:bg-stone-200 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          }
        >
          <p
            className={
              router.pathname === "/Shows" ? "underline underline-offset-8" : ""
            }
          >
            SHOWS
          </p>
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
            "hover: block rounded py-2 text-stone-950 hover:bg-stone-200 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          }
        >
          <p
            className={
              router.pathname === "/Videos"
                ? "underline underline-offset-8"
                : ""
            }
          >
            VIDEOS
          </p>
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
            "hover: block rounded py-2 text-stone-950 hover:bg-stone-200 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          }
        >
          <p
            className={
              router.pathname === "/Store" ? "underline underline-offset-8" : ""
            }
          >
            STORE
          </p>
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
            "hover: block rounded py-2 text-stone-950 hover:bg-stone-200 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          }
        >
          <p
            className={
              router.pathname === "/Contact"
                ? "underline underline-offset-8"
                : ""
            }
          >
            CONTACT
          </p>
        </Link>
      </motion.li>
    </motion.ul>
  );
}

export function SocialLinks() {
  return (
    <motion.ul
      variants={list_variants}
      className="tranform absolute top-96 flex w-full justify-center space-x-3 max-md:translate-y-24 md:relative md:right-0 md:top-0 md:flex-row md:space-x-2 md:border-0 lg:space-x-4 xl:space-x-6"
    >
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1.1 }}
      >
        <label htmlFor="spotify-link" className="invisible absolute">
          Scalise Spotify Link
        </label>
        <Link
          href="https://open.spotify.com/artist/1p2Ey5OjAPtcfhzmwlfIPZ?si=E5OkbxepRJSOZ1Zq7eeiKg"
          className="hover: y-2 block rounded pl-3  pr-4 text-stone-950 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          rel="noopener noreferrer"
          target="_blank"
          id="spotify-link"
        >
          <SpotifyIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1.1 }}
      >
        <label htmlFor="applemusic-link" className="invisible absolute">
          Scalise Apple Music Link
        </label>
        <Link
          href="https://music.apple.com/us/artist/scalise/1529031635"
          className="hover: y-2 block rounded  pl-3  pr-4 text-stone-950 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          rel="noopener noreferrer"
          target="_blank"
          id="applemusic-link"
        >
          <AppleMusicIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1.1 }}
      >
        <label htmlFor="twitter-link" className="invisible absolute">
          Scalise Twitter Link
        </label>
        <Link
          href="https://twitter.com/ScaliseTheBand"
          className="hover: y-2 block rounded pl-3  pr-4 text-stone-950 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          rel="noopener noreferrer"
          target="_blank"
          id="twitter-link"
        >
          <TwitterIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1.1 }}
      >
        <label htmlFor="facebook-link" className="invisible absolute">
          Scalise Facebook Link
        </label>
        <Link
          href="https://www.facebook.com/ScaliseTheBand"
          className="hover: y-2 block rounded pl-3  pr-4 text-stone-950 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          rel="noopener noreferrer"
          target="_blank"
          id="facebook-link"
        >
          <FacebookIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1.1 }}
      >
        <label htmlFor="instagram-link" className="invisible absolute">
          Scalise Instagram Link
        </label>
        <Link
          href="https://www.instagram.com/ScaliseTheBand/"
          className="hover: y-2 block rounded pl-3  pr-4 text-stone-950 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          rel="noopener noreferrer"
          target="_blank"
          id="instagram-link"
        >
          <InstagramIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1.1 }}
      >
        <label htmlFor="tiktok-link" className="invisible absolute">
          Scalise TikTok Link
        </label>
        <Link
          href="https://www.tiktok.com/@scaliseband"
          className="hover: y-2 block rounded pl-3  pr-4 text-stone-950 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          rel="noopener noreferrer"
          target="_blank"
          id="tiktok-link"
        >
          <TikTokIcon />
        </Link>
      </motion.li>
      <motion.li
        variants={item_variants}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1.1 }}
      >
        <label htmlFor="youtube-link" className="invisible absolute">
          Scalise Youtube Link
        </label>
        <Link
          href="https://www.youtube.com/channel/UCWBsxAAhmKP1nRHWQQ5N0Qg"
          className="hover: y-2 block rounded pl-3  pr-4 text-stone-950 hover:text-red-800 md:p-0 md:hover:bg-transparent"
          rel="noopener noreferrer"
          target="_blank"
          id="youtube-link"
        >
          <YoutubeIcon />
        </Link>
      </motion.li>
    </motion.ul>
  );
}
