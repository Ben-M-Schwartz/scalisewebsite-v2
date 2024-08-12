import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import banner from "../../public/black_paper_3.webp";
import title from "../../public/Videos (Handwritten).webp";
import white_paper from "../../public/White Crumple Background Lighter.webp";

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

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Videos: NextPage = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Head>
        <title>VIDEOS-SECOND HAND DAN</title>
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
            <Video embedId={"OzNevfogf3A"} />
            <Video embedId={"NIlWPTuro3o"} />
            <Video embedId={"XSrdVCySesQ"} />
            <Video embedId={"WPhmBEAFOic"} />
            <Video embedId={"oYSLk_Hwc40"} />
            <Video embedId={"zBF3moA8QRI"} />
            <Video embedId={"zal4SZiCZio"} />
            <Video embedId={"ZPLhr723rQ4"} />
            <Video embedId={"FK5YZ7trUBQ"} />
            <Video embedId={"VpMybxNjX_I"} />
            <Video embedId={"BtEIT-48Uyo"} />
            <Video embedId={"_EiLHe2B2ps"} />
            <Video embedId={"fNKKvQzrSk4"} />

            {/* <Video embedId={"TvdF7yx0EnU"} /> */}

            <Video embedId={"QMhLvYWD00Y"} />
            <Video embedId={"I5gtiSsExDA"} />
            <Video embedId={"8dCrG2TTlF4"} />
            <Video embedId={"GVAwb-u9Xkk"} />
            <div className="max-md:order-1">
              <Video embedId={"RN1MDSGtY8E"} />
            </div>
            <Video embedId={"Do7MAZ_EMUI"} />
            <h1 className="z-10 order-1 text-lg text-red-800">
              Short Documentary by Josh Baumgart
            </h1>
          </div>
          {/* <h1 className="z-10 py-10 text-8xl text-red-800 md:py-24">VLOGS</h1> */}
          {/* <div className="z-10 grid w-full grid-cols-1 gap-4 px-10 pb-10 md:grid-cols-2"> */}
          {/*   <Video embedId={"jXnpekrt3y0"} /> */}
          {/*   <Video embedId={"gHX7W-cWr2U"} /> */}
          {/*   <Video embedId={"zVqXWE4Y6c4"} /> */}
          {/*   <Video embedId={"kCOOUUlcss8"} /> */}
          {/*   <Video embedId={"1NB1fkEZxRk"} /> */}
          {/*   <Video embedId={"4MYu-auxBuM"} /> */}
          {/*   <Video embedId={"6B3uocHyZu4"} /> */}
          {/*   <Video embedId={"gHX7W-cWr2U"} /> */}
          {/* </div> */}
        </div>
      </main>
    </>
  );
};

export default Videos;
