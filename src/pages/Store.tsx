import { type NextPage } from "next";
import Head from "next/head";
//import Link from "next/link";
//import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Store: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "Scalise Store" });

  return (
    <>
      <Head>
        <title>Store</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
          </div>
      </main>
    </>
  );
};

export default Store;