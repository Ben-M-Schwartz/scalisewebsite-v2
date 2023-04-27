import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

const Home: NextPage = () => {
  const { isLoaded, userId, orgId } = useAuth();
  if (!isLoaded)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div>Loading...</div>;
      </main>
    );
  if (!userId)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <h1 className="text-2xl text-white">
          This page is for band members only
        </h1>
        <SignIn redirectUrl="/admin" />
      </main>
    );
  if (orgId !== process.env.ADMIN_ORGID) {
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
      <h1 className="text-2xl text-white">
        Sorry you are not authorized to visit this page
      </h1>
    </main>;
  }
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <h1 className="text-white">Admin Homepage</h1>
        <Link
          href="/admin/newProduct"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Create New Product
        </Link>
        <Link
          href="/admin/removeProduct"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Remove Product
        </Link>
        <Link
          href="/admin/updateInventory"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Update Inventory
        </Link>
        <Link
          href="/admin/emailMailingList"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Email Mailing List
        </Link>
        <Link
          href="/admin/addShow"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Add New Show
        </Link>
        <Link
          href="/admin/removeShow"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Remove A Show
        </Link>
      </main>
    </>
  );
};

export default Home;
