import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import banner from "../../public/1.png";
import title from "../../public/Music (Handwritten).png";
import white_paper from "../../public/White Crumple Background Lighter.png";
import black_paper from "../../public/Black Crumple Background Darker.png";
import red_background from "../../public/Red Background.png";
import transferred from "../../public/transferred.webp";
import fruitSnacks from "../../public/fruitSnacks.webp";
import airbag from "../../public/airbag.webp";
import sgky from "../../public/SGKY Cover.png";
import album1 from "../../public/fromNothingToNothing.webp";

import { AudioPlayer } from "~/components/audioPlayer";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Music: NextPage = () => {
  return (
    <>
      <Head>
        <title>MUSIC-SCALISE</title>
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
      <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-800">
        <div className="relative flex w-full items-center justify-center bg-transparent">
          <Image
            src={banner}
            alt="background photo"
            fill
            quality={100}
            //style={{ objectFit: "cover" }}
            className="absolute z-0 object-cover"
            priority
          />
          <Image
            src={title}
            alt="MUSIC"
            className="z-10 p-10"
            height={210}
            width={281}
          />
        </div>

        <div className="relative min-h-screen w-full">
          <div className="flex flex-col">
            <div className="relative flex flex-col items-center gap-10 bg-stone-100 py-24">
              <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
                <div className="w-1/2 text-center md:order-1 md:w-1/2">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="text-center text-4xl font-bold text-red-800">
                      SHE&apos;S GONNA KILL YOU
                    </h1>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex w-full flex-col justify-center rounded-sm border-4 border-red-800 py-2 text-center text-xl text-red-800 hover:bg-red-800 hover:text-stone-100 md:w-1/2"
                      href="https://distrokid.com/hyperfollow/scalise/shes-gonna-kill-you"
                    >
                      Listen Here
                    </Link>
                  </div>
                </div>
                <div className="order-1 w-full md:w-1/2">
                  <Image
                    src={sgky}
                    alt="She's Gonna Kill You Cover"
                    loading="lazy"
                    width={504}
                    height={504}
                    className="shadow-2xl shadow-red-900"
                  />
                </div>
              </div>
              <AudioPlayer
                //demo={true}
                player_id="sgkyDemo"
                source="/She_s Gonna Kill You Clip.mp3"
                title="She's Gonna Kill You"
              />
              <Image
                src={white_paper}
                alt="background"
                className="absolute z-0"
                fill
              />
            </div>

            <div className="relative flex flex-col items-center gap-10 bg-stone-950 py-24">
              <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
                <div className="w-1/2 text-center md:order-1 md:w-1/2">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="text-center text-4xl font-bold text-stone-100">
                      TRANSFERRED TO HOUSTON
                    </h1>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex w-full flex-col justify-center rounded-sm border-4 border-stone-100 py-2 text-center text-xl text-stone-100 hover:bg-stone-100 hover:font-bold hover:text-stone-950 md:w-1/2"
                      href="https://distrokid.com/hyperfollow/scalise/transferred-to-houston"
                    >
                      Listen Here
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <Image
                    src={transferred}
                    alt="Transferred To Houston Image"
                    loading="lazy"
                    width={504}
                    height={504}
                    className="shadow-2xl shadow-red-900"
                  />
                </div>
              </div>
              <AudioPlayer
                //demo={true}
                player_id="transferredDemo"
                source="/Transferred to Houston Clip.mp3"
                title="Transferred To Houston"
              />
              <Image
                src={black_paper}
                alt="background"
                className="absolute z-0"
                fill
              />
            </div>

            <div className="relative flex w-full flex-col items-center gap-10 bg-stone-100 py-24">
              <div className="z-10 flex w-full flex-col items-center justify-center gap-3 md:flex-row md:gap-16">
                <div className="w-1/2 text-center md:order-1 md:w-1/3">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="z-1 tex-center text-4xl font-bold text-red-800">
                      AIRBAG
                    </h1>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex w-full flex-col justify-center rounded-sm border-4 border-red-800 py-2 text-center text-xl text-red-800 hover:bg-red-800 hover:font-bold hover:text-stone-100 md:w-1/2"
                      href="https://distrokid.com/hyperfollow/scalise/airbag"
                    >
                      Listen Here
                    </Link>
                  </div>
                </div>
                <div className="order-1 flex w-full items-center justify-center md:w-1/2">
                  <Image
                    src={airbag}
                    alt="Airbag Image"
                    width={504}
                    height={504}
                    className="shadow-2xl shadow-red-950"
                    loading="lazy"
                  />
                </div>
              </div>
              <AudioPlayer
                //demo={true}
                player_id="airbagDemo"
                source="/Airbag Clip.mp3"
                title="Airbag"
              />
              <Image
                src={white_paper}
                alt="background"
                className="absolute z-0"
                fill
              />
            </div>

            <div className="relative flex w-screen flex-col items-center gap-10 bg-stone-950 py-24">
              <div className="z-10 flex w-full flex-col items-center justify-center gap-3 sm:px-24 md:flex-row md:gap-0">
                <div className="w-1/2 text-center md:order-1 md:w-1/2">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="z-1 tex-center text-4xl font-bold text-stone-100">
                      FRUIT SNACKS
                    </h1>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex w-full flex-col justify-center rounded-sm border-4 border-stone-100 px-2 py-2 text-center text-xl text-stone-100 hover:bg-stone-100 hover:font-bold hover:text-stone-950 md:w-1/2"
                      href="https://distrokid.com/hyperfollow/scalise/fruit-snacks"
                    >
                      Listen Here
                    </Link>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center md:w-1/2">
                  <Image
                    src={fruitSnacks}
                    alt="Fruit Snacks Image"
                    width={504}
                    height={504}
                    loading="lazy"
                    className="shadow-2xl shadow-red-900"
                  />
                </div>
              </div>
              <AudioPlayer
                //demo={true}
                player_id="fruitSnacksDemo"
                source="/Fruit Snacks Clip.mp3"
                title="Fruit Snacks"
              />
              <Image
                src={black_paper}
                alt="background"
                className="absolute z-0"
                fill
              />
            </div>

            <div className="relative flex w-screen bg-red-800">
              <div className="z-10 flex w-full flex-col items-center justify-center gap-3 py-24 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
                <div className="md:order-0 w-1/2 text-center">
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
                <Image
                  src={album1}
                  alt="From Nothing To Nothing Album Cover"
                  width={504}
                  height={504}
                  loading="lazy"
                  className="shadow-2xl"
                />
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
