import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import banner from "../../public/3.webp";
import title from "../../public/Videos (Handwritten).webp";
import white_paper from "../../public/White Crumple Background Lighter.webp";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Videos: NextPage = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Head>
        <title>VIDEOS-SCALISE</title>
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
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
            alt="VIDEOS"
            onLoad={() => setLoaded(true)}
            className={`z-10 p-10 ${loaded ? "block" : "invisible"}`}
            height={210}
            width={281}
          />
        </div>
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black">
          <Image
            src={white_paper}
            className="absolute z-0 object-cover"
            fill
            alt="background"
          />
          <h1 className="z-10 py-10 text-8xl text-red-800 md:py-24">LIVE</h1>
          <div className="z-10 grid w-full grid-cols-1 gap-4 px-10 md:grid-cols-2">
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/I5gtiSsExDA"
                title="Scalise - She&#39;s Gonna Kill You [Live @ 7th St Entry]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="aspect-video"
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
                className="aspect-video"
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
                className="aspect-video"
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
                className="aspect-video"
              ></iframe>
            </div>
          </div>
          <h1 className="z-10 py-10 text-8xl text-red-800 md:py-24">VLOGS</h1>
          <div className="z-10 grid w-full grid-cols-1 gap-4 px-10 pb-10 md:grid-cols-2">
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/jXnpekrt3y0"
                title="The Band Plays a Wedding and Terrible Golf- Vlog 8"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="aspect-video"
              ></iframe>
            </div>
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/gHX7W-cWr2U"
                title="We Give an Album 2 Update!!! - Vlog 7"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="aspect-video"
              ></iframe>
            </div>
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/zVqXWE4Y6c4"
                title="The Band Plays a HUGE Show - Vlog 6"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="aspect-video"
              ></iframe>
            </div>
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/kCOOUUlcss8"
                title="The Band&#39;s Equipment Gets SOAKED - Vlog 5"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="aspect-video"
              ></iframe>
            </div>
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/1NB1fkEZxRk"
                title="The Band Split Up... But Got Back Together - Vlog 4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="aspect-video"
              ></iframe>
            </div>
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/4MYu-auxBuM"
                title="The Band Finally Plays Music and Looks Cool - Vlog 3"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="aspect-video"
              ></iframe>
            </div>
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/6B3uocHyZu4"
                title="We Try Releasing GOOD Music??? - Vlog 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="aspect-video"
              ></iframe>
            </div>
            <div>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/BL1OxvKVllk"
                title="What We Really Do in Our Band - Vlog 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="aspect-video"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Videos;
