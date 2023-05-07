import { type NextPage } from "next";
import Head from "next/head";
//import Link from "next/link";
//import { signIn, signOut, useSession } from "next-auth/react";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

//TODO: Actually make this page
const Music: NextPage = () => {
  return (
    <>
      <Head>
        <title>Music</title>
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
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">EPK Page</p>
        </div>
      </main>
    </>
  );
};

export default Music;
