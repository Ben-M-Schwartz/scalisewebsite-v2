import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
//import Link from "next/link";
//import { signIn, signOut, useSession } from "next-auth/react";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Videos: NextPage = () => {
  return (
    <>
      <Head>
        <title>VIDEOS-SCALISE</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="relative flex w-full justify-center bg-transparent">
          <Image
            src="/barnPhoto.jpg"
            alt="background photo"
            fill
            quality={75}
            className="absolute z-0 object-cover object-[15%_15%]"
            priority
          />
          <h1 className="z-10 py-32 text-center text-8xl text-white">Videos</h1>
        </div>
        <div>
          <h1 className="py-10 text-8xl text-white">Live</h1>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 px-10 md:grid-cols-2">
          <div>
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/I5gtiSsExDA"
              title="Scalise - She&#39;s Gonna Kill You [Live @ 7th St Entry]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
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
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
        </div>
        <h1 className="py-10 text-8xl text-white">Vlogs</h1>
        <div className="grid w-full grid-cols-1 gap-4 px-10 pb-10 md:grid-cols-2">
          <div>
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/jXnpekrt3y0"
              title="The Band Plays a Wedding and Terrible Golf- Vlog 8"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
          <div>
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/gHX7W-cWr2U"
              title="We Give an Album 2 Update!!! - Vlog 7"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
          <div>
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/zVqXWE4Y6c4"
              title="The Band Plays a HUGE Show - Vlog 6"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
          <div>
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/kCOOUUlcss8"
              title="The Band&#39;s Equipment Gets SOAKED - Vlog 5"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
          <div>
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/1NB1fkEZxRk"
              title="The Band Split Up... But Got Back Together - Vlog 4"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
          <div>
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/4MYu-auxBuM"
              title="The Band Finally Plays Music and Looks Cool - Vlog 3"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
          <div>
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/6B3uocHyZu4"
              title="We Try Releasing GOOD Music??? - Vlog 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
          <div>
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/BL1OxvKVllk"
              title="What We Really Do in Our Band - Vlog 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
        </div>
      </main>
    </>
  );
};

export default Videos;
