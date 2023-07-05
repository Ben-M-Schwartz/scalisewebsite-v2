/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useState } from "react";

const Orders: NextPage = () => {
  const [unshipped, setUnshipped] = useState(true);
  const [buttonText, setText] = useState("See All");
  const [queryEnabled, setQueryEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const orders = api.orders.listOrders.useQuery(
    { unshipped_only: unshipped },
    {
      enabled: queryEnabled,
      onSuccess: () => {
        setQueryEnabled(false);
        setLoading(false);
      },
    }
  );
  const handleClick = () => {
    setUnshipped(!unshipped);
    setText(buttonText === "See All" ? "See Only Unshipped" : "See All");
    setQueryEnabled(true);
    setLoading(true);
  };
  const shipped = api.orders.shipped.useMutation();
  const markShipped = async (id: number) => {
    await shipped
      .mutateAsync({ id: id })
      .then(() => {
        setQueryEnabled(true);
      })
      .catch(() =>
        window.alert("Something went wrong, try again or message Ben")
      );
  };
  // if (!isLoaded)
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
  //       <div>Loading...</div>;
  //     </main>
  //   );
  // if (!userId) {
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
  //       <h1 className="text-2xl text-stone-100">
  //         This page is for band members only
  //       </h1>
  //       <div>
  //         <SignIn redirectUrl="/admin/emailEditor" />
  //         <div className="absolute z-10 h-16 w-60 -translate-y-20 translate-x-10 bg-white object-contain"></div>
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <>
      <Head>
        <title>Remove</title>
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
      <main className="flex min-h-screen flex-col items-center bg-stone-950">
        {loading && (
          <div className="flex min-h-screen flex-row items-center justify-between gap-2 text-stone-100">
            <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
            <p className="flex">Loading...</p>
          </div>
        )}
        {!loading && (
          <>
            <h1 className="text-4xl text-stone-100">Orders Page</h1>
            <Link
              href="/admin/home"
              className="py-6 text-xl font-bold text-stone-100 underline underline hover:text-red-800 active:text-red-950"
            >
              Admin Home
            </Link>
            <button
              className="focus:shadow-outline active:bg-red-8000 rounded-lg border border-stone-100 bg-transparent px-2 py-1 text-xs text-stone-100 hover:border-stone-950 hover:bg-gray-100 hover:text-stone-950"
              onClick={() => handleClick()}
            >
              {buttonText}
            </button>
            <div className="flex w-5/6 flex-col gap-10 divide-y divide-stone-100">
              {orders?.data?.map((order) => (
                <div key={order.id} className="w-full pt-10 text-stone-100">
                  <div className="flex flex-row flex-wrap justify-between">
                    <p>{order.item}</p>
                    <p>{order.size}</p>
                    <p>{order.quantity}</p>
                    <p>{order.payment_status}</p>
                    <p>{order.customer_name}</p>
                    <p>{order.customer_email}</p>
                    <p>{order.customer_addressLine1}</p>
                    <p>
                      {order.customer_addressLine2 !== ""
                        ? order.customer_addressLine2
                        : ""}
                    </p>
                    <p>{order.customer_city}</p>
                    <p>{order.customer_state}</p>
                    <p>{order.customer_zip}</p>
                    {order.shipped ? (
                      <p>shipped</p>
                    ) : (
                      <button
                        className="focus:shadow-outline active:bg-red-8000 rounded-lg border border-stone-100 bg-transparent px-2 py-1 text-xs text-stone-100 hover:border-stone-950 hover:bg-gray-100 hover:text-stone-950"
                        onClick={() => markShipped(order.id)}
                      >
                        mark shipped
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Orders;
