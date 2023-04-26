/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
//import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

type emailForm = {
  subject: string;
  body: string;
};

const MailingList: NextPage = () => {
  const { register, handleSubmit } = useForm<emailForm>();
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

  const sendEmails = api.subscription.emailList.useMutation();
  const onSubmit = (formData: emailForm) => {
    sendEmails
      .mutateAsync({ ...formData })
      .then(() => window.alert("success"))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Head>
        <title>Mail</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          <h1 className="text-4xl text-white">Email Mailing List</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Subject
              </label>
              <input
                id="subject"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("subject", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="body"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Body
              </label>
              <input
                id="body"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("body", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send
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

export default MailingList;
