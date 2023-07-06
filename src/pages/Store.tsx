import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { product_details } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
import { useState } from "react";
type Product = InferModel<typeof product_details, "select">;

import { motion, AnimatePresence } from "framer-motion";

import banner from "../../public/Black Crumple Background Darker.webp";
import title from "../../public/Store (Handwritten).webp";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

//import { api } from "~/utils/api";

function Product({ product }: { product: Product }) {
  const images = (product.image as string).split(",");
  const [isHover, setHover] = useState(false);
  return (
    <motion.div
      className="borderx max-w-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            y: { stiffness: 1000, duration: 0.5 },
            opacity: { duration: 0.5 },
          },
        },
      }}
    >
      <Link href={`/Product/${(product.name as string).replace(/\s+/g, "-")}`}>
        <motion.div
          className="relative h-full w-full"
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
        >
          <div className="">
            <Image
              className="rounded-lg"
              src={`/${(images[0] as string).trim()}`}
              alt="image"
              height={360}
              width={423}
            />
          </div>
          {images[1] !== undefined && (
            <AnimatePresence>
              {isHover && (
                <motion.div
                  className="absolute left-0 top-0 hidden sm:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Image
                    className=""
                    src={`/${images[1].trim()}`}
                    alt="image"
                    height={360}
                    width={423}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
        <div className="p-5">
          <div className="flex flex-row justify-between">
            <h4 className="mb-2 text-xl font-bold tracking-tight text-stone-100">
              {product.name}
            </h4>
            <h4
              className={`text-red-600 ${
                product.sale_price === null ? "hidden" : "block"
              }`}
            >
              Sale
            </h4>
          </div>
          <div className="flex flex-row">
            {product.name === "From Nothing To Nothing Digital Download" && (
              <>
                <h5 className="mb-2 pr-2 text-lg tracking-tight text-stone-100">
                  FREE!
                </h5>
              </>
            )}
            {product.name !== "From Nothing To Nothing Digital Download" && (
              <>
                <h5
                  className={`mb-2 pr-2 text-lg tracking-tight text-stone-100 ${
                    product.sale_price === null ? "hidden" : "block"
                  }`}
                >
                  ${product.sale_price}
                  {(product.sale_price as number) % 1 === 0 ? ".00" : ""}
                </h5>
                <h5
                  className={`mb-2 text-lg tracking-tight text-stone-100 ${
                    product.sale_price !== null ? "line-through" : ""
                  }`}
                >
                  ${product.price}
                  {(product.price as number) % 1 === 0 ? ".00" : ""}
                </h5>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
import { db } from "~/db/db";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const result = await db
    .select()
    .from(product_details)
    .orderBy(product_details.store_order);
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-800">
        <div className="flex flex-row justify-between gap-2 text-stone-100">
          <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
          <p className="flex">Loading...</p>
        </div>
      </main>
    );
  } */

  const products = props.products as Product[];
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Head>
        <title>STORE-SCALISE</title>
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
      <div className="fixed left-0 top-16 -z-10 h-full min-h-screen md:top-20">
        <Image
          src={banner}
          alt="background photo"
          width={1496}
          height={2244}
          quality={75}
          className="z-0 min-h-screen object-cover"
          priority
        />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950 bg-transparent bg-fixed">
        <div className="relative flex w-full items-center justify-center bg-transparent">
          <Image
            src={title}
            alt="STORE"
            onLoad={() => setLoaded(true)}
            className={`z-10 p-10 ${loaded ? "block" : "invisible"}`}
            height={210}
            width={281}
          />
        </div>
        <div className="container flex flex-col items-center justify-center gap-4 pt-16 sm:grid sm:grid-cols-2 sm:items-start sm:justify-center lg:grid-cols-3">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Store;
