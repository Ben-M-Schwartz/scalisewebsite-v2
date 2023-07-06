import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

//importing images for static generation on build to speed up load times
import red_background from "../../public/Red Background.webp";
import black_paper_background from "../../public/black_paper_2.webp";
import white_paper_background from "../../public/White Crumple Background.webp";
import beforewedryup from "../../public/LP2_cover.webp";
import transferred from "../../public/transferred.webp";
import restOfTheWeek from "../../public/restOfTheWeek.webp";
import fruitSnacks from "../../public/fruitSnacks.webp";
import tmynmImage from "../../public/tellMeYouNeedMe.webp";
import airbag from "../../public/airbag.webp";
import sgky from "../../public/SGKY Cover.webp";

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
            src={black_paper_background}
            alt="Black background"
            fill
            sizes="1497 827"
            quality={75}
            //style={{ objectFit: "cover" }}
            className="absolute z-0 object-cover"
            priority
          />
          <div className="relative z-10 flex w-full flex-col items-center justify-center">
            <h1 className="pt-6 text-4xl font-medium text-stone-100 md:text-6xl lg:pt-10 lg:text-7xl">
              BEFORE WE DRY UP
            </h1>
            <h1 className="pt-2 text-2xl font-normal text-stone-100 md:text-3xl lg:pt-4">
              NEW ALBUM OUT NOW
            </h1>
            <Link
              href="https://distrokid.com/hyperfollow/scalise/before-we-dry-up"
              className="my-6 rounded-sm bg-stone-100 px-8 py-2 text-lg text-stone-950 hover:border hover:border-stone-100 hover:bg-stone-950 hover:text-stone-100 active:border active:border-stone-100 active:bg-stone-700 active:text-stone-100 md:px-12 md:text-xl lg:my-10 lg:py-4 lg:text-2xl"
            >
              LISTEN HERE
            </Link>
            <div className="relative flex w-3/4 flex-col items-center md:w-1/2">
              <Image
                src={beforewedryup}
                alt="LP2 Cover Art"
                width={695}
                height={695}
                quality={75}
                priority
              />
            </div>
            <Link
              href="/Product/Before-We-Dry-Up-CD"
              className="mt-6 rounded-sm bg-stone-100 px-8 py-2 text-lg text-stone-950 hover:border hover:border-stone-100 hover:bg-stone-950 hover:text-stone-100 active:border active:border-stone-100 active:bg-stone-700 active:text-stone-100 md:px-12 md:text-xl lg:mt-10 lg:py-4 lg:text-2xl"
            >
              PURCHASE CD
            </Link>
          </div>
        </div>

        <div className="relative w-full">
          <Image
            src={white_paper_background}
            alt="White Background"
            fill
            quality={75}
            className="absolute z-0 h-full object-cover"
          />
          <div className="relative z-10 my-8 flex flex-col items-center justify-center md:flex-row md:gap-6 lg:gap-10 xl:gap-24">
            <div className="flex flex-col items-center justify-center pb-6 md:w-2/5 md:gap-4 lg:w-1/3 lg:gap-10">
              <h1 className="text-center text-4xl font-bold text-stone-950 md:text-5xl xl:text-6xl">
                AIRBAG LIVE
              </h1>
              <h2 className="text-center text-2xl text-stone-950 lg:text-3xl">
                NEW LIVE VIDEO FROM 7TH STREET ENTRY!
              </h2>
            </div>
            <div className="w-5/6 md:w-1/2 xl:w-1/3">
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/QMhLvYWD00Y"
                title="Scalise - Airbag [Live @ 7th St Entry]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="aspect-video"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <Image
            src={black_paper_background}
            alt="Black Background"
            fill
            sizes="1497 827"
            quality={75}
            //style={{ objectFit: "cover" }}
            className="absolute z-0 h-full object-cover"
          />
          <div className="relative z-10 flex flex-col items-center gap-10 py-24">
            <h1 className="text-5xl text-stone-100">NEW MERCH!</h1>
            <h2 className="text-center text-2xl text-stone-100">
              Screen printed and vinyl pressed by the band
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
              src={red_background}
              alt="Red Background"
              fill
              quality={75}
              //style={{ objectFit: "cover" }}
              className="absolute z-0 h-full object-cover brightness-75"
            />
            <div className="z-10 flex flex-col items-center justify-center gap-3 pt-20 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="w-1/2 text-center md:order-1 md:h-1/2 md:w-1/2">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="z-1 tex-center text-4xl font-bold text-stone-100">
                    SHE&apos;S GONNA KILL YOU
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
              <div className="flex h-1/2 w-1/2 flex-col items-center">
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
              <div className="flex h-1/2 w-1/2 flex-col items-center">
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
              <div className="flex h-1/2 w-1/2 flex-col items-center">
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
              <div className="flex h-1/2 w-1/2 flex-col items-center">
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
              <div className="flex h-1/2 w-1/2 flex-col items-center">
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
              <div className="flex h-1/2 w-1/2 flex-col items-center">
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
