/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
//import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

type emailForm = {
  testRecipient: string;
  subject: string;
  html: string;
};

const MailingList: NextPage = () => {
  const { register, handleSubmit } = useForm<emailForm>();
  const { isLoaded, userId } = useAuth();

  //const emailtest = api.subscription.testMailerSend.useMutation();

  const [sendtest, setSendtest] = useState(false);

  const sendEmails = api.subscription.emailList.useMutation();
  const onSubmit = (formData: emailForm) => {
    if (!sendtest) {
      const answer = window.confirm(
        "Are you sure this email is ready to be sent to the mailing list?"
      );
      if (answer) {
        sendEmails
          .mutateAsync({
            subject: formData.subject,
            html: formData.html,
            testRecipient: "",
          })
          .then(() => window.alert("success"))
          .catch((error) => console.error(error));
      } else {
        return;
      }
    } else {
      sendEmails
        .mutateAsync({
          subject: formData.subject,
          html: formData.html,
          testRecipient: formData.testRecipient || "graden@scalise.band",
        })
        .then(() => window.alert("success"))
        .catch((error) => console.error(error));
    }
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
          <SignIn redirectUrl="/admin/emailMailingList" />
          <div className="absolute z-10 h-16 w-60 -translate-y-20 translate-x-10 bg-white object-contain"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Mail</title>
        <link rel="shortcut icon" href="/images/scaliseIcon.png" />
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
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <Link
          href="/admin/home"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Admin Home
        </Link>
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          <h1 className="text-4xl text-white">Email Mailing List</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-white"
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
                className="mb-2 block text-sm font-medium text-white"
              >
                HTML exported from page /admin/emailEditor
              </label>
              <textarea
                id="body"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("html", { required: true })}
              />
            </div>

            <label
              htmlFor="testsend"
              className="mb-2 block text-sm font-medium text-white"
            >
              Send test email?
            </label>
            <input
              type="checkbox"
              id="testsend"
              onChange={() => setSendtest(!sendtest)}
              checked={sendtest}
            />

            <div className={sendtest ? "block" : "hidden"}>
              <label
                htmlFor="testRecipient"
                className="mb-2 block text-sm font-medium text-white"
              >
                Address to send test email to:
              </label>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("testRecipient", { required: false })}
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
      </main>
    </>
  );
};

export default MailingList;
