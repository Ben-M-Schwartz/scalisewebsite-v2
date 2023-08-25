/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

const ManageMailingList: NextPage = () => {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const [sortBy, setSortBy] = useState<"email" | "dateAdded">("email");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const queryResult = api.email.get.useQuery();
  const subs:
    | { id: number; email: string | null; created_at: Date }[]
    | undefined = queryResult.data;

  const addSub = api.email.adminSubscribe.useMutation();
  const unsub = api.email.unsubscribe.useMutation();

  const addSubscriber = (formData: { email: string }) => {
    addSub
      .mutateAsync({ email: formData.email })
      .then(() => window.alert("success"))
      .catch((error) => {
        window.alert("an error occured");
        console.error(error);
      });
  };

  const { isLoaded, userId } = useAuth();
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
          <SignIn redirectUrl="/admin/emailEditor" />
          <div className="absolute z-10 h-16 w-60 -translate-y-24 translate-x-7 bg-white object-contain sm:-translate-y-20 sm:translate-x-10"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Manage Mailing List</title>
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
      <main className="flex min-h-screen flex-col items-center bg-stone-950 text-stone-100">
        <h1 className="text-4xl">Mailing List</h1>
        <Link
          href="/admin/home"
          className="py-6 text-xl font-bold underline hover:text-red-800 active:text-red-950"
        >
          Admin Home
        </Link>
        <form
          onSubmit={handleSubmit(addSubscriber)}
          className="flex flex-row gap-4"
        >
          <label htmlFor="email">Add Subscriber</label>
          <input
            id="email"
            className="bg-stone-100 text-stone-950"
            {...register("email", { required: true })}
          ></input>
          <button
            type="submit"
            className="bg-red-800 px-2 py-1 text-stone-100 hover:bg-red-900 active:bg-red-950"
          >
            Submit
          </button>
        </form>

        <form className="text-stone-100">
          <h1>Sort By</h1>
          <section className="flex justify-between">
            <div>
              <input
                type="radio"
                id="email"
                value="email"
                name="sort_by"
                onChange={() => setSortBy("email")}
                checked={sortBy === "email"}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input
                type="radio"
                id="dateAdded"
                value="dateAdded"
                name="sort_by"
                onChange={() => setSortBy("dateAdded")}
                checked={sortBy === "dateAdded"}
              />
              <label htmlFor="dateDdded">Date Added</label>
            </div>
          </section>
          <section className="flex gap-4">
            <div>
              <input
                type="radio"
                id="asc"
                name="order"
                value="asc"
                onChange={() => setOrder("asc")}
                checked={order === "asc"}
              />
              <label htmlFor="asc">Ascending</label>
            </div>
            <div>
              <input
                type="radio"
                id="desc"
                name="order"
                value="desc"
                onChange={() => setOrder("desc")}
                checked={order === "desc"}
              />
              <label htmlFor="desc">Descending</label>
            </div>
          </section>
        </form>

        <h1 className="border-b">Subscribers</h1>
        {subs
          ?.sort(
            (
              a: { id: number; email: string | null; created_at: Date },
              b: { id: number; email: string | null; created_at: Date }
            ) => {
              if (sortBy === "email")
                return (
                  ((a.email as string) > (b.email as string) ? 1 : -1) *
                  (order === "asc" ? 1 : -1)
                );
              return a.created_at > b.created_at
                ? order === "desc"
                  ? -1
                  : 1
                : order === "desc"
                ? 1
                : -1;
            }
          )
          .map((sub) => (
            <div key={sub.id} className="flex w-1/2 items-center">
              <div className="grid w-full grid-cols-2">
                <p className="text-stone-100">{sub.email}</p>
                <p className="text-center text-stone-100">
                  {sub.created_at.toDateString()}
                </p>
              </div>
              <button
                className="rounded-lg bg-red-800 px-2 py-1 text-stone-100 hover:bg-red-900 active:bg-red-950"
                onClick={() => {
                  unsub
                    .mutateAsync({ email: sub.email as string })
                    .then(() => window.alert("success"))
                    .catch(() => window.alert("an error occured"));
                }}
              >
                Remove
              </button>
            </div>
          ))}
      </main>
    </>
  );
};

export default ManageMailingList;
