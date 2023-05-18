import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import excited from "../../../public/excited.webp";
//import { type NextRequest } from "next/server";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const useSubscribe = () => {
  const subscribe = api.email.subscribe.useMutation();
  return async (token: string) => subscribe.mutateAsync({ token });
};

const Confirm: NextPage = () => {
  const router = useRouter();
  const token = router.query.token as string;
  /* const token = new URL(
    `${window.location.origin}${router.asPath}`
  ).searchParams.get("token"); */
  const subscribe = useSubscribe();
  const [loading, setLoading] = useState(true);
  const [invalidLink, setInvalid] = useState(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (token) {
      subscribe(token)
        .then(() => {
          setInvalid(false);
          setLoading(false);
        })
        .catch(() => {
          //console.error(error);
          setInvalid(true);
          setLoading(false);
        });
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>Confirm</title>
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        {invalidLink && loading && (
          <div className="flex flex-row justify-between gap-2 text-white">
            <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
            <p className="flex">Loading...</p>
          </div>
        )}
        {invalidLink && !loading && (
          <>
            <p className="text-white">
              This confirmation link is no longer valid
            </p>
            <Link
              href="/"
              className="text-center text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
            >
              Home
            </Link>
          </>
        )}
        {!invalidLink && loading && <p className="text-white">Loading...</p>}
        {!invalidLink && !loading && (
          <>
            <div className="absolute left-0 top-16 flex w-full justify-center bg-transparent md:top-20">
              <Image
                src={excited}
                alt="background photo"
                fill
                quality={75}
                className="absolute z-0 object-cover object-[0%_15%]"
                priority
              />
              <h1 className="z-10 py-24 text-center text-5xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-6xl md:text-8xl">
                CONFIRMED
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="w-5/6 text-center text-2xl text-white md:w-full">
                You Are Now Subscribed! You will start receiving emails from
                SCALISE
              </p>
              <Link
                href="/"
                className="text-center text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
              >
                Home
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Confirm;
