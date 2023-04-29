import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
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
import { useState } from "react";

import {
  TwitterShareButton,
  EmailShareButton,
  FacebookShareButton,
} from "next-share";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

import { db } from "~/db/db";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
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

//might switch this to static or initial props
//TODO: ask graden if he would prefer faster loading or easier changing of shows for him
export const getServerSideProps: GetServerSideProps = async () => {
  const result = await db.select().from(shows);

  return {
    props: {
      shows: result,
    },
  };
};

const Shows: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  //TODO: figure out query params for bandsintown
  //const shows = api.shows.get.useQuery();
  const shows = props.shows as ShowType[];
  const [isHover, setHover] = useState(false);
  const [isCopied, setCopied] = useState(false);
  return (
    <>
      <Head>
        <title>SHOWS-SCALISE</title>
      </Head>
      <main className="flex min-h-screen  flex-col items-center justify-center bg-gray-800">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">Shows</p>
          {shows.length === 0 && (
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
          <div className="py-5">
            {shows.map((show, index) => (
              <Link
                href={show.bandsintown_link as string}
                key={index}
                className="z-0 flex w-screen flex-col items-center gap-2 hover:bg-gray-600"
              >
                <div className="divide-y">
                  <div className="flex flex-col justify-center gap-2 py-6 text-center sm:flex-row sm:justify-between sm:gap-24 sm:text-left md:gap-36 md:py-4 lg:gap-48">
                    <div>
                      <div className="font-bold text-gray-100">{show.date}</div>
                      <div className="font-small text-gray-100">
                        {show.location}
                      </div>
                      <div className="font-small text-gray-100 sm:order-2">
                        {show.name}
                      </div>
                    </div>
                    <motion.div
                      onHoverStart={() => setHover(true)}
                      onHoverEnd={() => setHover(false)}
                      whileTap="hover"
                      whileFocus="hover"
                      className="flex flex-row justify-center gap-3 text-white sm:flex-col"
                    >
                      <motion.div
                        initial="hidden"
                        animate={isHover ? "shown" : "hidden"}
                        whileHover="shown"
                        variants={variants}
                        className="absolute left-1/2 flex flex-row gap-1 bg-gray-800 px-2 py-2 md:gap-3 lg:gap-4"
                      >
                        <TwitterShareButton
                          url={show.bandsintown_link as string}
                          title={"Check out this upcoming event from Scalise!"}
                        >
                          <div className="flex rounded text-gray-900 hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:bg-transparent dark:hover:text-blue-500 md:p-0">
                            <TwitterIcon />
                          </div>
                        </TwitterShareButton>
                        <FacebookShareButton
                          url={show.bandsintown_link as string}
                          quote={"Check out this upcoming event from Scalise!"}
                          hashtag={"#music"}
                        >
                          {" "}
                          <div className="flex rounded text-gray-900 hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:bg-transparent dark:hover:text-blue-500 md:p-0">
                            <FacebookIcon />
                          </div>
                        </FacebookShareButton>
                        <EmailShareButton
                          url={show.bandsintown_link as string}
                          subject={
                            "Check out this upcoming event from Scalise!"
                          }
                          body=""
                        >
                          <div className="flex rounded text-gray-900 hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:bg-transparent dark:hover:text-blue-500 md:p-0">
                            <EmailIcon />
                          </div>
                        </EmailShareButton>
                        <button
                          onClick={() => {
                            navigator.clipboard
                              .writeText(show.bandsintown_link as string)
                              .then(() => {
                                setCopied(true);
                                setTimeout(() => {
                                  setCopied(false);
                                }, 500);
                              })
                              .catch((error) => console.error(error));
                          }}
                        >
                          <div className="flex rounded text-gray-900 hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:bg-transparent dark:hover:text-blue-500 md:p-0">
                            {!isCopied && <LinkIcon />}
                            {isCopied && (
                              <div className="animate-bounce animate-pulse text-green-400">
                                <CheckIcon />
                              </div>
                            )}
                          </div>
                        </button>
                      </motion.div>
                      <div className="flex flex-row justify-center gap-2">
                        <p>Share:</p>
                        <ShareIcon />
                      </div>
                    </motion.div>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex flex-col justify-center rounded-sm border bg-rose-800 px-10 py-3 text-white hover:border-rose-900 hover:bg-rose-700 sm:py-0"
                      href={show.ticket_link as string}
                    >
                      Tickets
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link
            className="mb-2 mr-2 inline-block w-auto rounded-lg bg-rose-800 px-5 py-3 text-sm font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            href="https://bandsintown.com/artist-subscribe/14899628?
            affil_code=js_www.scalise.band
            &app_id=js_www.scalise.band
            &bg-color=%23ffffff
            &border-color=rgba%28193%2C17%2C35%2C1%29
            &came_from=700
            &cta-bg-color=rgba%28255%2C255%2C255%2C1%29
            &cta-border-color=rgba%28193%2C17%2C35%2C1%29
            &cta-border-radius=0px
            &cta-border-width=1px
            &cta-text-color=rgba%28193%2C17%2C35%2C1%29
            &font=Helvetica
            &play-my-city=false
            &signature=ZZ9a89bd3786a112c99a22dc7645c38bd72185dde34d03958907e235220d40f268
            &spn=0
            &text-color=%23424242
            &utm_campaign=track
            &utm_medium=web&utm_source=widget"
          >
            <div className="flex flex-row items-center gap-1">
              <BandsintownIcon />
              Follow
            </div>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Shows;
