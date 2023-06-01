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
  const unsubscribe = api.email.unsubscribe.useMutation();

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        {!isUnsubscribed && (
          <>
            <h1 className="text-stone-100">
              Are you sure you want to unsubscribe from the Scalise newsletter?
            </h1>
            <button
              onClick={handleUnsubscribe}
              className="ocus:shadow-outline text-xsl w-full rounded-sm border-2 border-stone-100 bg-red-800 py-4 text-center text-stone-100 hover:border-red-800 hover:bg-stone-100 hover:text-red-800 active:bg-rose-400"
            >
              Yes
            </button>
          </>
        )}
        {isUnsubscribed && (
          <>
            <p className="text-stone-100">You are now unsubscribed</p>
            <Link
              href="/"
              className="text-xl font-bold text-stone-100 hover:text-blue-700 hover:underline active:text-gray-500"
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
