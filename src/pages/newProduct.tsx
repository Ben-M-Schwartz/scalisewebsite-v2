/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
//import { useRouter } from "next/router";

type SellItemForm = {
  name: string;
  price: string;
  weight: string;
  sizes: string;
  quantities: string;
};

const NewProduct: NextPage = () => {
  const createListing = api.inventory.create.useMutation();

  const { register, handleSubmit } = useForm<SellItemForm>();
  const onSubmit = (formData: SellItemForm) => {
    createListing
      .mutateAsync({
        ...formData
      });
  };

  return (
    <>
      <Head>
        <title>Create A New Product</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          <h1 className="text-4xl">Create A New Product</h1>
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
              <textarea
                id="weight"
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
              <textarea
                id="weight"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("sizes", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="quantities"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Quantites
              </label>
              <textarea
                id="quantities"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("quantities", { required: true })}
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
      </main>
    </>
  );
};

export default NewProduct;