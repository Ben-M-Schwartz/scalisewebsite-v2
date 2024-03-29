import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import fruitSnacks from "../../public/fruitSnacks.webp";
import airbag from "../../public/airbag.webp";
import transferred from "../../public/transferred.webp";
import sgky from "../../public/SGKY Cover.webp";

import banner from "../../public/tunnelEPKPhoto.webp";

import image1 from "../../public/bandPhoto3.webp";
import image2 from "../../public/porchPhoto.webp";
import image3 from "../../public/tunnelWalking.webp";
import image4 from "../../public/astroLogoTransparent.webp";
import image5 from "../../public/bandPhoto2.webp";
import image6 from "../../public/tunnelPhoto2.webp";
import image7 from "../../public/barnPhoto.webp";
import image8 from "../../public/7th-st-live13.webp";
import image9 from "../../public/tunnelEPKPhoto.webp";
import image10 from "../../public/couchPhoto.webp";
import image11 from "../../public/bandPhoto4.webp";
import image12 from "../../public/bandPhoto1.webp";

import stagePlot from "../../public/stageplot.webp";

import { AudioPlayer } from "~/components/audioPlayer";

import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useState } from "react";
import {
  SpotifyIcon,
  AppleMusicIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YoutubeIcon,
} from "~/components/icons";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const Video = ({ embedId }: { embedId: string }) => {
  return (
    <div className="relative flex">
      <Image
        src={`https://img.youtube.com/vi/${embedId}/sddefault.jpg`}
        alt="yt thumbnail"
        priority
        fill
        className="absolute z-0 aspect-video"
      />
      <iframe
        width="100%"
        id="video"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="z-10 aspect-video"
      ></iframe>
    </div>
  );
};

const EPK: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [processing, setProcessing] = useState(false);
  const contactSubmit = api.email.contactForm.useMutation();

  const onSubmit = async (formData: FormData) => {
    setProcessing(true);
    await contactSubmit
      .mutateAsync({ ...formData })
      .then(() => {
        setProcessing(false);
        alert("Message sent. Thank you!");
        reset();
      })
      .catch(() =>
        alert(
          "Something went wrong. Please try again later or contact Graden directly"
        )
      );
  };

  return (
    <>
      <Head>
        <title>EPK - SECOND HAND DAN</title>
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
      <main className="flex min-h-screen flex-col items-center bg-stone-950">
        <div className="relative flex w-full justify-center bg-transparent">
          <Image
            src={banner}
            alt="background photo"
            fill
            quality={100}
            className="absolute z-0 object-cover md:object-[0%_15%]"
            priority
          />
          <h1 className="z-10 py-48 text-center text-6xl text-stone-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-8xl">
            SECOND HAND DAN
          </h1>
        </div>
        <div className="flex items-center justify-center bg-stone-100 pb-36 pt-24">
          <div className="w-11/12 md:w-2/3">
            <h1 className="pb-12 text-6xl font-extrabold">Bio</h1>
            <p></p>
            <p className="pb-12">Currently in the middle of rebranding</p>

            <p className="">
              The band started when core members Graden Hill (vocals/guitar),
              Ben Schwartz (drums), and George Knier (keys) were in middle
              school. Once the group had added Rachel Scott (vocals/bass) to the
              lineup, their high school band director asked the group to lead a
              jazz combo including Collyn Camara (guitar/trombone) and Sarah
              Navratil (saxophone). After practicing rock music instead of jazz,
              Camara, and as an occasional member, Navratil, were added to the
              lineup.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="z-10 flex flex-col items-center justify-center gap-3 bg-stone-100 py-24 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
            <div className="h-1/2 w-full text-center md:order-1 md:w-1/2">
              <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="z-1 tex-center text-4xl font-bold text-red-800 md:text-6xl">
                  &quot;SHE&apos;S GONNA KILL YOU&quot;
                </h1>
                <p className="text-red-800">
                  Listen to the single off the upcoming album now.
                </p>
                <AudioPlayer
                  //demo={false}
                  player_id="sgky"
                  source="/18 - She_s Gonna Kill You.mp3"
                  title="She's Gonna Kill You"
                />
              </div>
            </div>
            <Image
              src={sgky}
              alt="SGKY Image"
              width={504}
              height={504}
              className="order-1 flex flex-col items-center justify-center shadow-xl"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col items-center gap-10 bg-stone-950 py-24">
            <div className="flex flex-col items-center justify-center gap-3 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="w-full text-center md:order-1 md:w-1/2">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="text-center text-4xl font-bold text-stone-100 md:text-6xl">
                    &quot;TRANSFERRED TO HOUSTON&quot;
                  </h1>
                  <p className="text-stone-100">
                    Listen to the single off the upcoming album now.
                  </p>
                  <AudioPlayer
                    //demo={false}
                    player_id="transferred"
                    source="/11 - Transferred to Houston.mp3"
                    title="Transferred To Houston"
                  />
                </div>
              </div>
              <Image
                src={transferred}
                alt="Transferred To Houston Image"
                loading="lazy"
                width={504}
                height={504}
                className="flex flex-col items-center justify-center"
              />
            </div>
          </div>

          <div className="z-10 flex flex-col items-center justify-center gap-3 bg-stone-100 py-24 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
            <div className="h-1/2 w-full text-center md:order-1 md:w-1/2">
              <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="z-1 tex-center text-4xl font-bold text-red-800 md:text-6xl">
                  &quot;AIRBAG&quot;
                </h1>
                <p className="text-red-800">
                  Listen to the single off the upcoming album now.
                </p>
                <AudioPlayer
                  //demo={false}
                  player_id="airbag"
                  source="/04 - Airbag.mp3"
                  title="Airbag"
                />
              </div>
            </div>
            <Image
              src={airbag}
              alt="Airbag Image"
              width={504}
              height={504}
              className="order-1 flex flex-col items-center justify-center shadow-xl"
              loading="lazy"
            />
          </div>

          <div className="z-10 flex flex-col items-center justify-center gap-3 bg-stone-950 py-24 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
            <div className="w-full text-center md:order-1 md:w-1/2">
              <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="z-1 tex-center text-4xl font-bold text-stone-100 md:text-6xl">
                  &quot;FRUIT SNACKS&quot;
                </h1>
                <p className="text-stone-100">
                  Listen to the single off the upcoming album now.
                </p>
                <AudioPlayer
                  //demo={false}
                  player_id="fruitSnacks"
                  source="/06 - Fruit Snacks.mp3"
                  title="Fruit Snacks"
                />
              </div>
            </div>
            <Image
              src={fruitSnacks}
              alt="Fruit Snacks Image"
              width={504}
              height={504}
              className="flex flex-col items-center justify-center"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center bg-red-950 pb-24">
          <div>
            <h1 className="py-10 text-center text-8xl text-stone-100">
              Live Videos
            </h1>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 px-10 md:w-5/6 md:grid-cols-2">
            <Video embedId={"I5gtiSsExDA"} />
            <Video embedId={"8dCrG2TTlF4"} />
            <Video embedId={"Do7MAZ_EMUI"} />
            <Video embedId={"GVAwb-u9Xkk"} />
          </div>
        </div>
        <div className="flex w-full flex-col items-center bg-stone-100">
          <p className="w-5/6 pb-6 pt-24 text-center text-lg font-bold md:w-2/3 md:text-3xl">
            “To my ear, they have got a sound that calls to mind a bit of Nickel
            Creek, with a touch of both Dave Matthews Band and Counting Crows.
            One thing I have to say I&apos;m struck by is how for a band this
            young, they are making such mature musical choices. There are so
            many unexpectedly nuanced moments on this album with everything so
            well balanced.”
          </p>
          <Link
            href="https://www.youtube.com/watch?v=hl2NoQjDe-E"
            className="pb-12 text-center text-lg font-bold text-red-800 underline hover:text-rose-900"
          >
            -TrackXTrack “The Top Ten Best Albums of 2020”
          </Link>
        </div>
        <div className="w-full bg-stone-950">
          <h1 className="w-full pb-5 pt-10 text-center text-5xl font-bold text-stone-100">
            PRESS PHOTOS
          </h1>
          <h2 className="w-full pb-10 text-center text-3xl text-stone-100">
            Click image for high res download
          </h2>
          <div className="flex flex-row flex-wrap">
            <Link href="/bandPhoto3.jpg" className="flex-auto">
              <Image
                src={image1}
                alt="Press Image"
                width={378}
                height={253}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/porchPhoto.jpg" className="flex-auto">
              <Image
                src={image2}
                alt="Press Image"
                width={379}
                height={253}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/tunnelWalking.jpg" className="flex-auto">
              <Image
                src={image3}
                alt="Press Image"
                width={440}
                height={253}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/astroLogoTransparent.png" className="flex-auto">
              <Image
                src={image4}
                alt="Press Image"
                width={261}
                height={312}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/bandPhoto2.jpg" className="flex-auto">
              <Image
                src={image5}
                alt="Press Image"
                width={467}
                height={312}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/tunnelPhoto2.jpg" className="flex-auto">
              <Image
                src={image6}
                alt="Press Image"
                width={468}
                height={312}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/barnPhoto.jpg" className="flex-auto">
              <Image
                src={image7}
                alt="Press Image"
                width={414}
                height={276}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/7th-st-live13.jpg" className="flex-auto">
              <Image
                src={image8}
                alt="Press Image"
                width={368}
                height={276}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/tunnelEPKPhoto.jpg" className="flex-auto">
              <Image
                src={image9}
                alt="Press Image"
                width={414}
                height={276}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/couchPhoto.jpg" className="flex-auto">
              <Image
                src={image10}
                alt="Press Image"
                width={399}
                height={266}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/bandPhoto4.jpg" className="flex-auto">
              <Image
                src={image11}
                alt="Press Image"
                width={399}
                height={266}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
            <Link href="/bandPhoto1.jpg" className="flex-auto">
              <Image
                src={image12}
                alt="Press Image"
                width={399}
                height={266}
                loading="lazy"
                className="h-full w-full"
              />
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center bg-stone-100 py-12">
          <div className="flex w-5/6 flex-col items-center justify-center md:w-3/4 md:flex-row">
            <div className="w-full flex-col items-center justify-center md:w-1/2">
              <h1 className="text-wrap w-full text-center text-4xl font-bold text-red-800">
                STAGE PLOT AND TECH RIDER
              </h1>
              <button className="w-full break-normal border-8 border-red-800 py-4 text-lg text-red-800 hover:bg-red-800 hover:text-stone-100">
                <Link href="/Second Hand DanTechRider.pdf">
                  CLICK HERE TO DOWNLOAD TECH RIDER
                </Link>
              </button>
            </div>
            <div className="relative h-64 w-64 sm:w-96 md:h-96 md:w-3/4">
              <Link href="/stageplot.png">
                <Image
                  src={stagePlot}
                  alt="Stage Plot Image"
                  fill
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center bg-red-950 pb-32 pt-16 text-stone-100 md:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-2 md:w-1/3">
            <h1 className="order-1 text-center text-7xl md:text-left">
              Contact Us
            </h1>
            <p className="order-1 w-2/3 text-center text-xl md:w-4/5 md:text-center">
              Fill out this form or reach out to us at graden@secondhanddan.com
            </p>
            <div className="order-1 mt-4 flex justify-center sm:gap-4">
              <label htmlFor="spotify-link" className="invisible absolute">
                Second Hand Dan Spotify Link
              </label>
              <Link
                href="https://open.spotify.com/artist/1p2Ey5OjAPtcfhzmwlfIPZ?si=E5OkbxepRJSOZ1Zq7eeiKg"
                className="block rounded border-stone-700 py-2 pl-3 pr-4 text-stone-100 hover:bg-stone-700 hover:text-stone-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
                id="spotify-link"
              >
                <SpotifyIcon />
              </Link>
              <label htmlFor="applemusic-link" className="invisible absolute">
                Second Hand Dan Apple Music Link
              </label>
              <Link
                href="https://music.apple.com/us/artist/scalise/1529031635"
                className="block rounded border-stone-700 py-2 pl-3  pr-4 text-stone-100 hover:bg-stone-700 hover:text-stone-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
                id="applemusic-link"
              >
                <AppleMusicIcon />
              </Link>
              <label htmlFor="twitter-link" className="invisible absolute">
                Second Hand Dan Twitter Link
              </label>
              <Link
                href="https://twitter.com/2ndHandDan"
                className="block rounded border-stone-700 py-2 pl-3 pr-4 text-stone-100 hover:bg-stone-700 hover:text-stone-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
                id="twitter-link"
              >
                <TwitterIcon />
              </Link>
              <label htmlFor="facebook-link" className="invisible absolute">
                Second Hand Dan Facebook Link
              </label>
              <Link
                href="https://www.facebook.com/secondhanddanband"
                className="block rounded border-stone-700 py-2 pl-3 pr-4 text-stone-100 hover:bg-stone-700 hover:text-stone-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
                id="facebook-link"
              >
                <FacebookIcon />
              </Link>
              <label htmlFor="instagram-link" className="invisible absolute">
                Second Hand Dan Instagram Link
              </label>
              <Link
                href="https://www.instagram.com/secondhanddanband/"
                className="block rounded border-stone-700 py-2 pl-3 pr-4 text-stone-100 hover:bg-stone-700 hover:text-stone-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
                id="instagram-link"
              >
                <InstagramIcon />
              </Link>
              <label htmlFor="tiktok-link" className="invisible absolute">
                Second Hand Dan TikTok Link
              </label>
              <Link
                href="https://www.tiktok.com/@secondhanddanband"
                className="block rounded border-stone-700 py-2 pl-3 pr-4 text-stone-100 hover:bg-stone-700 hover:text-stone-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
                id="tiktok-link"
              >
                <TikTokIcon />
              </Link>
              <label htmlFor="youtube-link" className="invisible absolute">
                Second Hand Dan Youtube Link
              </label>
              <Link
                href="https://www.youtube.com/channel/UCWBsxAAhmKP1nRHWQQ5N0Qg"
                className="block rounded border-stone-700 py-2 pl-3 pr-4 text-stone-100 hover:bg-stone-700 hover:text-stone-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-500"
                rel="noopener noreferrer"
                target="_blank"
                id="youtube-link"
              >
                <YoutubeIcon />
              </Link>
            </div>
          </div>
          <div className="flex w-11/12 flex-col items-center justify-center border border-stone-500 md:w-1/2">
            {/* eslint-disable-next-line */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col justify-center gap-2 px-4 py-8 sm:px-0">
                <div className="flex flex-row justify-center gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="first-name">First name</label>
                    <input
                      id="first-name"
                      {...register("firstName", { required: true })}
                      className="w-full rounded-md border border-stone-400 bg-stone-100 p-2 text-stone-950"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="last-name">Last name</label>
                    <input
                      id="last-name"
                      {...register("lastName", { required: true })}
                      className="w-full rounded-md border border-stone-400 bg-stone-100 p-2 text-stone-950"
                    />
                  </div>
                </div>
                <h2>Email</h2>
                <input
                  id="email"
                  {...register("email", { required: true })}
                  className="rounded-md border border-stone-400 bg-stone-100 p-2 text-stone-950"
                />
                <h2>Subject</h2>
                <input
                  id="subject"
                  {...register("subject", { required: true })}
                  className="rounded-md border border-stone-400 bg-stone-100 p-2 text-stone-950"
                />
                <h2>Message</h2>
                <textarea
                  id="message"
                  {...register("message", { required: true })}
                  className="rounded-md border border-stone-400 bg-stone-100 p-2 text-stone-950"
                  rows={4}
                />
                {!processing && (
                  <button
                    type="submit"
                    className="mt-4 w-1/2 rounded-sm border-4 border-stone-100 py-4 hover:bg-stone-100 hover:text-red-950"
                  >
                    Submit
                  </button>
                )}
                {processing && (
                  <button
                    type="button"
                    className="mt-4 w-1/2 rounded-sm border-4 border-stone-100 bg-stone-100 py-4 text-red-950"
                    disabled
                  >
                    <div className="flex flex-row justify-center gap-2">
                      <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
                      <p className="flex">Processing...</p>
                    </div>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default EPK;
