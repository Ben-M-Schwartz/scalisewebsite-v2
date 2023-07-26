/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

const ManageMailingList: NextPage = () => {
  const { register, handleSubmit } = useForm<{ email: string }>();

  const queryResult = api.email.get.useQuery();
  const subs: { id: number; email: string | null }[] | undefined =
    queryResult.data;

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
          <button type="submit">Submit</button>
        </form>

        <h1 className="border-b">Subscribers</h1>
        {subs?.map((sub) => (
          <div key={sub.id} className="flex w-1/3 flex-row justify-between">
            <p className="text-stone-100">{sub.email}</p>
            <button
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
