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

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

type subscriptionForm = {
  email: string;
};

const Subscribe: NextPage = () => {
  const confirm = api.email.confirm.useMutation();
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
    <main>
      <div className="flex flex-col items-center justify-center bg-white py-6">
        {isSubmitted ? (
          <h1>Thank you for subscribing!</h1>
        ) : (
          <>
            <h1 className="text-center text-4xl font-bold">Subscribe</h1>
            <p className="mb-4 text-center">
              Sign up with your email address to receive news and updates.
            </p>
            <form
              className="flex items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="rounded-l-lg bg-gray-200 px-4 py-2 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
                type="email"
                placeholder="Enter your email address"
                {...register("email", { required: true })}
              />
              <button
                className="focus:shadow-outline border border-rose-700 px-4 py-2 font-bold text-rose-700 hover:bg-rose-700 hover:text-white active:bg-rose-400"
                type="submit"
              >
                SIGN UP
              </button>
            </form>
          </>
        )}
        <div className="mt-4 flex justify-center gap-2 bg-white">
          <label htmlFor="spotify-link" className="invisible absolute">
            Scalise Spotify Link
          </label>
          <label htmlFor="applemusic-link" className="invisible absolute">
            Scalise Apple Music Link
          </label>
          <label htmlFor="twitter-link" className="invisible absolute">
            Scalise Twitter Link
          </label>
          <label htmlFor="facebook-link" className="invisible absolute">
            Scalise Facebook Link
          </label>
          <label htmlFor="instagram-link" className="invisible absolute">
            Scalise Instagram Link
          </label>
          <label htmlFor="tiktok-link" className="invisible absolute">
            Scalise TikTok Link
          </label>
          <label htmlFor="youtube-link" className="invisible absolute">
            Scalise Youtube Link
          </label>
          <Link
            href="https://open.spotify.com/artist/1p2Ey5OjAPtcfhzmwlfIPZ?si=E5OkbxepRJSOZ1Zq7eeiKg"
            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
            rel="noopener noreferrer"
            target="_blank"
            id="spotify-link"
          >
            <SpotifyIcon />
          </Link>

          <Link
            href="https://music.apple.com/us/artist/scalise/1529031635"
            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
            rel="noopener noreferrer"
            target="_blank"
            id="applemusic-link"
          >
            <AppleMusicIcon />
          </Link>

          <Link
            href="https://twitter.com/ScaliseTheBand"
            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
            rel="noopener noreferrer"
            target="_blank"
            id="twitter-link"
          >
            <TwitterIcon />
          </Link>

          <Link
            href="https://www.facebook.com/ScaliseTheBand"
            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
            rel="noopener noreferrer"
            target="_blank"
            id="facebook-link"
          >
            <FacebookIcon />
          </Link>

          <Link
            href="https://www.tiktok.com/@scaliseband"
            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
            rel="noopener noreferrer"
            target="_blank"
            id="instagram-link"
          >
            <InstagramIcon />
          </Link>

          <Link
            href="https://www.tiktok.com/@scaliseband"
            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
            rel="noopener noreferrer"
            target="_blank"
            id="tiktok-link"
          >
            <TikTokIcon />
          </Link>

          <Link
            href="https://www.youtube.com/channel/UCWBsxAAhmKP1nRHWQQ5N0Qg"
            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
            rel="noopener noreferrer"
            target="_blank"
            id="youtube-link"
          >
            <YoutubeIcon />
          </Link>
        </div>
        <p className="mt-4 text-center">© Scalise 2023</p>
      </div>
    </main>
  );
};

export default Subscribe;
