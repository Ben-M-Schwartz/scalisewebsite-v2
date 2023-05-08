/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import {
  SpotifyIcon,
  AppleMusicIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YoutubeIcon,
} from "~/components/icons";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useState } from "react";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

import image from "../../public/contactPagePhoto.webp";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [processing, setProcessing] = useState(false);
  const contactSubmit = api.subscription.contactForm.useMutation();

  const onSubmit = async (formData: FormData) => {
    setProcessing(true);
    await contactSubmit
      .mutateAsync({ ...formData })
      .then(() => {
        setProcessing(false);
        alert("Message sent. Thank you!");
        reset();
      })
      .catch(() =>
        alert(
          "Something went wrong. Please try again later or contact Graden directly"
        )
      );
  };

  return (
    <>
      <Head>
        <title>CONTACT-SCALISE</title>
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
      <main className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-10 pb-32 pt-16 md:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-2 md:w-1/2">
            <h1 className="order-1 text-center text-7xl md:text-left">
              Contact Us
            </h1>
            <p className="order-1 w-2/3 text-center md:w-4/5 md:text-left">
              You can also reach out to us at{" "}
              <a
                href="mailto:graden@scalise.band"
                className="text-red-700 hover:text-blue-700 hover:underline"
              >
                graden@scalise.band
              </a>{" "}
              or through any socials below.
            </p>
            <div className="order-0 flex h-full w-full flex-col items-center justify-center sm:order-1">
              <Image src={image} alt="scalise photo" width={544} height={431} />
            </div>
            <div className="order-1 mt-4 flex justify-center gap-2 bg-white">
              <Link
                href="https://open.spotify.com/artist/1p2Ey5OjAPtcfhzmwlfIPZ?si=E5OkbxepRJSOZ1Zq7eeiKg"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <SpotifyIcon />
              </Link>

              <Link
                href="https://music.apple.com/us/artist/scalise/1529031635"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <AppleMusicIcon />
              </Link>

              <Link
                href="https://twitter.com/ScaliseTheBand"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <TwitterIcon />
              </Link>

              <Link
                href="https://www.facebook.com/ScaliseTheBand"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FacebookIcon />
              </Link>

              <Link
                href="https://www.tiktok.com/@scaliseband"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <InstagramIcon />
              </Link>

              <Link
                href="https://www.tiktok.com/@scaliseband"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <TikTokIcon />
              </Link>

              <Link
                href="https://www.youtube.com/channel/UCWBsxAAhmKP1nRHWQQ5N0Qg"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                <YoutubeIcon />
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center border md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col justify-center gap-2 px-4 py-8 sm:px-0">
                <div className="flex flex-row justify-center gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="first-name">First name</label>
                    <input
                      id="first-name"
                      {...register("firstName", { required: true })}
                      className="w-full rounded-md border border-gray-400 bg-gray-100 p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="last-name">Last name</label>
                    <input
                      id="last-name"
                      {...register("lastName", { required: true })}
                      className="w-full rounded-md border border-gray-400 bg-gray-100 p-2"
                    />
                  </div>
                </div>
                <h2>Email</h2>
                <input
                  id="email"
                  {...register("email", { required: true })}
                  className="rounded-md border border-gray-400 bg-gray-100 p-2"
                />
                <h2>Subject</h2>
                <input
                  id="subject"
                  {...register("subject", { required: true })}
                  className="rounded-md border border-gray-400 bg-gray-100 p-2"
                />
                <h2>Message</h2>
                <textarea
                  id="message"
                  {...register("message", { required: true })}
                  className="rounded-md border border-gray-400 bg-gray-100 p-2"
                  rows={4}
                />
                {!processing && (
                  <button
                    type="submit"
                    className="mt-4 w-1/2 rounded-sm border-4 border-rose-800 py-4 hover:bg-rose-800 hover:text-white"
                  >
                    Submit
                  </button>
                )}
                {processing && (
                  <button
                    type="button"
                    className="mt-4 w-1/2 rounded-sm border-4 border-rose-800 bg-rose-800 py-4 text-white"
                    disabled
                  >
                    <div className="flex flex-row justify-center">
                      <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
                      <p className="flex">Processing...</p>
                    </div>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
