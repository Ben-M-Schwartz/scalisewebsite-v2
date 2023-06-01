import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

//importing images for static generation on build to speed up load times
import background from "../../public/Red Background.webp";
import paper_background from "../../public/Black Crumple Background.webp";
import partyPoster from "../../public/releasePartyPoster.webp";
import transferred from "../../public/transferred.webp";
import restOfTheWeek from "../../public/restOfTheWeek.webp";
import fruitSnacks from "../../public/fruitSnacks.webp";
import tmynmImage from "../../public/tellMeYouNeedMe.webp";
import airbag from "../../public/airbag.webp";
import sgky from "../../public/SGKY Cover.png";

import hoodieBack from "../../public/HoodieBack.webp";
import crewFront from "../../public/CrewneckFront.webp";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SCALISE</title>
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
      <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-stone-950">
        <div className="relative min-h-screen w-full pb-20 pt-12">
          <Image
            src={background}
            alt="Red Felt"
            fill
            sizes="1497 827"
            quality={75}
            //style={{ objectFit: "cover" }}
            className="absolute z-0 object-cover"
            priority
          />
          <h1 className="relative pb-6 text-center text-4xl font-semibold text-stone-100 md:text-5xl lg:text-6xl xl:text-7xl">
            ALBUM RELEASE PARTY
          </h1>
          <div className="relative flex flex-col items-center justify-center gap-10 md:flex-row md:gap-20">
            <div className="order-2 flex w-full md:order-1 md:w-1/3">
              <div className="flex flex-col gap-2 lg:gap-3 xl:gap-4">
                <h2 className="order-1 w-3/4 self-center text-left text-3xl font-bold text-stone-100 md:w-full md:text-right xl:text-4xl">
                  JUNE 22
                </h2>
                <h3 className="order-1 w-3/4 self-center text-left  text-xl text-stone-100 md:w-full md:text-right">
                  THE GREEN ROOM
                </h3>
                <h3 className="order-1 w-3/4 self-center  text-left text-xl text-stone-100 md:w-full md:text-right">
                  Minneapolis, MN
                </h3>
                <p className="text-l order-1 w-3/4  self-center pt-4 text-left text-stone-100 md:w-full md:text-right md:text-xl">
                  &quot;Before We Dry Up&quot;, our double LP, is releasing on
                  Friday, June 23rd with the album release show on Thursday,
                  June 22nd at the Green Room in Uptown Minneapolis. Two AWESOME
                  acts, Asparagus and Lily Blue, are going to be opening for us.
                  We&apos;re huge fans of their work and are stoked that they
                  wanted to hop on the bill. We hope to see you all there.
                </p>
                <div className="order-0 flex items-center justify-center md:order-2 md:justify-end xl:mt-12">
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="mb-8 flex w-1/2 flex-col justify-center rounded-sm border-8 border-stone-100 py-4 text-center text-xl text-stone-100 hover:bg-stone-100 hover:font-bold hover:text-stone-950 md:mb-0 md:py-2 xl:py-4"
                    href="https://www.greenroommn.com/events#/events?event_id=73908"
                  >
                    Tickets
                  </Link>
                </div>
              </div>
            </div>
            <div className="order-1 h-full w-2/3 sm:w-1/2 md:order-2 md:w-1/3">
              <Image
                src={partyPoster}
                alt="release party"
                width={386}
                height={579}
              />
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <Image
            src={paper_background}
            alt="Red Felt"
            fill
            sizes="1497 827"
            quality={75}
            //style={{ objectFit: "cover" }}
            className="absolute z-0 h-full object-cover"
          />
          <div className="relative z-10 flex flex-col items-center gap-10 py-24">
            <h1 className="text-5xl text-stone-100">NEW MERCH!</h1>
            <h2 className="text-2xl text-stone-100">
              Screen Printed and vinyl pressed by the band
            </h2>
            <div className="flex w-1/2 flex-col items-center justify-center gap-4 md:flex-row">
              <Image
                src={hoodieBack}
                alt="New Hoodie"
                width={393}
                height={394}
                className="md:w-1/2"
              />
              <Image
                src={crewFront}
                alt="New Crewneck Sweatshirt"
                className="md:w-1/2"
              />
            </div>
            <Link
              href="/Store"
              className="flex flex-col justify-center rounded-sm bg-stone-100 px-8 py-4 text-center text-xl text-stone-950 hover:bg-stone-300 hover:text-red-800"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="relative min-h-screen w-full">
          <div className="flex flex-col gap-20 pb-20">
            <Image
              src={background}
              alt="Red Felt"
              fill
              quality={75}
              //style={{ objectFit: "cover" }}
              className="absolute z-0 h-full object-cover"
            />
            <div className="z-10 flex flex-col items-center justify-center gap-3 pt-20 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="w-1/2 text-center md:order-1 md:h-1/2 md:w-1/2">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="z-1 tex-center text-4xl font-bold text-stone-100">
                    She&apos;s Gonna Kill You
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-stone-100 py-2 text-center text-xl text-stone-100 hover:bg-stone-100 hover:font-bold hover:text-red-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/shes-gonna-kill-you"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2">
                <Image
                  src={sgky}
                  alt="Rest Of The Week Image"
                  width={504}
                  height={504}
                />
              </div>
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="md:order-0 w-1/2 text-center md:h-1/2 md:w-1/2">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="text-center text-4xl font-bold text-stone-100">
                    TRANSFERRED TO HOUSTON
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-stone-100 py-2 text-center text-xl text-stone-100 hover:bg-stone-100 hover:font-bold hover:text-red-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/transferred-to-houston"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2">
                <Image
                  src={transferred}
                  alt="Transferred To Houston Image"
                  width={504}
                  height={504}
                />
              </div>
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="w-1/2 text-center md:order-1 md:h-1/2 md:w-1/2">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="z-1 tex-center text-4xl font-bold text-stone-100">
                    REST OF THE WEEK
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-stone-100 py-2 text-center text-xl text-stone-100 hover:bg-stone-100 hover:font-bold hover:text-red-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/rest-of-the-week"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2">
                <Image
                  src={restOfTheWeek}
                  alt="Rest Of The Week Image"
                  width={504}
                  height={504}
                />
              </div>
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="md:order-0 w-1/2 text-center md:h-1/2 md:w-1/2">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="z-1 tex-center text-4xl font-bold text-stone-100">
                    FRUIT SNACKS
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-stone-100 px-2 py-2 text-center text-xl text-stone-100 hover:bg-stone-100 hover:font-bold hover:text-red-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/fruit-snacks"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2">
                <Image
                  src={fruitSnacks}
                  alt="Fruit Snacks Image"
                  width={504}
                  height={504}
                />
              </div>
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="w-1/2 text-center md:order-1 md:h-1/2 md:w-1/2">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="tex-center text-4xl font-bold text-stone-100">
                    TELL ME YOU NEED ME
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-stone-100 py-2 text-center text-xl text-stone-100 hover:bg-stone-100 hover:font-bold hover:text-red-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/tell-me-you-need-me"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2">
                <Image
                  src={tmynmImage}
                  alt="Tell Me You Need Me Image"
                  width={504}
                  height={504}
                />
              </div>
            </div>

            <div className="z-10 flex flex-col items-center justify-center gap-3 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="md:order-0 w-1/2 text-center md:h-1/2 md:w-1/2">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="z-1 tex-center text-4xl font-bold text-stone-100">
                    AIRBAG
                  </h1>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex w-full flex-col justify-center rounded-sm border-4 border-stone-100 py-2 text-center text-xl text-stone-100 hover:bg-stone-100 hover:font-bold hover:text-red-800 md:w-1/2"
                    href="https://distrokid.com/hyperfollow/scalise/airbag"
                  >
                    Listen Here
                  </Link>
                </div>
              </div>
              <div className="h-1/2 w-1/2">
                <Image
                  src={airbag}
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
