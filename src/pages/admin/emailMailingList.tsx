/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/utils/api";

import { DateTimePicker } from "~/components/dateTimePicker";

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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>(
    `${((new Date().getHours() % 12) + 1).toString()}:00`
  );
  const [am, setAm] = useState<string>(
    new Date().getHours() >= 12 ? "PM" : "AM"
  );

  const { register, handleSubmit } = useForm<emailForm>();
  const { isLoaded, userId } = useAuth();

  const [scheduled, setScheduled] = useState<boolean>(false);

  const [sendtest, setSendtest] = useState(false);

  const sendEmails = api.email.emailList.useMutation();
  const onSubmit = (formData: emailForm) => {
    if (!sendtest) {
      const answer = window.confirm(
        "Are you sure this email is ready to be sent to the mailing list? Did you send it to yourself first?"
      );
      if (answer) {
        sendEmails
          .mutateAsync({
            subject: formData.subject,
            html: formData.html,
            testRecipient: "",
            scheduled: scheduled,
            date:
              Date.parse(`${(date as Date).toDateString()} ${time} ${am}`) /
              1000,
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
          scheduled: scheduled,
          date:
            Date.parse(`${(date as Date).toDateString()} ${time} ${am}`) / 1000,
        })
        .then(() => window.alert("success"))
        .catch((error) => window.alert(error));
    }
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
          <SignIn redirectUrl="/admin/emailMailingList" />
          <div className="absolute z-10 h-16 w-60 -translate-y-24 translate-x-7 bg-white object-contain sm:-translate-y-20 sm:translate-x-10"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Mail</title>
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
          <h1 className="text-center text-4xl text-stone-100">
            Email Mailing List
          </h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Subject
              </label>
              <input
                id="subject"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                {...register("subject", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="body"
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                HTML exported from page /admin/emailEditor
              </label>
              <textarea
                id="body"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                {...register("html", { required: true })}
              />
            </div>

            <label
              htmlFor="testsend"
              className="mb-2 block text-sm font-medium text-stone-100"
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
                className="mb-2 block text-sm font-medium text-stone-100"
              >
                Address to send test email to:
              </label>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-stone-100 placeholder-gray-400"
                {...register("testRecipient", { required: false })}
              />
            </div>

            <section className="flex flex-row items-center gap-4">
              <label htmlFor="schedule" className="text-stone-100">
                Schedule Send
              </label>
              <input
                type="checkbox"
                checked={scheduled}
                onChange={() => setScheduled(!scheduled)}
              />
            </section>

            <DateTimePicker
              date={date}
              time={time}
              am={am}
              setDate={setDate}
              setTime={setTime}
              setAm={setAm}
            />

            {/* <input type="datetime-local" /> */}

            <button
              type="submit"
              className="active:red-950 mb-2 mr-2 rounded-lg bg-red-800 px-5 py-2.5 text-sm font-medium text-stone-100 hover:bg-red-900"
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
