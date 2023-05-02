import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
//import { useRef, useEffect } from "react";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

const Home: NextPage = () => {
  /*   const vidRef = useRef(null);

  useEffect(() => {
    if (vidRef && vidRef.current) {
      videoRef.current.play();
    }
  }, [vidRef]); */
  return (
    <>
      <Head>
        <title>SCALISE</title>
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="relative min-h-screen w-screen py-10">
          <Image
            src="/Red_Felt.png"
            alt="Red Felt"
            fill
            quality={1}
            style={{ objectFit: "cover" }}
            className="absolute z-0 blur-sm"
          />
          <h1 className="z-1 relative text-center text-4xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Album Release Party
          </h1>
          <div className="z-1 relative flex flex-col items-center justify-center gap-10 md:flex-row">
            <div className="order-2 flex w-5/6 md:order-1 md:w-1/4">
              <div className="flex flex-col gap-2">
                <h2 className="order-1 text-right text-4xl font-bold text-white">
                  June 22
                </h2>
                <h3 className="order-1 text-right text-2xl text-white">
                  THE GREEN ROOM
                </h3>
                <h3 className="order-1 text-right text-xl text-white">
                  Minneapolis, MN
                </h3>
                <p className="text-l order-1 text-right text-white">
                  &quot;Before We Dry Up&quot;, our double LP, is releasing on
                  Friday, June 23rd with the album release show on Thursday,
                  June 22nd at the Green Room in Uptown Minneapolis. Two AWESOME
                  acts, Asparagus and Lily Blue, are going to be opening for us.
                  We&apos;re huge fans of their work and are stoked that they
                  wanted to hop on the bill. We hope to see you all there.
                </p>
                <div className="order-0 flex items-center justify-center md:order-2">
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-3/4 flex-col justify-center rounded-sm border-8 border-white py-4 text-center text-xl text-white hover:bg-white hover:font-bold hover:text-black"
                    href="https://www.greenroommn.com/events#/events?event_id=73908"
                  >
                    Tickets
                  </Link>
                </div>
              </div>
            </div>
            <div className="order-1 h-full w-2/3 sm:w-1/2 md:order-2 md:w-1/3 lg:w-1/4">
              <Image
                src="/releasePartyPoster.png"
                alt="release party"
                width={386}
                height={579}
              />
            </div>
          </div>
        </div>
        <div className="relative min-h-screen w-screen">
          <div className="z0">
            <video
              src="/TellMeYouNeedMe.mp4"
              //ref = { vidRef }
              playsInline
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
