/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { product_details } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
//import { SignIn } from "@clerk/clerk-react";
//import { useAuth } from "@clerk/nextjs";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

type Product = InferModel<typeof product_details, "select">;

import { api } from "~/utils/api";

import { useForm } from "react-hook-form";

type saleForm = {
  product_id: string;
  sale_price: string;
};

function Card({ product }: { product: Product }) {
  const addsale = api.inventory.addSale.useMutation();
  const removeSale = api.inventory.removeSale.useMutation();
  const { register, handleSubmit } = useForm<saleForm>();

  const handleAddSale = (formData: saleForm) => {
    try {
      addsale.mutate({
        product_id: parseInt(formData.product_id),
        sale_price: parseFloat(formData.sale_price),
      });
      window.alert("success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = () => {
    try {
      removeSale.mutate({
        product_id: product.id,
      });
      window.alert("success");
    } catch (error) {
      console.error(error);
    }
  };

  const images = (product.image as string).split(",");

  return (
    <div className="max-w-sm rounded-lg bg-transparent">
      <div className="relative h-full w-full">
        <Image
          className="rounded-lg"
          src={`/${images[0] as string}`}
          alt="image"
          height={360}
          width={423}
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-stone-100">
          {product.name} - ${product.price}
        </h5>
        {product.sale_price === null && (
          <form onSubmit={handleSubmit(handleAddSale)}>
            <input
              id="product_id"
              type="hidden"
              value={product.id}
              {...register("product_id")}
            />
            <label htmlFor="sale_price" className="text-stone-100">
              Sale Price:
            </label>
            <input
              id="sale_price"
              type="number"
              className="bg-stone-100"
              {...register("sale_price")}
            />
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
            >
              Add Sale
              <svg
                aria-hidden="true"
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </form>
        )}
        {product.sale_price !== null && (
          <button
            onClick={handleRemove}
            className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          >
            Remove Sale
            <svg
              aria-hidden="true"
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

const removeProduct: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //const { isLoaded, userId } = useAuth();
  const products = api.inventory.list.useQuery();
  // if (!isLoaded)
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
  //       <div className="text-stone-100">Loading...</div>;
  //     </main>
  //   );
  // if (!userId) {
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
  //       <h1 className="text-2xl text-stone-100">
  //         This page is for band members only
  //       </h1>
  //       <div>
  //         <SignIn redirectUrl="/admin/removeProduct" />
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <Link
          href="/admin/home"
          className="py-6 text-xl font-bold text-stone-100 underline hover:text-red-800 active:text-red-950"
        >
          Admin Home
        </Link>
        <div className="container flex flex-col items-center justify-center gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:justify-center lg:grid-cols-3">
          {products?.data?.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default removeProduct;
