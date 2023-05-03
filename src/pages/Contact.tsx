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
      </Head>
      <main className="justify-cente flex flex-col items-center">
        <div className="flex flex-row items-center justify-center gap-10 pb-32 pt-16">
          <div className="flex w-1/2 flex-col justify-center gap-2">
            <h1 className="text-left text-7xl">Contact Us.</h1>
            <p className="w-4/5 text-left">
              You can also reach out to us at{" "}
              <a
                href="mailto:graden@scalise.band"
                className="text-red-700 hover:text-blue-700 hover:underline"
              >
                graden@scalise.band
              </a>
              , the form to the right, or through any socials below.
            </p>
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Image
                src="/contactPagePhoto.jpg"
                alt="scalise photo"
                width={544}
                height={431}
              />
            </div>
            <div className="mt-4 flex justify-center gap-2 bg-white">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center gap-2">
              <div className="flex flex-row items-center justify-center gap-5">
                <div className="flex flex-col">
                  <label htmlFor="first-name">First name</label>
                  <input
                    id="first-name"
                    {...register("firstName", { required: true })}
                    className="rounded-md border border-gray-400 bg-gray-100 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="last-name">Last name</label>
                  <input
                    id="last-name"
                    {...register("lastName", { required: true })}
                    className="rounded-md border border-gray-400 bg-gray-100 p-2"
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
      </main>
    </>
  );
};

export default Contact;
