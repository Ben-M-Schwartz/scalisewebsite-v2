import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
//import { signIn, signOut, useSession } from "next-auth/react";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SCALISE</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            Sorry we are not allowing sign ups
          </p>
          <Link
            href="/"
            className="text-blue-400 underline hover:text-blue-700 active:text-gray-400"
          >
            Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
