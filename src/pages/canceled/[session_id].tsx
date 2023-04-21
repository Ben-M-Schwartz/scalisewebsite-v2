import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Cancelled() {
  const router = useRouter();
  const { session_id } = router.query;

  const cancelOrder = api.checkout.cancelOrder.useMutation();
  useEffect(() => {
    if (session_id) {
      cancelOrder.mutate({ id: session_id as string });
    }
  }, [session_id]);

  return (
    <>
      <Head>
        <title>Cancellation</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex flex-col items-center gap-2 text-white">
          <h1>Your payment was cancelled</h1>
          <Link
            href="/Store"
            className="text-center text-xl font-bold text-white text-white hover:text-blue-700 hover:underline active:text-gray-500"
          >
            Back to Store
          </Link>
          <Link
            href="/"
            className="text-center text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
          >
            Home
          </Link>
        </div>
      </main>
    </>
  );
}
