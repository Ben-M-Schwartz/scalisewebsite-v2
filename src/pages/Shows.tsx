import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
//import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

const Shows: NextPage = () => {
  //TODO: figure out query params for bandsintown
  const shows = api.shows.get.useQuery();
  return (
    <>
      <Head>
        <title>SHOWS-SCALISE</title>
      </Head>
      <main className="flex min-h-screen  flex-col items-center justify-center bg-gray-800">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">Shows</p>
          {shows.data?.length === 0 && (
            <>
              <p className="text-white">
                We do not currently have any shows booked
              </p>
              <p className="text-white">
                If you would like to book us for a show go to our contact page
                or reach out on social medai
              </p>
            </>
          )}
          {shows.data?.map((show, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="divide-y">
                <div className="flex-row gap-2 text-center sm:flex sm:items-center sm:justify-center sm:gap-10 md:py-4">
                  <div className="pr-4 font-medium text-gray-100">
                    {show.date}
                  </div>
                  <div className="pr-4 font-medium text-gray-100">
                    {show.location}
                  </div>
                  <div className="pr-4 font-medium text-gray-100">
                    {show.name}
                  </div>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="pr-4 text-xl font-bold text-gray-100 hover:text-blue-700 hover:underline active:text-gray-500"
                    href={show.bandsintown_link as string}
                  >
                    Share
                  </Link>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    className="pr-4 text-xl font-bold text-gray-100 hover:text-blue-700 hover:underline active:text-gray-500"
                    href={show.ticket_link as string}
                  >
                    Tickets
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <Link
            className="mb-2 mr-2 inline-block w-auto rounded-lg bg-blue-700 px-10 py-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            href="https://bandsintown.com/artist-subscribe/14899628?
            affil_code=js_www.scalise.band
            &app_id=js_www.scalise.band
            &bg-color=%23ffffff
            &border-color=rgba%28193%2C17%2C35%2C1%29
            &came_from=700
            &cta-bg-color=rgba%28255%2C255%2C255%2C1%29
            &cta-border-color=rgba%28193%2C17%2C35%2C1%29
            &cta-border-radius=0px
            &cta-border-width=1px
            &cta-text-color=rgba%28193%2C17%2C35%2C1%29
            &font=Helvetica
            &play-my-city=false
            &signature=ZZ9a89bd3786a112c99a22dc7645c38bd72185dde34d03958907e235220d40f268
            &spn=0
            &text-color=%23424242
            &utm_campaign=track
            &utm_medium=web&utm_source=widget"
          >
            Follow
          </Link>
        </div>
      </main>
    </>
  );
};

export default Shows;
