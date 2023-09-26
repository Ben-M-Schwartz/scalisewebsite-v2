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
  location: string;
  name: string;
  maps_link: string;
  bandsintown_link: string;
  ticket_link: string;
  ticket_button_text: string;
};

const AddShow: NextPage = () => {
  const { register, handleSubmit } = useForm<AddShowForm>({
    defaultValues: { ticket_button_text: "Tickets" },
  });
  const { isLoaded, userId } = useAuth();

  const createShow = api.shows.create.useMutation();

  const onSubmit = (formData: AddShowForm) => {
    createShow
      .mutateAsync({ ...formData })
      .then(() => {
        window.alert("Success");
      })
      .catch((error) => {
        window.alert(`An error occured please tell Ben`);
        console.error(error);
      });
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
          <SignIn redirectUrl="/admin/addShow" />
          <div className="absolute z-10 h-16 w-60 -translate-y-24 translate-x-7 bg-white object-contain sm:-translate-y-20 sm:translate-x-10"></div>
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <Link
          href="/admin/home"
          className="py-6 text-xl font-bold text-stone-100 underline hover:text-red-800 active:text-red-950"
        >
          Admin Home
        </Link>
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          <h1 className="text-4xl text-stone-100">
            Create a listing for a new show
          </h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Show Name
              </label>
              <input
                id="name"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Date (Put in format &aposMMM. DD, YYYY&apos Adding th or rd at
                the end of the day will cause it not to render)
              </label>
              <input
                id="date"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                placeholder="enter the string you would like to have displayed for the date i.e Jan. 01, 2023"
                {...register("date", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Location
              </label>
              <input
                id="location"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                placeholder="i.e Minneapolis, MN"
                {...register("location", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="maps_link"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Google Maps Link
              </label>
              <input
                id="maps_link"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("maps_link", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="bandsintown_link"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Link for sharing
              </label>
              <input
                id="bandsintown_link"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("bandsintown_link", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="ticket_link"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Ticket Link
              </label>
              <input
                id="ticket_link"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("ticket_link", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="ticket_button_text"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Ticket button text (Defaults to &aposTickets&apos)
              </label>
              <input
                id="ticket_button_text"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("ticket_button_text", { required: true })}
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

export default AddShow;
