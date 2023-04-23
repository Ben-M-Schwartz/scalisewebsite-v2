/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { product_details } from "~/db/schema";
import { type InferModel } from "drizzle-orm";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

type Product = InferModel<typeof product_details, "select">;

import { api } from "~/utils/api";

import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

type removeForm = {
  product_id: string;
};

function Card({ product }: { product: Product }) {
  const remove = api.inventory.remove.useMutation();
  const router = useRouter();
  const { register, handleSubmit } = useForm<removeForm>();

  const handleRemove = (formData: removeForm) => {
    try {
      remove.mutate({ product_id: parseInt(formData.product_id) });
      window.alert("success");
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-700">
      <div className="relative h-32 w-full">
        <Image
          className="object-cover"
          src={`/${product.image as string}.png`}
          alt="image"
          fill
        />
      </div>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name} - ${product.price}
          </h5>
        </a>
        <form onSubmit={handleSubmit(handleRemove)}>
          <input
            id="product_id"
            type="hidden"
            value={product.id}
            {...register("product_id")}
          />
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Remove
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
      </div>
    </div>
  );
}

const removeProduct: NextPage = () => {
  const products = api.inventory.list.useQuery();

  return (
    <>
      <Head>
        <title>Remove</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="mt-12 pl-4 text-4xl text-white">
          Which product would you like to remove from the website?
        </h1>
        <div className="container grid grid-cols-3 items-center justify-center gap-4">
          {products?.data?.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <Link
          href="/admin/home"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Admin Home
        </Link>
      </main>
    </>
  );
};

export default removeProduct;
