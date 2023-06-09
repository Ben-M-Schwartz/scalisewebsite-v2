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
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

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
  const sendNotifications = api.email.notify.useMutation();
  const [sizes, setSizes] = useState<sizesArray>([]);

  //const router = useRouter();

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
        //router.reload();
      })
      .catch((error) => console.error(error));
  };

  const images = (product.image as string).split(",");

  return (
    <div className="max-w-sm rounded-lg border border-stone-500 bg-transparent">
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
            className=":hover:bg-blue-700 inline-flex items-center rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
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
  const { isLoaded, userId } = useAuth();
  const products = api.inventory.list.useQuery();
  const inventory = api.inventory.listInventory.useQuery();

  if (!isLoaded)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <div>Loading...</div>;
      </main>
    );
  if (!userId)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <h1 className="text-2xl text-stone-100">
          This page is for band members only
        </h1>
        <div>
          <SignIn redirectUrl="/admin/updateInventory" />
          <div className="absolute z-10 h-16 w-60 -translate-y-24 translate-x-7 bg-white object-contain sm:-translate-y-20 sm:translate-x-10"></div>
        </div>
      </main>
    );

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
        <h1 className="mt-12 pl-4 text-4xl text-stone-100">
          Fill in the inventory changes
        </h1>
        <div className="container flex flex-col items-center justify-center gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:justify-center lg:grid-cols-3">
          {products?.data?.map((product, index) => (
            <Card
              key={index}
              product={product}
              productInventory={
                inventory?.data
                  ?.filter((p) => p.product_id === product.id)
                  .sort((a, b) => {
                    return (
                      (allOptions[(a.size as string).trim()] as number) -
                      (allOptions[(b.size as string).trim()] as number)
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
