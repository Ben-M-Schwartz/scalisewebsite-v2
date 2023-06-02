import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartContext, type CartContextType } from "~/pages/_app";
import { useEffect, useContext } from "react";
import Image from "next/image";
import excited from "../../../public/excited.webp";

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
  const subscribe = api.email.confirm.useMutation();

  const { cartAmount, updateAmount } = useContext<CartContextType>(CartContext);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (session_id) {
      clearCart
        .mutateAsync({ cart_id: cart_id })
        .then(() => updateAmount(-cartAmount))
        .catch((error) => console.error(error));
    }
  }, [session_id]);

  //TODO: Add a button to sign up for mailing list
  const queryResult = api.orders.getEmail.useQuery(
    { session_id: session_id as string },
    { enabled: session_id !== undefined }
  );
  const email = queryResult.data;

  return (
    <>
      <Head>
        <title>Confirmation</title>
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
      <main className="flex min-h-screen flex-col items-center justify-start bg-stone-950 text-stone-100">
        <div className="relative flex w-full justify-center bg-transparent">
          <Image
            src={excited}
            alt="background photo"
            fill
            quality={100}
            className="absolute z-0 object-cover object-[0%_15%]"
            priority
          />
          <h1 className="z-10 py-24 text-center text-5xl text-stone-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-6xl md:text-8xl">
            SUCCESS
          </h1>
        </div>
        {session_id && (
          <div className="relative pt-20">
            <h1 className="pt-10 text-center">Payment Successful!</h1>
            <p className="text-center">Thank you for your purchase.</p>
            <p className="text-center">Check your email for order details.</p>
          </div>
        )}
        <Link
          href="/"
          className="text-xl font-bold text-red-800 underline hover:text-red-900 active:text-gray-500"
        >
          Back to Home
        </Link>
        <button
          onClick={() => {
            subscribe
              .mutateAsync({
                email: email as string,
                url: window.location.origin,
              })
              .then(() => window.alert("Success"))
              .catch(() =>
                window.alert(
                  "An unexpected error occured\nPlease enter your email in the subscribe form at the bottom of the page"
                )
              );
          }}
          className="mt-20 rounded-sm border bg-red-800 px-6 py-2 text-center text-white hover:border-red-800 hover:bg-white hover:text-red-800 active:bg-gray-300"
        >
          Join Mailing List
        </button>
      </main>
    </>
  );
};

export default SuccessPage;
