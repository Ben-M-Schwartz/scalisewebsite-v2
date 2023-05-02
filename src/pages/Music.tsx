import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Music: NextPage = () => {
  return (
    <>
      <Head>
        <title>MUSIC-SCALISE</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="w-full bg-rose-800">
          <h1 className="py-4 text-center text-8xl text-white sm:py-6 md:py-8 lg:py-10">
            MUSIC
          </h1>
        </div>

        <div className="relative min-h-screen w-screen">
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center gap-3 bg-black py-24 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-0">
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
                src="/transferred.png"
                alt="Transferred To Houston Image"
                width={504}
                height={504}
              />
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
                src="/airbag.jpeg"
                alt="Airbag Image"
                width={504}
                height={504}
                className="order-1"
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
                src="/fruitSnacks.jpeg"
                alt="Fruit Snacks Image"
                width={504}
                height={504}
              />
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 bg-rose-800 py-24 sm:px-24 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="w-1/2 text-center md:order-1">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="z-1 tex-center text-4xl font-bold text-white">
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
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-white px-2 py-2 text-center text-xl text-white hover:bg-white hover:text-rose-800 md:w-1/2"
                    href="/Store"
                  >
                    Purchase
                  </Link>
                </div>
              </div>
              <Image
                src="/fromNothingToNothing.png"
                alt="From Nothing To Nothing Album Cover"
                width={504}
                height={504}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Music;
