import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
//import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

export const config = {
  runtime: "experimental-edge",
};

const Shows: NextPage = () => {
  //TODO: write database and render logic for easily adding shows
  //TODO: figure out query params for bandsintown
  const shows = api.shows.get.useQuery();
  const remove = api.shows.remove.useMutation();
  return (
    <>
      <Head>
        <title>Shows</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex  min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">Store Page</p>
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
                <div className="flex items-center justify-center gap-10 py-4">
                  <div className="pr-4 font-medium text-gray-100">
                    {show.date}
                  </div>
                  <div className="pr-4 font-medium text-gray-100">
                    {show.location}
                  </div>
                  <div className="pr-4 font-medium text-gray-100">
                    {show.name}
                  </div>
                </div>
                <button
                  onClick={() => remove.mutate({ id: show.id })}
                  className="mb-2 mr-2 inline-block w-auto rounded-lg bg-blue-700 px-10 py-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Shows;
