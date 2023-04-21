/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import {
  SpotifyIcon,
  AppleMusicIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YoutubeIcon,
} from "./icons";
import Link from "next/link";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { type NextPage } from "next";

type subscriptionForm = {
  email: string;
};

const Subscribe: NextPage = () => {
  const confirm = api.subscription.confirm.useMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit } = useForm<subscriptionForm>();
  const onSubmit = (formData: subscriptionForm) => {
    try {
      setIsSubmitted(true);
      confirm.mutate({ email: formData.email, url: window.location.origin });
    } catch (error) {
      window.alert(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white py-6">
      {isSubmitted ? (
        <h1>Thank you for subscribing!</h1>
      ) : (
        <>
          <p className="mb-4 text-center">
            Sign up with your email address to receive news and updates.
          </p>
          <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="rounded-l-lg bg-gray-200 px-4 py-2 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
              type="email"
              placeholder="Enter your email address"
              {...register("email", { required: true })}
            />
            <button
              className="focus:shadow-outline rounded-r-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              SIGN UP
            </button>
          </form>
        </>
      )}
      <div className="mt-4 flex justify-center bg-white">
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
      <p className="mt-4 text-center">© Scalise 2023</p>
    </div>
  );
};

export default Subscribe;
