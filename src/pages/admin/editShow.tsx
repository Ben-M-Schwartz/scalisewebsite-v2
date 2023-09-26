/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

import { useForm } from "react-hook-form";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

type EditForm = {
  date: string | undefined;
  time: string | undefined;
  location: string | undefined;
  name: string | undefined;
  maps_link: string | undefined;
  bandsintown_link: string | undefined;
  ticket_link: string | undefined;
  ticket_button_text: string | undefined;
};

const Edit = ({
  show,
}: {
  show: {
    id: number | null;
    date: string | null;
    location: string | null;
    name: string | null;
    maps_link: string | null;
    bandsintown_link: string | null;
    ticket_link: string | null;
    ticket_button_text: string | null;
  };
}) => {
  const { register, handleSubmit } = useForm<EditForm>();
  const editShow = api.shows.update.useMutation();

  const onSubmit = (data: EditForm) => {
    editShow
      .mutateAsync({
        id: show.id as number,
        date: data.date || (show.date as string),
        location: data.location || (show.location as string),
        name: data.name || (show.name as string),
        maps_link: data.maps_link || (show.maps_link as string),
        bandsintown_link:
          data.bandsintown_link || (show.bandsintown_link as string),
        ticket_link: data.ticket_link || (show.ticket_link as string),
        ticket_button_text:
          data.ticket_button_text || (show.ticket_button_text as string),
      })
      .then(() => {
        window.alert("Success");
        (
          document.getElementById(
            `${show.id as number}_editForm`
          ) as HTMLDialogElement
        ).close();
      })
      .catch((error) => {
        window.alert(`An error occured please tell Ben`);
        console.error(error);
        (
          document.getElementById(
            `${show.id as number}_editForm`
          ) as HTMLDialogElement
        ).close();
      });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-stone-100">
        Enter only the information you want changed
      </h1>
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-stone-100"
        >
          Show Name
        </label>
        <input
          id="name"
          placeholder={`${show.name as string}`}
          className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
          {...register("name", { required: false })}
        />
      </div>
      <div>
        <label
          htmlFor="date"
          className="mb-2 block text-sm font-medium text-stone-100"
        >
          Date
        </label>
        <input
          id="date"
          className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
          placeholder={`${show.date as string}`}
          {...register("date", { required: false })}
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
          placeholder={`${show.location as string}`}
          {...register("location", { required: false })}
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
          placeholder={`${show.maps_link as string}`}
          {...register("maps_link", { required: false })}
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
          placeholder={`${show.bandsintown_link as string}`}
          {...register("bandsintown_link", { required: false })}
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
          placeholder={`${show.ticket_link as string}`}
          {...register("ticket_link", { required: false })}
        />
      </div>

      <div>
        <label
          htmlFor="ticket_button_text"
          className="mb-2 block text-sm font-medium text-stone-100"
        >
          Ticket Button Text
        </label>
        <input
          id="ticket_button_text"
          className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
          placeholder={`${show.ticket_button_text as string}`}
          {...register("ticket_button_text", { required: false })}
        />
      </div>

      <button
        type="submit"
        className="mb-2 mr-2 rounded-lg bg-red-800 px-5 py-2.5 text-sm font-medium text-stone-100 hover:bg-red-900 active:bg-red-950"
      >
        Update
      </button>
    </form>
  );
};

const Shows: NextPage = () => {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const shows = api.shows.get.useQuery();
  const remove = api.shows.remove.useMutation();

  if (!isLoaded)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <div className="text-stone-100">Loading...</div>;
      </main>
    );
  if (!userId)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <h1 className="text-2xl text-stone-100">
          This page is for band members only
        </h1>
        <div>
          <SignIn redirectUrl="/admin/removeShow" />
          <div className="absolute z-10 h-16 w-60 -translate-y-24 translate-x-7 bg-white object-contain sm:-translate-y-20 sm:translate-x-10"></div>
        </div>
      </main>
    );

  return (
    <>
      <Head>
        <title>Shows</title>
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
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-stone-100">Edit Shows</p>
          {shows.data?.map((show, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="divide-y">
                <div className="flex items-center justify-center gap-10 py-4">
                  <div className="pr-4 font-medium text-gray-100">
                    {show.date}
                  </div>
                  <div className="pr-4 font-medium text-gray-100">
                    {show.location}
                  </div>
                  <div className="pr-4 font-medium text-gray-100">
                    {show.name}
                  </div>
                  <button
                    onClick={() => {
                      (
                        document.getElementById(
                          `${show.id}_editForm`
                        ) as HTMLDialogElement
                      ).showModal();
                    }}
                    className="mb-2 mr-2 inline-block w-auto rounded-lg  bg-red-800 px-10 py-3 text-sm font-medium  text-stone-100 hover:bg-red-900 active:bg-red-950"
                  >
                    Edit
                  </button>
                  <dialog
                    id={`${show.id}_editForm`}
                    className="w-full bg-stone-950"
                  >
                    <Edit show={show} />
                  </dialog>
                  <button
                    onClick={() => {
                      remove.mutate({ id: show.id });
                      window.alert("success");
                      router.reload();
                    }}
                    className="mb-2 mr-2 inline-block w-auto rounded-lg  bg-red-800 px-10 py-3 text-sm font-medium  text-stone-100 hover:bg-red-900 active:bg-red-950"
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Shows;
