import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { product_details } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
import { useState } from "react";
type Product = InferModel<typeof product_details, "select">;

import { motion, AnimatePresence } from "framer-motion";

import banner from "../../public/porchPhoto.jpg";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

//import { api } from "~/utils/api";

function Card({ product, index }: { product: Product; index: number }) {
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
              className=""
              src={`/${images[0] as string}`}
              alt="image"
              height={360}
              width={423}
              priority={index <= 2}
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
          <h4 className="mb-2 text-xl font-bold tracking-tight text-white">
            {product.name}
          </h4>
          <h5 className="mb-2 text-lg tracking-tight text-white">
            ${product.price}
            {product.price! % 1 === 0 ? ".00" : ""}
          </h5>
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
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="relative flex w-full items-center justify-center bg-transparent">
          <Image
            src={banner}
            alt="background photo"
            fill
            quality={75}
            className="absolute z-0 object-cover object-[0%_35%]"
            priority
          />
          <h1 className="z-10 py-24 text-center text-8xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            STORE
          </h1>
        </div>
        <div className="container flex flex-col items-center justify-center gap-4 pt-16 sm:grid sm:grid-cols-2 sm:items-start sm:justify-center lg:grid-cols-3">
          {products.map((product, index) => (
            <Card key={product.id} product={product} index={index} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Store;
