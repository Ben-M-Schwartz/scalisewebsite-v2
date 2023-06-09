import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

import { useRouter } from "next/router";
import { useEffect } from "react";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

export default function Cancelled() {
  const router = useRouter();
  const { session_id } = router.query;

  const cancelOrder = api.checkout.cancelOrder.useMutation();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (session_id) {
      cancelOrder.mutate({ id: session_id as string });
    }
  }, [session_id]);

  return (
    <>
      <Head>
        <title>Cancellation</title>
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
        <div className="flex flex-col items-center gap-2 text-stone-100">
          <h1>Your payment was cancelled</h1>
          <Link
            href="/Store"
            className="text-center text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-stone-500"
          >
            Back to Store
          </Link>
          <Link
            href="/"
            className="text-center text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-stone-500"
          >
            Home
          </Link>
        </div>
      </main>
    </>
  );
}
