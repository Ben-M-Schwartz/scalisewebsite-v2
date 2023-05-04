/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { product_details, product_quantity } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
type Product = InferModel<typeof product_details, "select">;
type Inventory = InferModel<typeof product_quantity, "select">;
import { api } from "~/utils/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

type sizesArray = {
  size: string;
  updateQuantity: number;
  currentQuantity: number;
}[];

type ValidOperations = "+" | "-" | "set";

function Card({
  product,
  productInventory,
}: {
  product: Product;
  productInventory: Inventory[];
}) {
  const [operation, setOperation] = useState("+");
  const update = api.inventory.update.useMutation();
  const sendNotifications = api.subscription.notify.useMutation();
  const [sizes, setSizes] = useState<sizesArray>([]);

  const router = useRouter();

  const handleUpdate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const updatePromises = [];
    for (const sizeInfo of sizes) {
      updatePromises.push(
        update.mutateAsync({
          product_id: product.id,
          quantity: sizeInfo.updateQuantity,
          size: sizeInfo.size,
          operation: operation as ValidOperations,
        })
      );
      if (sizeInfo.currentQuantity === 0) {
        sendNotifications
          .mutateAsync({
            item_name: product.name as string,
            product_id: product.id,
            size: sizeInfo.size,
          })
          .catch((error) => console.error(error));
      }
    }
    Promise.all(updatePromises)
      .then(() => {
        window.alert("success");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-700">
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
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.name} - ${product.price}
        </h5>
        <form onSubmit={handleUpdate}>
          <select id="operation" onChange={(e) => setOperation(e.target.value)}>
            <option key="+" value="+">
              Add
            </option>
            <option key="-" value="-">
              Remove
            </option>
            <option key="set" value="set">
              Set
            </option>
          </select>
          {productInventory.map((p) => (
            <>
              <input
                key={p.size}
                id="size"
                type="hidden"
                value={p.size as string}
              />
              <p className="text-gray-100">
                {p.size} - Current Quantity: {p.quantity}
              </p>
              <input
                id="quantity"
                type="text"
                onChange={(e) =>
                  setSizes([
                    ...sizes,
                    {
                      size: p.size as string,
                      currentQuantity: p.quantity as number,
                      updateQuantity: parseInt(e.target.value),
                    },
                  ])
                }
              />
            </>
          ))}
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
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

const updateInventory: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  const products = api.inventory.list.useQuery();
  const inventory = api.inventory.listInventory.useQuery();
  interface indexSignature {
    [key: string]: number;
  }
  const allOptions: indexSignature = {
    XXS: 0,
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
    XXXL: 7,
    XXXXL: 8,
  };

  return (
    <>
      <Head>
        <title>Update</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <Link
          href="/admin/home"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Admin Home
        </Link>
        <h1 className="mt-12 pl-4 text-4xl text-white">
          Fill in the inventory changes
        </h1>
        <div className="container flex flex-col items-center justify-center gap-4 sm:grid sm:grid-cols-2 sm:items-center sm:justify-center lg:grid-cols-3">
          {products?.data?.map((product, index) => (
            <Card
              key={index}
              product={product}
              productInventory={
                inventory?.data
                  ?.filter((p) => p.product_id === product.id)
                  .sort((a, b) => {
                    return (
                      allOptions[a.size!.trim()]! - allOptions[b.size!.trim()]!
                    );
                  }) as Inventory[]
              }
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default updateInventory;
