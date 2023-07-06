/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

type NewProductForm = {
  name: string;
  price: string;
  weight: string;
  sizes: string;
  quantities: string;
  imageName: string;
  store_order: string;
  description: string | null;
};

const NewProduct: NextPage = () => {
  const { register, handleSubmit } = useForm<NewProductForm>();
  const { isLoaded, userId } = useAuth();

  const createProduct = api.inventory.create.useMutation();

  const onSubmit = (formData: NewProductForm) => {
    createProduct
      .mutateAsync({
        name: formData.name,
        sizes: formData.sizes || "",
        price: parseFloat(formData.price),
        description: formData.description || "",
        weight: parseFloat(formData.weight),
        quantities: formData.quantities,
        imageName: formData.imageName,
        is_taxed: 0,
        store_order: parseInt(formData.store_order) || 1,
      })
      .then(() => window.alert("Success"))
      .catch((error) => console.error(error));
  };

  if (!isLoaded)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <div>Loading...</div>;
      </main>
    );
  if (!userId) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <h1 className="text-2xl text-stone-100">
          This page is for band members only
        </h1>
        <div>
          <SignIn redirectUrl="/admin/newProduct" />
          <div className="absolute z-10 h-16 w-60 -translate-y-24 translate-x-7 bg-white object-contain sm:-translate-y-20 sm:translate-x-10"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Create A New Product</title>
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
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          <h1 className="text-4xl text-stone-100">Create A New Product</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Item Name (note: include a &lsquo;-&rsquo; in the name will
                cause an error in the store. If we want to be able to add those
                it will require refactoring a bit of logic)
              </label>
              <input
                id="name"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("name", { required: true })}
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
                id="price"
                type="number"
                min="0"
                step=".01"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("price", { required: true })}
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
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("weight", { required: true })}
              />
            </div>

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
                {...register("sizes", { required: false })}
              />
            </div>

            <div>
              <label
                htmlFor="quantities"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Quantites
              </label>
              <input
                id="quantities"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("quantities", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="quantities"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Image Names (if multiple images list them in the order you wish
                displayed on the store i.e image1.png, image2.png, image3.png)
                (note: The image must be uploaded into the public folder in this
                directory. Include the file type in the image name i.e
                image.png)
              </label>
              <input
                id="imageName"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("imageName", { required: true })}
              />
            </div>

            {/*             <div>
              <label
                htmlFor="is_taxed"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Is it taxed? (1 for yes 0 for no)
              </label>
              <input
                id="is_taxed"
                className="block w-full rounded-lg border p-2.5 text-sm border-gray-600 :bg-gray-700 text-stone-100 placeholder-gray-400"
                {...register("is_taxed", { required: true })}
              />
            </div> */}

            <div>
              <label
                htmlFor="store_order"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                What location in the order of the store display? (Defaults to
                the first spot index 1)
              </label>
              <input
                id="store_order"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("store_order", { required: false })}
              />
            </div>

            <button
              type="submit"
              className="mb-2 mr-2 rounded-lg bg-red-800 px-5 py-2.5 text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
            >
              Create
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default NewProduct;
