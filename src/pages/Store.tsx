import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { product_details } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
type Product = InferModel<typeof product_details, "select">;

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

import { api } from "~/utils/api";

function Card({ product }: { product: Product }) {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-700">
      <div className="relative h-32 w-full">
        <Image
          className=""
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
        <Link
          href={`/Product/${product.id}`}
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View
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
        </Link>
      </div>
    </div>
  );
}
import { db } from "~/db/db";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const result = await db.select().from(product_details);
  return {
    props: {
      products: result,
    },
  };
};

const Store: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  /*   const { data, isLoading } = api.inventory.list.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const products = data;

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="flex flex-row justify-between gap-2 text-white">
          <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
          <p className="flex">Loading...</p>
        </div>
      </main>
    );
  } */

  const products = props.products as Product[];

  return (
    <>
      <Head>
        <title>STORE-SCALISE</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <h1 className="mt-12 pl-4 text-4xl text-white">Items for Sale</h1>
        <div className="sm: container flex flex-col items-center justify-center gap-4 sm:grid sm:grid-cols-2 sm:items-center sm:justify-center lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Store;

/* 
Doesn't work because it can't find module fs

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";
export const getStaticProps: GetStaticProps = async () => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });
  await helpers.inventory.list.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    revalidate: 1,
  };
}; */

/* export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
}; */

/* 
also doesn't work

interface Props {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const products = api.inventory.list.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    props: {
      products: products.data as Product[],
    },
  };
}; */
