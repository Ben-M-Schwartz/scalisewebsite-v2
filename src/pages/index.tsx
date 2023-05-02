import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

const Home: NextPage = () => {
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
          {/*           <div className="z-0">
            <video
              src="/TellMeYouNeedMe.mp4"
              playsInline
              autoPlay
              loop
              muted
              preload="auto"
              className="absolute z-0"
            />
          </div> */}

          <div className="flex flex-col gap-20 pb-20">
            <video
              src="/TellMeYouNeedMe.mp4"
              playsInline
              autoPlay
              loop
              muted
              className="absolute z-0 h-full object-cover"
            />
            <div className="z-10 flex flex-col items-center justify-center gap-3 pt-20 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="md:order-0 w-1/2 text-center md:h-1/2 md:w-1/2 lg:h-2/3 lg:w-2/3">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="text-center text-4xl font-bold text-white">
                    TRANSFERRED TO HOUSTON
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-white py-2 text-center text-xl text-white hover:bg-white hover:font-bold hover:text-rose-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/transferred-to-houston"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2 lg:h-2/3 lg:w-2/3">
                <Image
                  src="/transferred.png"
                  alt="Transferred To Houston Image"
                  width={504}
                  height={504}
                />
              </div>
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="w-1/2 text-center md:order-1 md:h-1/2 md:w-1/2 lg:h-2/3 lg:w-2/3">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="z-1 tex-center text-4xl font-bold text-white">
                    REST OF THE WEEK
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-white py-2 text-center text-xl text-white hover:bg-white hover:font-bold hover:text-rose-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/rest-of-the-week"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2 lg:h-2/3 lg:w-2/3">
                <Image
                  src="/restOfTheWeek.png"
                  alt="Rest Of The Week Image"
                  width={504}
                  height={504}
                />
              </div>
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="md:order-0 w-1/2 text-center md:h-1/2 md:w-1/2 lg:h-2/3 lg:w-2/3">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="z-1 tex-center text-4xl font-bold text-white">
                    FRUIT SNACKS
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-white px-2 py-2 text-center text-xl text-white hover:bg-white hover:font-bold hover:text-rose-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/fruit-snacks"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2 lg:h-2/3 lg:w-2/3">
                <Image
                  src="/fruitSnacks.jpeg"
                  alt="Fruit Snacks Image"
                  width={504}
                  height={504}
                />
              </div>
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="w-1/2 text-center md:order-1 md:h-1/2 md:w-1/2 lg:h-2/3 lg:w-2/3">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="tex-center text-4xl font-bold text-white">
                    TELL ME YOU NEED ME
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-white py-2 text-center text-xl text-white hover:bg-white hover:font-bold hover:text-rose-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/tell-me-you-need-me"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2 lg:h-2/3 lg:w-2/3">
                <Image
                  src="/tellMeYouNeedMe.jpeg"
                  alt="Tell Me You Need Me Image"
                  width={504}
                  height={504}
                />
              </div>
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="md:order-0 w-1/2 text-center md:h-1/2 md:w-1/2 lg:h-2/3 lg:w-2/3">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="z-1 tex-center text-4xl font-bold text-white">
                    AIRBAG
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-white py-2 text-center text-xl text-white hover:bg-white hover:font-bold hover:text-rose-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/airbag"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2 lg:h-2/3 lg:w-2/3">
                <Image
                  src="/airbag.jpeg"
                  alt="Airbag Image"
                  width={504}
                  height={504}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
