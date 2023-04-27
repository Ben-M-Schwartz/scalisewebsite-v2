import { type NextPage } from "next";
import Head from "next/head";
//import Link from "next/link";
//import { signIn, signOut, useSession } from "next-auth/react";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>CONTACT-SCALISE</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">Contact Page</p>
        </div>
      </main>
    </>
  );
};

export default Contact;
