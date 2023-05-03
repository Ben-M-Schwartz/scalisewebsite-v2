import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { product_details } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
type Product = InferModel<typeof product_details, "select">;

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

//import { api } from "~/utils/api";

function Card({ product }: { product: Product }) {
  return (
    <div className="borderx max-w-sm rounded-lg">
      <Link href={`/Product/${product.id}`}>
        <div className="relative h-full w-full">
          <Image
            className=""
            src={`/${product.image as string}`}
            alt="image"
            height={360}
            width={423}
          />
        </div>
        <div className="p-5">
          <h4 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {product.name}
          </h4>
          <h5 className="mb-2 text-xl tracking-tight text-white">
            ${product.price}
            {product.price! % 1 === 0 ? ".00" : ""}
          </h5>
        </div>
      </Link>
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="mb-8 w-full bg-rose-800">
          <h1 className="py-4 text-center text-8xl text-white sm:py-6 md:py-8 lg:py-10">
            STORE
          </h1>
        </div>
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
