import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Home: NextPage = () => {
  const { isLoaded, userId } = useAuth();
  if (!isLoaded)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <div className="flex flex-row justify-between gap-2 text-stone-100">
          <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
          <p className="flex">Loading...</p>
        </div>
      </main>
    );
  if (!userId) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <h1 className="text-2xl text-stone-100">
          This page is for band members only
        </h1>
        <div>
          <SignIn redirectUrl="/admin/home" />
          <div className="absolute z-10 h-16 w-60 -translate-y-24 translate-x-7 bg-white object-contain sm:-translate-y-20 sm:translate-x-10"></div>
        </div>
      </main>
    );
  }
  return (
    <>
      <Head>
        <title>Admin</title>
        <link rel="shortcut icon" href="/images/scaliseIcon.png" />
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
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-stone-950">
        <h1 className="text-4xl text-stone-100">Admin Homepage</h1>
        <Link
          href="/admin/newProduct"
          className="text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-red-950"
        >
          Create New Product
        </Link>
        <Link
          href="/admin/removeProduct"
          className="text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-red-950"
        >
          Remove Product
        </Link>
        <Link
          href="/admin/manageSalePrices"
          className="text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-red-950"
        >
          Manage Sale Prices
        </Link>
        <Link
          href="/admin/updateInventory"
          className="text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-red-950"
        >
          Update Inventory
        </Link>
        <Link
          href="/admin/emailEditor"
          className="text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-red-950"
        >
          Create Email
        </Link>
        <Link
          href="/admin/emailMailingList"
          className="text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-red-950"
        >
          Email Mailing List
        </Link>
        <Link
          href="/admin/addShow"
          className="text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-red-950"
        >
          Add New Show
        </Link>
        <Link
          href="/admin/removeShow"
          className="text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-red-950"
        >
          Remove A Show
        </Link>
        <Link
          href="/admin/orders"
          className="text-xl font-bold text-stone-100 hover:text-red-800 hover:underline active:text-red-950"
        >
          View Orders
        </Link>
      </main>
    </>
  );
};

export default Home;
