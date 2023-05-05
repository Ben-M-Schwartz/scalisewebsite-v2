import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import excited from "../../../public/excited.png";

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
      <main className="flex min-h-screen flex-col items-center justify-start bg-gray-800 text-white">
        <div className="relative flex w-full justify-center bg-transparent">
          <Image
            src={excited}
            alt="background photo"
            fill
            quality={75}
            className="absolute z-0 object-cover object-[0%_15%]"
            priority
          />
          <h1 className="z-10 py-24 text-center text-8xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            SUCCESS
          </h1>
        </div>
        {session_id && (
          <>
            <h1 className="pt-10 text-center">Payment Successful!</h1>
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
