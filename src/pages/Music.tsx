import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import banner from "../../public/tunnelPhoto.png";
import transferred from "../../public/transferred.png";
import fruitSnacks from "../../public/fruitSnacks.jpeg";
import airbag from "../../public/airbag.jpeg";
import album1 from "../../public/fromNothingToNothing.png";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Music: NextPage = () => {
  return (
    <>
      <Head>
        <title>MUSIC-SCALISE</title>
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
        <div className="relative flex w-full items-center justify-center bg-transparent">
          <Image
            src={banner}
            alt="background photo"
            fill
            quality={75}
            style={{ objectFit: "cover" }}
            className="absolute z-0 object-[0%_15%]"
            priority
          />
          <h1 className="z-10 py-24 text-center text-8xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            MUSIC
          </h1>
        </div>

        <div className="relative min-h-screen w-screen">
          <div className="flex flex-col">
            <div className="flex flex-col items-center gap-10 bg-black py-24">
              <div className="flex flex-col items-center justify-center gap-3 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
                <div className="w-1/2 text-center md:order-1">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="text-center text-4xl font-bold text-white">
                      TRANSFERRED TO HOUSTON
                    </h1>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex w-full flex-col justify-center rounded-sm border-4 border-white py-2 text-center text-xl text-white hover:bg-white hover:font-bold hover:text-black md:w-1/2"
                      href="https://distrokid.com/hyperfollow/scalise/transferred-to-houston"
                    >
                      Listen Here
                    </Link>
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
              <p className="text-white">Placeholder audio element for now:</p>
              <audio controls className="appearance-none">
                {/*                 <source src="transferred.ogg" type="audio/ogg" />
                <source src="transferred.mp3" type="audio/mpeg" /> */}
                {/* Your browser does not support the audio element. */}
                Audio element placeholder
              </audio>
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 bg-white py-24 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="h-1/2 w-1/2 text-center md:order-1">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="z-1 tex-center text-4xl font-bold text-rose-800">
                    AIRBAG
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-rose-800 py-2 text-center text-xl text-rose-800 hover:bg-rose-800 hover:font-bold hover:text-white md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/airbag"
                  >
                    Listen Here
                  </Link>
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
                  <h1 className="z-1 tex-center text-4xl font-bold text-white">
                    FRUIT SNACKS
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-white px-2 py-2 text-center text-xl text-white hover:bg-white hover:font-bold hover:text-black md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/fruit-snacks"
                  >
                    Listen Here
                  </Link>
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

            <div className="z-10 flex flex-col items-center justify-center gap-3 bg-rose-800 py-24 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="md:order-0 w-1/2 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="text-center text-4xl font-bold text-white">
                    FROM NOTHING TO NOTHING
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-white px-2 py-2 text-center text-xl text-white hover:bg-white hover:text-rose-800 md:w-1/2"
                    href="https://open.spotify.com/album/0EcDn4wIQxkVmdXvyLI3uK?si=ZiAspsMJQ-yMqS7j6FwuHQ"
                  >
                    Spotify
                  </Link>
                  <Link
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-white px-2 py-2 text-center text-xl text-white hover:bg-white hover:text-rose-800 md:w-1/2"
                    href="/Store"
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
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Music;
