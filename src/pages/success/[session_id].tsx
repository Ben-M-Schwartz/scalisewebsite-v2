import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { getCookie } from "cookies-next";
import { api } from "~/utils/api";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const SuccessPage: NextPage = () => {
  const router = useRouter();

  const { session_id } = router.query;

  const cart_id = getCookie("cart_id")?.toString() || "not found";
  const clearCart = api.cart.clearCart.useMutation();

  useEffect(() => {
    if (session_id) {
      clearCart
        .mutateAsync({ cart_id: cart_id })
        .catch((error) => console.error(error));
    }
  }, [session_id]);

  return (
    <>
      <Head>
        <title>Confirmation</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800 text-white">
        {session_id && (
          <>
            <h1 className="text-center">Payment Successful!</h1>
            <p className="text-center">Thank you for your purchase.</p>
            <p className="text-center">Check your email for order details</p>
          </>
        )}
        <Link
          href="/"
          className="text-xl font-bold hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Back to Home
        </Link>
      </main>
    </>
  );
};

export default SuccessPage;
