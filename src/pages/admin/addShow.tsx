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

type AddShowForm = {
  date: string;
  time: string;
  location: string;
  name: string;
  bandsintown_link: string;
  ticket_link: string;
};

const AddShow: NextPage = () => {
  const { register, handleSubmit } = useForm<AddShowForm>();
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

  const createShow = api.shows.create.useMutation();

  const onSubmit = (formData: AddShowForm) => {
    createShow.mutateAsync({ ...formData }).then(() => window.alert("Success"));
  };

  return (
    <>
      <Head>
        <title>New Show</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          <h1 className="text-4xl text-white">
            Create a listing for a new show
          </h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Show Name
              </label>
              <input
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                id="date"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="enter the string you would like to have displayed for the date i.e Jan. 01, 2023"
                {...register("date", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Time
              </label>
              <input
                id="time"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="enter full time string i.e 7:00 p.m"
                {...register("time", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <input
                id="location"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="i.e Minneapolis, MN"
                {...register("location", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="bandsintown_link"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Bands in town link for sharing
              </label>
              <input
                id="bandsintown_link"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("bandsintown_link", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="ticket_link"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Ticket Link
              </label>
              <input
                id="ticket_link"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("ticket_link", { required: true })}
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

export default AddShow;