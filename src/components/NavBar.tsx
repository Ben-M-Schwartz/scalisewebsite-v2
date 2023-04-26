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
} from "./icons";
import { useState } from "react";
import { useRouter } from "next/router";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

export function NavBar() {
  const [isOpen, setOpen] = useState(false);
  const line = `h-1 w-6 my-1 rounded-full bg-gray-200 transition ease transform duration-300`;
  const router = useRouter();

  return (
    <nav className="sticky left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="items-center">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Scalise
          </span>
        </Link>
        <div className="flex md:order-2">
          <div className="flex items-center justify-center">
            <Link
              href="/Cart"
              className="block rounded py-4 pl-3 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
            >
              <CartIcon />
            </Link>
            <p className="py-3 pr-4 text-white">0</p>
          </div>
          <button
            className="group flex h-12 w-12 flex-col items-center justify-center rounded md:hidden"
            onClick={() => setOpen(!isOpen)}
          >
            <div
              className={`${line} ${
                isOpen
                  ? "translate-y-3 rotate-45 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
            <div
              className={`${line} ${
                isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
              }`}
            />
            <div
              className={`${line} ${
                isOpen
                  ? "-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full items-center justify-between text-center md:order-1 md:flex md:w-auto`}
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-4 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <li>
              <Link
                href="/Music"
                className={
                  (router.pathname === "/Music"
                    ? "underline underline-offset-8"
                    : "") +
                  "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                }
              >
                Music
              </Link>
            </li>
            <li>
              <Link
                href="/Shows"
                className={
                  (router.pathname === "/Shows"
                    ? "underline underline-offset-8"
                    : "") +
                  "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                }
              >
                Shows
              </Link>
            </li>
            <li>
              <Link
                href="/Videos"
                className={
                  (router.pathname === "/Videos"
                    ? "underline underline-offset-8"
                    : "") +
                  "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                }
              >
                Videos
              </Link>
            </li>
            <li>
              <Link
                href="/Store"
                className={
                  (router.pathname === "/Store"
                    ? "underline underline-offset-8"
                    : "") +
                  "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                }
              >
                Store
              </Link>
            </li>
            <li>
              <Link
                href="/Contact"
                className={
                  (router.pathname === "/Contact"
                    ? "underline underline-offset-8"
                    : "") +
                  "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                }
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:order-1 md:flex md:w-auto`}
          id="social_links"
        >
          <ul className="flex justify-center md:flex-row md:space-x-4 md:border-0">
            <li>
              <Link
                href="https://open.spotify.com/artist/1p2Ey5OjAPtcfhzmwlfIPZ?si=E5OkbxepRJSOZ1Zq7eeiKg"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
              >
                <SpotifyIcon />
              </Link>
            </li>
            <li>
              <Link
                href="https://music.apple.com/us/artist/scalise/1529031635"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
              >
                <AppleMusicIcon />
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/ScaliseTheBand"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
              >
                <TwitterIcon />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/ScaliseTheBand"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FacebookIcon />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/ScaliseTheBand/"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
              >
                <InstagramIcon />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.tiktok.com/@scaliseband"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
              >
                <TikTokIcon />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.youtube.com/channel/UCWBsxAAhmKP1nRHWQQ5N0Qg"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
              >
                <YoutubeIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
