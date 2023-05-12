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

type AddShowForm = {
  date: string;
  time: string;
  location: string;
  name: string;
  maps_link: string;
  bandsintown_link: string;
  ticket_link: string;
};

const AddShow: NextPage = () => {
  const { register, handleSubmit } = useForm<AddShowForm>();
  const { isLoaded, userId } = useAuth();

  const createShow = api.shows.create.useMutation();

  const onSubmit = (formData: AddShowForm) => {
    createShow
      .mutateAsync({ ...formData })
      .then(() => window.alert("Success"))
      .catch((error) => console.error(error));
  };

  if (!isLoaded)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div>Loading...</div>;
      </main>
    );
  if (!userId) {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    document.onkeydown = function (e) {
      if (e.key === "F12") {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === "i") {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === "c") {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === "j") {
        return false;
      }
      if (e.ctrlKey && e.key === "u") {
        return false;
      }
    };
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <h1 className="text-2xl text-white">
          This page is for band members only
        </h1>
        <div>
          <SignIn redirectUrl="/admin/addShow" />
          <div className="absolute z-10 h-16 w-60 -translate-y-20 translate-x-10 bg-white object-contain"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>New Show</title>
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <Link
          href="/admin/home"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Admin Home
        </Link>
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
                className="mb-2 block text-sm font-medium text-white"
              >
                Show Name
              </label>
              <input
                id="name"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-medium text-white"
              >
                Date
              </label>
              <input
                id="date"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="enter the string you would like to have displayed for the date i.e Jan. 01, 2023"
                {...register("date", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="mb-2 block text-sm font-medium text-white"
              >
                Time
              </label>
              <input
                id="time"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="enter full time string i.e 7:00 p.m"
                {...register("time", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-white"
              >
                Location
              </label>
              <input
                id="location"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="i.e Minneapolis, MN"
                {...register("location", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="maps_link"
                className="mb-2 block text-sm font-medium text-white"
              >
                Google Maps Link
              </label>
              <input
                id="maps_link"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                {...register("maps_link", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="bandsintown_link"
                className="mb-2 block text-sm font-medium text-white"
              >
                Link for sharing
              </label>
              <input
                id="bandsintown_link"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                {...register("bandsintown_link", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="ticket_link"
                className="mb-2 block text-sm font-medium text-white"
              >
                Ticket Link
              </label>
              <input
                id="ticket_link"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
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
      </main>
    </>
  );
};

export default AddShow;
