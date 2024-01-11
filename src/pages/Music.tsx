import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

import banner from "../../public/black_paper_1.webp";
import title from "../../public/Music (Handwritten).webp";
import white_paper from "../../public/White Crumple Background Lighter.webp";
import black_paper from "../../public/Black Crumple Background Darker.webp";
import red_background from "../../public/Red Background.webp";
import transferred from "../../public/transferred.webp";
import seventy from "../../public/OneInSeventyEightCover.webp";
import fruitSnacks from "../../public/fruitSnacks.webp";
import airbag from "../../public/airbag.webp";
import sgky from "../../public/SGKY Cover.webp";
import album1 from "../../public/fromNothingToNothing.webp";
import album2 from "../../public/LP2_cover.webp";

import { AudioPlayer } from "~/components/audioPlayer";

const SingleLayout = ({
  title,
  order,
  link,
  image,
  songsrc,
  demotitle,
  background,
  background_color,
}: {
  title: string;
  order: number;
  link: string;
  image: StaticImageData;
  songsrc: string;
  demotitle: string;
  background: StaticImageData;
  background_color: string;
}) => {
  return (
    <div
      className={`relative flex w-full flex-col items-center gap-10 ${
        background_color === "black"
          ? "bg-stone-950 text-stone-100"
          : "bg-stone-100 text-red-800"
      } py-24`}
    >
      <div className="z-10 flex w-full flex-col items-center justify-center gap-3 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10 lg:w-5/6">
        <div className="w-1/2 text-center md:order-1 md:w-1/2">
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <h1 className=" text-center text-4xl font-bold">{title}</h1>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              className={`flex w-full flex-col justify-center rounded-sm border-4 py-2 text-center md:text-lg lg:text-xl ${
                background_color === "black"
                  ? "border-stone-100 hover:bg-stone-100 hover:font-bold hover:text-stone-950"
                  : "border-red-800 text-red-800 hover:bg-red-800 hover:text-stone-100"
              } md:w-1/2`}
              href={link}
            >
              Listen Here
            </Link>
          </div>
        </div>
        <div
          className={`${
            order === 1 ? "order-1" : ""
          } flex w-5/6 flex-col items-center justify-center md:w-1/2`}
        >
          <Image
            src={image}
            alt="Second Hand Dan Single Cover"
            loading="lazy"
            width={504}
            height={504}
            className="shadow-2xl shadow-red-900"
          />
        </div>
      </div>
      <AudioPlayer
        //demo={true}
        player_id={`${demotitle}Demo`}
        source={songsrc}
        title={demotitle}
      />
      <Image
        src={background}
        alt="background"
        className="absolute z-0"
        fill
        loading="lazy"
      />
    </div>
  );
};

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Music: NextPage = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Head>
        <title>MUSIC-SECOND HAND DAN</title>
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
      <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-stone-950">
        <div className="relative flex w-full items-center justify-center bg-transparent">
          <Image
            src={banner}
            alt="background photo"
            fill
            quality={100}
            className="absolute z-0 object-cover"
            priority
          />
          {/*           <h1
            className={`${
              loaded ? "hidden" : "block"
            } absolute text-6xl text-stone-100 shadow-sm`}
          >
            MUSIC
          </h1> */}
          <Image
            src={title}
            onLoad={() => setLoaded(true)}
            alt="MUSIC"
            className={`z-10 p-10 ${loaded ? "block" : "invisible"}`}
            height={210}
            width={281}
          />
        </div>

        <div className="relative min-h-screen w-full">
          <div className="flex flex-col">
            {/* */}
            <div className="relative flex flex-col items-center gap-10 bg-stone-100 py-24">
              <div className="z-10 flex w-full flex-col items-center justify-center gap-3 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10 lg:w-5/6">
                <div className="w-1/2 text-center md:order-1 md:w-1/2">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="text-center text-4xl font-bold text-red-800">
                      BEFORE WE DRY UP
                    </h1>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex w-full flex-col justify-center rounded-sm border-4 border-red-800 py-2 text-center text-xl text-red-800 hover:bg-red-800 hover:text-stone-100 md:w-1/2"
                      href="https://distrokid.com/hyperfollow/scalise/before-we-dry-up"
                    >
                      Listen Here
                    </Link>
                    <Link
                      className="flex w-full flex-col justify-center rounded-sm border-4 border-red-800 py-2 text-center text-xl text-red-800 hover:bg-red-800 hover:text-stone-100 md:w-1/2"
                      href="/Product/Before-We-Dry-Up-CD"
                    >
                      Purchase
                    </Link>
                  </div>
                </div>
                <div className="order-1 flex w-5/6 flex-col items-center justify-center md:w-1/2">
                  <Image
                    src={album2}
                    alt="Album 2 Cover"
                    loading="lazy"
                    width={504}
                    height={504}
                    className="shadow-2xl shadow-red-900"
                  />
                </div>
              </div>
              <Image
                src={white_paper}
                alt="background"
                className="absolute z-0"
                fill
                priority
              />
            </div>

            <SingleLayout
              title="ONE IN SEVENTY-EIGHT"
              order={0}
              link="https://distrokid.com/hyperfollow/scalise/one-in-seventy-eight"
              image={seventy}
              songsrc="/One in Seventy-Eight Clip.mp3"
              demotitle="One In Seventy-Eight"
              background={black_paper}
              background_color="black"
            />

            <SingleLayout
              title="SHE'S GONNA KILL YOU"
              order={1}
              link="https://distrokid.com/hyperfollow/scalise/shes-gonna-kill-you"
              image={sgky}
              songsrc="/She_s Gonna Kill You Clip.mp3"
              demotitle="She's Gonna Kill You"
              background={white_paper}
              background_color="white"
            />

            <SingleLayout
              title="TRANSFERRED TO HOUSTON"
              order={0}
              link="https://distrokid.com/hyperfollow/scalise/transferred-to-houston"
              image={transferred}
              songsrc="/Transferred to Houston Clip.mp3"
              demotitle="Transferred to Houston"
              background={black_paper}
              background_color="black"
            />

            <SingleLayout
              title="AIRBAG"
              order={1}
              link="https://distrokid.com/hyperfollow/scalise/airbag"
              image={airbag}
              songsrc="/Airbag Clip.mp3"
              demotitle="Airbag"
              background={white_paper}
              background_color="white"
            />

            <SingleLayout
              title="FRUIT SNACKS"
              order={0}
              link="https://distrokid.com/hyperfollow/scalise/fruit-snacks"
              image={fruitSnacks}
              songsrc="/Fruit Snacks Clip.mp3"
              demotitle="Fruit Snacks"
              background={black_paper}
              background_color="black"
            />

            <div className="relative flex flex-col items-center gap-10 bg-red-800 py-24">
              <div className="z-10 flex w-full flex-col items-center justify-center gap-3 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10 lg:w-5/6">
                <div className="md:order-0 w-1/2 text-center md:w-1/2">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="text-center text-4xl font-bold text-stone-100">
                      FROM NOTHING TO NOTHING
                    </h1>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex w-full flex-col justify-center rounded-sm border-4 border-stone-100 px-2 py-2 text-center text-xl text-stone-100 hover:bg-stone-100 hover:text-red-800 md:w-1/2"
                      href="https://distrokid.com/hyperfollow/scalise/from-nothing-to-nothing"
                    >
                      Listen
                    </Link>
                    <Link
                      className="flex w-full flex-col justify-center rounded-sm border-4 border-stone-100 px-2 py-2 text-center text-xl text-stone-100 hover:bg-stone-100 hover:text-red-800 md:w-1/2"
                      href="/Product/From-Nothing-To-Nothing-CD"
                    >
                      Purchase
                    </Link>
                  </div>
                </div>
                <div className="flex w-5/6 flex-col items-center justify-center md:w-1/2">
                  <Image
                    src={album1}
                    alt="From Nothing To Nothing Album Cover"
                    width={504}
                    height={504}
                    loading="lazy"
                    className="shadow-2xl"
                  />
                </div>
              </div>
              <Image
                src={red_background}
                alt="background"
                className="absolute z-0 object-cover"
                fill
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Music;
