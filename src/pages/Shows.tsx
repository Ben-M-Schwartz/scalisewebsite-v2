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

import banner from "../../public/greenRoomPhoto.webp";

import { db } from "~/db/db";
//import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

import { shows } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
type ShowType = InferModel<typeof shows, "select">;

const variants = {
  hidden: {
    opacity: 0,
    x: -20,
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
    x: -50,
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
      className="z-0 flex w-full flex-col items-center gap-2 hover:bg-gray-600"
    >
      <div className="flex w-full flex-col items-center justify-center gap-2 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="w-full sm:w-1/2 xl:w-2/3">
          <div className="font-bold text-gray-100">{show.date}</div>
          <div className="font-small text-gray-100">{show.location}</div>
          <div className="font-small text-gray-100 sm:order-2">{show.name}</div>
        </div>
        <div className="flex w-1/4 flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8 md:gap-20 xl:w-1/6">
          <motion.div
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            className="z-30 flex flex-row justify-center gap-3 object-contain text-white sm:translate-x-1 sm:flex-col"
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
                <div className="rounde flex text-white hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 md:p-0">
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
                <div className="flex rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 md:p-0">
                  <FacebookIcon />
                </div>
              </FacebookShareButton>
              <EmailShareButton
                url={show.bandsintown_link as string}
                subject={"Check out this upcoming event from Scalise!"}
                body=""
                blankTarget
              >
                <div className="flex rounded text-white hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 md:p-0">
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
                <div className="flex rounded text-white hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 md:p-0">
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
              className="z-10 flex flex-row justify-center gap-2 bg-transparent px-10 py-4 focus:text-blue-400"
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
            className="w-1/2 rounded-sm border bg-rose-800 py-2 text-center text-white hover:border-rose-800 hover:bg-white hover:text-rose-800 active:bg-gray-300 sm:w-full"
          >
            Directions
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            className="w-1/2 rounded-sm border bg-rose-800 py-2 text-center text-white hover:border-rose-800 hover:bg-white hover:text-rose-800 active:bg-gray-300 sm:w-full"
            href={show.ticket_link as string}
          >
            Tickets
          </Link>
        </div>
      </div>
    </Link>
  );
};

//TODO: figure out query params for bandsintown

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
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gray-800">
        <div className="relative flex w-full justify-center bg-transparent">
          <Image
            src={banner}
            alt="background photo"
            fill
            quality={75}
            className="absolute z-0 object-cover object-[0%_48%]"
            priority
          />
          <h1 className="z-10 py-32 text-center text-8xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            SHOWS
          </h1>
        </div>
        {/* {loading && ( */}
        {/*         <div className="flex flex-row justify-between gap-2 py-20 text-white">
          <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
          <p className="flex">Loading...</p>
        </div> */}
        {/* )} */}
        {/* {!loading && ( */}
        <div className="flex w-2/3 flex-col items-center justify-center">
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
          <div className="my-4 w-full divide-y divide-gray-600 border-y border-gray-600">
            {shows?.map((show, index) => (
              <Show show={show} key={index} />
            ))}
          </div>

          <Link
            className="mb-2 mr-2 inline-block w-auto rounded-lg bg-rose-800 px-5 py-3 text-sm font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            rel="noopener noreferrer"
            target="_blank"
            href="https://bandsintown.com/artist-subscribe/14899628
            ?affil_code=js_www.scalise.band
            &app_id=js_www.scalise.band
            &bg-color=%23ffffff
            &border-color=rgba%28193%2C17%2C35%2C1%29
            &came_from=700
            &cta-bg-color=rgba%28255%2C255%2C255%2C1%29
            &cta-border-color=rgba%28193%2C17%2C35%2C1%29
            &cta-border-radius=0px&cta-border-width=1px&cta-text-color=rgba%28193%2C17%2C35%2C1%29
            &font=Helvetica&play-my-city=false
            &signature=ZZ9a89bd3786a112c99a22dc7645c38bd72185dde34d03958907e235220d40f268
            &spn=0
            &text-color=%23424242&utm_campaign=track
            &utm_medium=web&utm_source=widget"
          >
            <div className="flex flex-row items-center gap-1">
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
