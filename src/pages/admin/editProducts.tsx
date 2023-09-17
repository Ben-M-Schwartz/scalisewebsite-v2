/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { useForm } from "react-hook-form";
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

type ProductForm = {
  name: string | undefined;
  price: number | undefined;
  weight: number | undefined;
  imageName: string | undefined;
  description: string | undefined;
};

type saleForm = {
  sale_price: number;
};

function AddSale({ product }: { product: Product }) {
  const addsale = api.inventory.addSale.useMutation();
  const { register, handleSubmit } = useForm<saleForm>();

  const handleAddSale = (formData: saleForm) => {
    addsale
      .mutateAsync({
        product_id: product.id,
        sale_price: formData.sale_price,
      })
      .then(() => {
        window.alert("success");
      })
      .catch((error) => console.error(error));
  };

  return (
    <dialog
      id={`${product.id}_saleForm`}
      className="bg-stone-950 text-stone-100"
    >
      <form onSubmit={handleSubmit(handleAddSale)}>
        <label htmlFor="sale_price" className="text-stone-100">
          Sale Price:
        </label>
        <input
          id="sale_price"
          type="number"
          min="0"
          step=".01"
          className="bg-stone-100 text-stone-950"
          {...register("sale_price", { required: true, valueAsNumber: true })}
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
    </dialog>
  );
}

function EditProduct({ product }: { product: Product }) {
  const { register, handleSubmit } = useForm<ProductForm>();
  const updateProduct = api.inventory.updateProductInfo.useMutation();

  const onSubmit = (formData: ProductForm) => {
    updateProduct
      .mutateAsync({
        product_id: product.id,
        name: formData.name || (product.name as string),
        price: formData.price || (product.price as number),
        description: formData.description || (product.description as string),
        weight: formData.weight || (product.weight as number),
        imageName: formData.imageName || (product.image as string),
      })
      .then(() => {
        window.alert("Success");
        (
          document.getElementById(`${product.id}_editForm`) as HTMLDialogElement
        ).close();
      })
      .catch((error) => {
        window.alert("An error occured please tell Ben");
        console.error(error);
        (
          document.getElementById(`${product.id}_editForm`) as HTMLDialogElement
        ).close();
      });
  };

  return (
    <dialog
      id={`${product.id}_editForm`}
      className="bg-stone-950 text-stone-100"
    >
      <h1>Enter the info you would like to change</h1>
      <br />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-stone-100"
          >
            Item Name (note: include a &lsquo;-&rsquo; in the name will cause an
            error in the store)
          </label>
          <input
            id="name"
            placeholder={product.name as string}
            className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
            {...register("name", { required: false })}
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-stone-100"
          >
            Price
          </label>
          <input
            placeholder={(product.price as number).toString()}
            id="price"
            type="number"
            min="0"
            step=".01"
            className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
            {...register("price", { required: false, valueAsNumber: true })}
          />
        </div>

        <div>
          <label
            htmlFor="desc"
            className="mb-2 block text-sm font-medium text-stone-100"
          >
            Description (optional)
          </label>
          <textarea
            id="desc"
            maxLength={999}
            placeholder={product.description as string}
            className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
            {...register("description", { required: false })}
          />
        </div>

        <div>
          <label
            htmlFor="weight"
            className="mb-2 block text-sm font-medium text-stone-100"
          >
            Weight (oz)
          </label>
          <input
            id="weight"
            type="number"
            step=".01"
            min="0"
            placeholder={(product.weight as number).toString()}
            className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
            {...register("weight", { required: false, valueAsNumber: true })}
          />
        </div>

        <div>
          <label
            htmlFor="quantities"
            className="mb-2 block text-sm font-medium text-stone-100"
          >
            Image Names (if multiple images list them in the order you wish
            displayed on the store i.e image1.png, image2.png, image3.png)
          </label>
          <label
            htmlFor="quantities"
            className="mb-2 block text-sm font-medium text-stone-100"
          >
            (note: The image must be uploaded to the github repo through the
            upload link on the new product page. Include the file type in the
            image name i.e image.png)
          </label>
          <input
            id="imageName"
            placeholder={product.image as string}
            className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
            {...register("imageName", { required: false })}
          />
        </div>

        <button
          type="submit"
          className="mb-2 mr-2 rounded-lg bg-red-800 px-5 py-2.5 text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
        >
          Update
        </button>
      </form>
    </dialog>
  );
}

function UpdateInventory({
  product,
  productInventory,
}: {
  product: Product;
  productInventory: Inventory[];
}) {
  const [operation, setOperation] = useState("+");
  const update = api.inventory.updateInventory.useMutation();
  const sendNotifications = api.email.notify.useMutation();
  const removeSize = api.inventory.removeSize.useMutation();
  const addSizes = api.inventory.addSizes.useMutation();
  const [sizes, setSizes] = useState<sizesArray>([]);

  const [showAddSizesForm, setSizeForm] = useState(false);
  const { register, handleSubmit } = useForm<{
    sizes: string;
    quantities: string;
  }>();

  const handleRemoveSize = (size: string) => {
    removeSize
      .mutateAsync({ product_id: product.id, size: size })
      .then(() => window.alert("success"))
      .catch((error) => {
        window.alert("An error occured please tell Ben");
        console.error(error);
      });
  };

  const handleAddSizes = (formData: { sizes: string; quantities: string }) => {
    addSizes
      .mutateAsync({
        product_id: product.id,
        sizes: formData.sizes,
        quantities: formData.quantities,
      })
      .then(() => {
        window.alert("success");
        setSizeForm(false);
      })
      .catch(() => {
        window.alert("An error occured please tell Ben");
        setSizeForm(false);
      });
  };

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
    Promise.allSettled(updatePromises)
      .then(() => {
        window.alert("success");
        (
          document.getElementById(
            `${product.id}_updateInventory`
          ) as HTMLDialogElement
        ).close();
      })
      .catch((error) => {
        window.alert("An error occured please tell Ben");
        console.error(error);
        (
          document.getElementById(
            `${product.id}_updateInventory`
          ) as HTMLDialogElement
        ).close();
      });
  };
  return (
    <dialog
      id={`${product.id}_updateInventory`}
      className="bg-stone-950 text-stone-100"
    >
      <form onSubmit={handleUpdate} className="text-stone-950">
        <select
          id="operation"
          onChange={(e) => setOperation(e.target.value)}
          className="text-stone-950"
        >
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
          <div key={`${product.id}_${p.size as string}_inventoryUpdate`}>
            <input
              key={p.size}
              id="size"
              type="hidden"
              value={p.size as string}
            />
            <p className="text-gray-100">
              {p.size} - Current Quantity: {p.quantity}
            </p>
            <div className="flex gap-12">
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
              {p.size !== "" && (
                <button
                  onClick={() => handleRemoveSize(p.size as string)}
                  className="inline-flex items-center rounded-lg bg-red-800 px-2 py-1 text-center text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
                >
                  Remove Size
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="my-6 inline-flex items-center rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
        >
          Update Inventory
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
      {/*eslint-disable-next-line @typescript-eslint/no-non-null-assertion*/}
      {productInventory[0]!.size !== "" && (
        //Button was randomly getting focus when dialog was opened so I just put it in a div to stop that from happening
        <div>
          <button
            onClick={() => setSizeForm(true)}
            className="inline-flex items-center rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-red-900 focus:ring-0 focus:ring-transparent active:bg-red-950"
          >
            Add Sizes
          </button>
        </div>
      )}
      {showAddSizesForm && (
        <form onSubmit={handleSubmit(handleAddSizes)}>
          <div>
            <label
              htmlFor="sizes"
              className="mb-2 block text-sm font-medium text-stone-100"
            >
              Sizes (listed as -&gt; S, M, L)
            </label>
            <input
              id="weight"
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
              {...register("sizes", { required: true })}
            />
          </div>

          <div>
            <label
              htmlFor="quantities"
              className="mb-2 block text-sm font-medium text-stone-100"
            >
              Quantites (list in same order as sizes)
            </label>
            <input
              id="quantities"
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
              {...register("quantities", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-red-900 focus:ring-transparent active:bg-red-950"
          >
            Submit
          </button>
        </form>
      )}
    </dialog>
  );
}

function ProductInfo({
  product,
  productInventory,
}: {
  product: Product;
  productInventory: Inventory[];
}) {
  const removeProduct = api.inventory.remove.useMutation();
  const removeSale = api.inventory.removeSale.useMutation();

  const handleRemoveProduct = () => {
    const answer = window.confirm(
      "Are you sure you want to remove this product?"
    );
    if (answer) {
      removeProduct
        .mutateAsync({ product_id: product.id })
        .then(() => {
          window.alert("success");
        })
        .catch((error) => console.error(error));
    } else {
      return;
    }
  };

  const handleRemoveSale = () => {
    removeSale
      .mutateAsync({
        product_id: product.id,
      })
      .then(() => {
        window.alert("success");
      })
      .catch((error) => console.error(error));
  };

  //const router = useRouter();

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
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              (
                document.getElementById(
                  `${product.id}_updateInventory`
                ) as HTMLDialogElement
              ).showModal();
            }}
            className="inline-flex items-center rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
          >
            Update Inventory
          </button>
          <UpdateInventory
            product={product}
            productInventory={productInventory}
          />
          <button
            onClick={() =>
              (
                document.getElementById(
                  `${product.id}_editForm`
                ) as HTMLDialogElement
              ).showModal()
            }
            className="inline-flex items-center rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
          >
            Edit Product Info
          </button>
          <EditProduct product={product} />
          {product.sale_price === null && (
            <>
              <button
                onClick={() =>
                  (
                    document.getElementById(
                      `${product.id}_saleForm`
                    ) as HTMLDialogElement
                  ).showModal()
                }
                className="inline-flex items-center rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
              >
                Add Sale
              </button>
              <AddSale product={product} />
            </>
          )}
          {product.sale_price !== null && (
            <button
              onClick={() => handleRemoveSale()}
              className="inline-flex items-center rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
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
          <button
            onClick={() => handleRemoveProduct()}
            className="inline-flex items-center rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
          >
            Remove Product
          </button>
        </div>
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
        <title>Manage Store</title>
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
          {products?.data?.map((product, index) => (
            <ProductInfo
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
