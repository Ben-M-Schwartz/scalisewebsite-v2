/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

type NewProductForm = {
  name: string;
  price: string;
  weight: string;
  sizes: string;
  quantities: string;
  imageName: string;
  is_taxed: number;
};

const NewProduct: NextPage = () => {
  const { register, handleSubmit } = useForm<NewProductForm>();
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

  const createProduct = api.inventory.create.useMutation();

  const onSubmit = (formData: NewProductForm) => {
    createProduct
      .mutateAsync({
        name: formData.name,
        sizes: formData.sizes || "",
        price: parseFloat(formData.price),
        weight: parseFloat(formData.weight),
        quantities: formData.quantities,
        imageName: formData.imageName,
        is_taxed: formData.is_taxed,
      })
      .then(() => window.alert("Success"));
  };

  return (
    <>
      <Head>
        <title>Create A New Product</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          <h1 className="text-4xl text-white">Create A New Product</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Item Name
              </label>
              <input
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step=".01"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("price", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="weight"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Weight
              </label>
              <input
                id="weight"
                type="number"
                step=".01"
                min="0"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("weight", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="sizes"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Sizes
              </label>
              <input
                id="weight"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("sizes", { required: false })}
              />
            </div>

            <div>
              <label
                htmlFor="quantities"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Quantites
              </label>
              <input
                id="quantities"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("quantities", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="quantities"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Image Name
              </label>
              <input
                id="imageName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("imageName", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="is_taxed"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Is it taxed? (1 for yes 0 for no)
              </label>
              <input
                id="is_taxed"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("is_taxed", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </form>
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

export default NewProduct;
