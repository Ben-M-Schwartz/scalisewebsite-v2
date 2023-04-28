/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        {!isUnsubscribed && (
          <>
            <h1 className="text-white">
              Are you sure you want to unsubscribe from the Scalise newsletter?
            </h1>
            <button
              onClick={handleUnsubscribe}
              className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
