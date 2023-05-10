import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useState } from "react";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Product: NextPage = () => {
  const [isUnsubscribed, setUnsubscribed] = useState(false);

  const router = useRouter();
  const email = router.query.email as string;
  const unsubscribe = api.subscription.unsubscribe.useMutation();

  const handleUnsubscribe = () => {
    unsubscribe.mutate({ email: email });
    setUnsubscribed(true);
  };

  return (
    <>
      <Head>
        <title>Unsubscribe</title>
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
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        {!isUnsubscribed && (
          <>
            <h1 className="text-white">
              Are you sure you want to unsubscribe from the Scalise newsletter?
            </h1>
            <button
              onClick={handleUnsubscribe}
              className="ocus:shadow-outline text-xsl w-full rounded-sm border-2 border-white bg-rose-700 py-4 text-center text-white hover:border-rose-700 hover:bg-white hover:text-rose-700 active:bg-rose-400"
            >
              Yes
            </button>
          </>
        )}
        {isUnsubscribed && (
          <>
            <p className="text-white">You are now unsubscribed</p>
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
            >
              Home
            </Link>
          </>
        )}
      </main>
    </>
  );
};

export default Product;
