import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import fruitSnacks from "../../public/fruitSnacks.jpeg";
import airbag from "../../public/airbag.jpeg";
import transferred from "../../public/transferred.png";

import banner from "../../public/tunnelEPKPhoto.png";

import image1 from "../../public/bandPhoto3.jpg";
import image2 from "../../public/porchPhoto.jpg";
import image3 from "../../public/tunnelWalking.jpg";
import image4 from "../../public/astroLogoTransparent.png";
import image5 from "../../public/bandPhoto2.jpg";
import image6 from "../../public/tunnelPhoto2.jpg";
import image7 from "../../public/barnPhoto.jpg";
import image8 from "../../public/7th-st-live13.jpg";
import image9 from "../../public/tunnelEPKPhoto.png";
import image10 from "../../public/couchPhoto.jpg";
import image11 from "../../public/bandPhoto4.jpg";
import image12 from "../../public/bandPhoto1.jpg";

import stagePlot from "../../public/stageplot.png";

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

const Music: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [processing, setProcessing] = useState(false);
  const contactSubmit = api.subscription.contactForm.useMutation();

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
        <title>EPK - SCALISE</title>
        <link rel="shortcut icon" href="/images/scaliseIcon.png" />
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
            quality={100}
            className="absolute z-0 object-cover object-[0%_15%]"
            priority
          />
          <h1 className="z-10 py-48 text-center text-8xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            SCALISE
          </h1>
        </div>
        <div className="flex items-center justify-center bg-white pb-36 pt-24">
          <div className="w-11/12 md:w-2/3">
            <h1 className="pb-12 text-6xl font-extrabold">Bio</h1>
            <p>
              “We should ask Mr. Scalise what our band name should be... and if
              it sucks we’ll just be Scalise.”
            </p>
            <p className="text-right">- Ben</p>
            <p className="pb-12">
              Named after their high-school band director, Scalise is an indie
              folk/rock band with two lead singers and horns out of the south
              metro Twin Cities area. Since the release of their debut album at
              the height of the COVID-19 pandemic, they&apos;ve been performing
              at local venues and have opened for nationally touring acts at 7th
              St. Entry in Minneapolis. Scalise is currently promoting the
              release of their upcoming sophomore album.
            </p>

            <p className="">
              The band started when core members Graden Hill (vocals/guitar),
              Ben Schwartz (drums), and George Knier (keys) were in middle
              school. Once the group had added Rachel Scott (vocals/bass) to the
              lineup, their high school band director asked the group to lead a
              jazz combo including Collyn Camara (guitar/trombone) and Sarah
              Navratil (saxophone). After practicing rock music instead of jazz,
              Camara, and as an occasional member, Navratil, were added to the
              lineup. Frustrated with the current band name, Schwartz decided it
              was best to ask the director what to name the band. After
              rejecting Mr. Scalise&apos;s suggestions, Schwartz presented
              &quot;Scalise&quot;.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center gap-10 bg-black py-24">
            <div className="flex flex-col items-center justify-center gap-3 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="w-1/2 text-center md:order-1">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="text-center text-4xl font-bold text-white md:text-6xl">
                    &quot;TRANSFERRED TO HOUSTON&quot;
                  </h1>
                  <p className="text-white">
                    Listen to the single off the upcoming album now.
                  </p>
                  <audio controls className="appearance-none">
                    {/*                 <source src="transferred.ogg" type="audio/ogg" />
                <source src="transferred.mp3" type="audio/mpeg" /> */}
                    {/* Your browser does not support the audio element. */}
                    Audio element placeholder
                  </audio>
                </div>
              </div>
              <Image
                src={transferred}
                alt="Transferred To Houston Image"
                loading="lazy"
                width={504}
                height={504}
              />
            </div>
          </div>

          <div className="z-10 flex flex-col items-center justify-center gap-3 bg-white py-24 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
            <div className="h-1/2 w-1/2 text-center md:order-1">
              <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="z-1 tex-center text-4xl font-bold text-rose-800 md:text-6xl">
                  &quot;AIRBAG&quot;
                </h1>
                <p className="text-rose-700">
                  Listen to the single off the upcoming album now.
                </p>
                <audio controls className="appearance-none">
                  {/*                 <source src="transferred.ogg" type="audio/ogg" />
                <source src="transferred.mp3" type="audio/mpeg" /> */}
                  {/* Your browser does not support the audio element. */}
                  Audio element placeholder
                </audio>
              </div>
            </div>
            <Image
              src={airbag}
              alt="Airbag Image"
              width={504}
              height={504}
              className="order-1"
              loading="lazy"
            />
          </div>

          <div className="z-10 flex flex-col items-center justify-center gap-3 bg-black py-24 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
            <div className="w-1/2 text-center md:order-1">
              <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="z-1 tex-center text-4xl font-bold text-white md:text-6xl">
                  &quot;FRUIT SNACKS&quot;
                </h1>
                <p className="text-white">
                  Listen to the single off the upcoming album now.
                </p>
                <audio
                  controls
                  className="appearance-none"
                  //TODO: Add audio files
                >
                  {/*                 <source src="transferred.ogg" type="audio/ogg" />
                <source src="transferred.mp3" type="audio/mpeg" /> */}
                  {/* Your browser does not support the audio element. */}
                  Audio element placeholder
                </audio>
              </div>
            </div>
            <Image
              src={fruitSnacks}
              alt="Fruit Snacks Image"
              width={504}
              height={504}
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center bg-rose-900 pb-24">
          <div>
            <h1 className="py-10 text-center text-8xl text-white">
              Live Videos
            </h1>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 px-10 md:w-5/6 md:grid-cols-2">
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/I5gtiSsExDA"
                title="Scalise - She&#39;s Gonna Kill You [Live @ 7th St Entry]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ aspectRatio: "16/9" }}
              ></iframe>
            </div>
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/8dCrG2TTlF4"
                title="Scalise - Perfect Occasions [Home Session]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ aspectRatio: "16/9" }}
              ></iframe>
            </div>
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/Do7MAZ_EMUI"
                title="Scalise - Fool&#39;s Coal [Live @ 7th St Entry]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ aspectRatio: "16/9" }}
              ></iframe>
            </div>
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/GVAwb-u9Xkk"
                title="Scalise - Dollar Short [Live @ OMNI Brewing]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ aspectRatio: "16/9" }}
              ></iframe>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center bg-white">
          <p className="w-5/6 pb-6 pt-24 text-center text-3xl font-bold md:w-2/3">
            “To my ear, they have got a sound that calls to mind a bit of Nickel
            Creek, with a touch of both Dave Matthews Band and Counting Crows.
            One thing I have to say I&quot;m struck by is how for a band this
            young, they are making such mature musical choices. There are so
            many unexpectedly nuanced moments on this album with everything so
            well balanced.”
          </p>
          <Link
            href="https://www.youtube.com/watch?v=hl2NoQjDe-E"
            className="pb-12 text-lg font-bold text-rose-700 underline hover:text-rose-900"
          >
            -TrackXTrack “The Top Ten Best Albums of 2020”
          </Link>
        </div>
        <div className="w-full bg-black">
          <h1 className="w-full py-20 text-center text-5xl font-bold text-white">
            PRESS PHOTOS
          </h1>
          <div className="flex flex-row flex-wrap">
            <Image
              src={image1}
              alt="Press Image"
              width={473}
              height={316}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image2}
              alt="Press Image"
              width={474}
              height={316}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image3}
              alt="Press Image"
              width={550}
              height={316}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image4}
              alt="Press Image"
              width={326}
              height={390}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image5}
              alt="Press Image"
              width={584}
              height={390}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image6}
              alt="Press Image"
              width={585}
              height={390}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image7}
              alt="Press Image"
              width={518}
              height={345}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image8}
              alt="Press Image"
              width={460}
              height={345}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image9}
              alt="Press Image"
              width={518}
              height={345}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image10}
              alt="Press Image"
              width={499}
              height={333}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image11}
              alt="Press Image"
              width={499}
              height={333}
              loading="lazy"
              className="flex-auto object-cover"
            />

            <Image
              src={image12}
              alt="Press Image"
              width={499}
              height={333}
              loading="lazy"
              className="flex-auto object-cover"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center bg-white py-12">
          <div className="flex w-2/3 flex-col items-center justify-center md:w-3/4 md:flex-row">
            <div className="w-full flex-col items-center justify-center md:w-1/4">
              <h1 className="text-wrap w-full text-center text-4xl font-bold text-rose-800">
                STAGE PLOT AND TECH RIDER
              </h1>
              <button className="w-full break-normal border-8 border-rose-800 py-4 text-lg text-rose-800 hover:bg-rose-800 hover:text-white">
                <Link href="/ScaliseTechRider.pdf">
                  CLICK HERE TO DOWNLOAD TECH RIDER
                </Link>
              </button>
            </div>
            <div className="container relative h-96 w-full md:w-3/4">
              <Image
                src={stagePlot}
                alt="Stage Plot Image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center bg-red-950 pb-32 pt-16 text-white md:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-2 md:w-1/3">
            <h1 className="order-1 text-center text-7xl md:text-left">
              Contact Us
            </h1>
            <p className="order-1 w-2/3 text-center text-xl md:w-4/5 md:text-center">
              Fill out this form or reach out to us at graden@scalise.band
            </p>
            <div className="order-1 mt-4 flex justify-center gap-4">
              <Link
                href="https://open.spotify.com/artist/1p2Ey5OjAPtcfhzmwlfIPZ?si=E5OkbxepRJSOZ1Zq7eeiKg"
                className="block rounded py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <SpotifyIcon />
              </Link>

              <Link
                href="https://music.apple.com/us/artist/scalise/1529031635"
                className="block rounded py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <AppleMusicIcon />
              </Link>

              <Link
                href="https://twitter.com/ScaliseTheBand"
                className="block rounded py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <TwitterIcon />
              </Link>

              <Link
                href="https://www.facebook.com/ScaliseTheBand"
                className="block rounded py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FacebookIcon />
              </Link>

              <Link
                href="https://www.tiktok.com/@scaliseband"
                className="block rounded py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <InstagramIcon />
              </Link>

              <Link
                href="https://www.tiktok.com/@scaliseband"
                className="block rounded py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <TikTokIcon />
              </Link>

              <Link
                href="https://www.youtube.com/channel/UCWBsxAAhmKP1nRHWQQ5N0Qg"
                className="block rounded py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <YoutubeIcon />
              </Link>
            </div>
          </div>
          <div className="flex w-11/12 flex-col items-center justify-center border border-gray-500 md:w-1/2">
            {/* eslint-disable-next-line */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col justify-center gap-2 px-4 py-8 sm:px-0">
                <div className="flex flex-row justify-center gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="first-name">First name</label>
                    <input
                      id="first-name"
                      {...register("firstName", { required: true })}
                      className="w-full rounded-md border border-gray-400 bg-gray-100 p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="last-name">Last name</label>
                    <input
                      id="last-name"
                      {...register("lastName", { required: true })}
                      className="w-full rounded-md border border-gray-400 bg-gray-100 p-2"
                    />
                  </div>
                </div>
                <h2>Email</h2>
                <input
                  id="email"
                  {...register("email", { required: true })}
                  className="rounded-md border border-gray-400 bg-gray-100 p-2"
                />
                <h2>Subject</h2>
                <input
                  id="subject"
                  {...register("subject", { required: true })}
                  className="rounded-md border border-gray-400 bg-gray-100 p-2"
                />
                <h2>Message</h2>
                <textarea
                  id="message"
                  {...register("message", { required: true })}
                  className="rounded-md border border-gray-400 bg-gray-100 p-2"
                  rows={4}
                />
                {!processing && (
                  <button
                    type="submit"
                    className="mt-4 w-1/2 rounded-sm border-4 border-white py-4 hover:bg-white hover:text-red-950"
                  >
                    Submit
                  </button>
                )}
                {processing && (
                  <button
                    type="button"
                    className="mt-4 w-1/2 rounded-sm border-4 border-white py-4 hover:bg-white hover:text-red-950"
                    disabled
                  >
                    <div className="flex flex-row justify-center">
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

export default Music;
