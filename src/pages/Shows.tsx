import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ShareIcon,
  LinkIcon,
  TwitterIcon,
  FacebookIcon,
  EmailIcon,
  BandsintownIcon,
  CheckIcon,
} from "~/components/icons";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import {
  TwitterShareButton,
  EmailShareButton,
  FacebookShareButton,
} from "next-share";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

//import { api } from "~/utils/api";

import banner from "../../public/2.webp";
import title from "../../public/Shows (Handwritten).webp";

import { db } from "~/db/db";
//import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

import { shows } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
type ShowType = InferModel<typeof shows, "select">;

const variants = {
  hidden: {
    opacity: 0,
    x: -30,
    y: -5,
    transition: {
      x: { stiffness: 1000 },
    },
    transitionEnd: {
      display: "none",
    },
  },
  shown: {
    opacity: 1,
    x: -70,
    y: -5,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
    display: "flex",
  },
};

const Show = ({ show }: { show: ShowType }) => {
  const [isHover, setHover] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [eventListen, setListen] = useState(false);
  useEffect(() => {
    document.addEventListener(
      "click",
      () => {
        if (eventListen) {
          setHover(false);
          setListen(false);
        }
      },
      { capture: true }
    );
  }, [eventListen]);
  return (
    <Link
      href={show.bandsintown_link as string}
      className="z-0 flex w-full flex-col items-center gap-2 hover:bg-stone-200 md:px-8"
    >
      <div className="flex w-full flex-col items-center justify-center gap-2 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="w-full sm:w-1/2 xl:w-2/3">
          <div className="font-bold text-stone-950">{show.date}</div>
          <div className="font-small text-stone-950">{show.location}</div>
          <div className="font-small text-stone-950 sm:order-2">
            {show.name}
          </div>
        </div>
        <div className="flex w-1/4 flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8 md:gap-20 xl:w-1/6">
          <motion.div
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            className="z-30 flex flex-row justify-center gap-3 object-contain text-stone-950 sm:translate-x-1 sm:flex-col"
          >
            <motion.div
              initial="hidden"
              animate={isHover ? "shown" : "hidden"}
              whileHover="shown"
              variants={variants}
              className="absolute left-1/2 z-40 flex flex-row gap-1 bg-gray-800 px-2 py-2 md:gap-3 lg:gap-4"
            >
              <TwitterShareButton
                url={show.bandsintown_link as string}
                title={"Check out this upcoming event from Scalise!"}
                blankTarget
              >
                <div className="rounde flex text-stone-100 hover:bg-transparent hover:text-red-800 md:p-0">
                  <TwitterIcon />
                </div>
              </TwitterShareButton>
              <FacebookShareButton
                url={show.bandsintown_link as string}
                quote={"Check out this upcoming event from Scalise!"}
                hashtag={"#music"}
                blankTarget
              >
                {" "}
                <div className="flex rounded text-stone-100 hover:bg-transparent hover:text-red-800 md:p-0">
                  <FacebookIcon />
                </div>
              </FacebookShareButton>
              <EmailShareButton
                url={show.bandsintown_link as string}
                subject={"Check out this upcoming event from Scalise!"}
                body=""
                blankTarget
              >
                <div className="flex rounded text-stone-100 hover:bg-transparent hover:text-red-800 md:p-0">
                  <EmailIcon />
                </div>
              </EmailShareButton>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard
                    .writeText(show.bandsintown_link as string)
                    .then(() => {
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 1000);
                    })
                    .catch((error) => console.error(error));
                }}
              >
                <div className="flex rounded text-white hover:bg-gray-100 hover:bg-transparent hover:text-red-800 md:p-0">
                  {!isCopied && <LinkIcon />}
                  {isCopied && (
                    <div className="animate-bounce animate-pulse text-green-400">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
            <button
              id="share"
              className="z-10 flex flex-row justify-center gap-2 bg-transparent px-10 py-4 focus:text-red-800"
              onClick={(e) => {
                e.preventDefault();
                setHover(true);
                setListen(true);
              }}
            >
              <ShareIcon />
            </button>
          </motion.div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 sm:w-1/4 sm:items-end sm:justify-end xl:w-1/6">
          <Link
            href={show.maps_link as string}
            rel="noopener noreferrer"
            target="_blank"
            className="w-1/2 rounded-sm border bg-red-800 py-2 text-center text-white hover:border-red-800 hover:bg-white hover:text-red-800 active:bg-gray-300 sm:w-full"
          >
            Directions
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            className="w-1/2 rounded-sm border bg-red-800 py-2 text-center text-white hover:border-red-800 hover:bg-white hover:text-red-800 active:bg-gray-300 sm:w-full"
            href={show.ticket_link as string}
          >
            Tickets
          </Link>
        </div>
      </div>
    </Link>
  );
};

/* export const getServerSideProps: GetServerSideProps = async () => {
  const result = await db.select().from(shows);

  return {
    props: {
      shows: result,
    },
  };
}; */

//Static props to avoid load times but revalidating shows once a day
export const getStaticProps: GetStaticProps = async () => {
  const result = await db.select().from(shows);

  return {
    props: {
      shows: result,
    },
    revalidate: 86400,
  };
};

const Shows: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  /*     const [loading, setLoading] = useState(true);
    const shows = api.shows.get.useQuery(undefined, {
      onSuccess: () => setLoading(false),
    }).data; */
  const [loaded, setLoaded] = useState(false);

  const shows = props.shows as ShowType[];
  return (
    <>
      <Head>
        <title>SHOWS-SCALISE</title>
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
      <main className="relative flex flex-col items-center bg-stone-950">
        <Image
          src={banner}
          alt="background photo"
          fill
          quality={100}
          //style={{ objectFit: "cover" }}
          className="absolute z-0 object-cover"
          priority
        />
        <div className="relative flex w-full items-center justify-center bg-transparent">
          <Image
            src={title}
            alt="SHOWS"
            onLoad={() => setLoaded(true)}
            className={`z-10 p-10 ${loaded ? "block" : "invisible"}`}
            height={210}
            width={281}
          />
        </div>
        {/* {loading && ( */}
        {/*         <div className="flex flex-row justify-between gap-2 py-20 text-white">
          <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
          <p className="flex">Loading...</p>
        </div> */}
        {/* )} */}
        {/* {!loading && ( */}
        <div className="z-10 mb-16 flex w-2/3 flex-col items-center justify-center rounded-sm bg-stone-100">
          {shows?.length === 0 && (
            <>
              <p className="text-white">
                We do not currently have any shows booked
              </p>
              <p className="text-white">
                If you would like to book us for a show go to our contact page
                or reach out on social medai
              </p>
            </>
          )}
          <div className="my-4 w-full border-y border-stone-300">
            {shows?.map((show, index) => (
              <Show show={show} key={index} />
            ))}
          </div>

          <Link
            className="mb-2 mr-2 inline-block w-auto rounded-lg bg-red-800 px-5 py-3 text-sm font-medium text-white hover:bg-red-950 md:my-4"
            rel="noopener noreferrer"
            target="_blank"
            href="https://bandsintown.com/artist-subscribe/14899628"
          >
            <div className="flex flex-row items-center gap-1 md:px-2 md:py-1 md:text-xl">
              <BandsintownIcon />
              Follow
            </div>
          </Link>
        </div>
        {/* )} */}
      </main>
    </>
  );
};

export default Shows;
