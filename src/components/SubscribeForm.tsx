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
      <div className="flex flex-col items-center justify-center bg-stone-100 py-6">
        {isSubmitted ? (
          <h1>Thank you for subscribing!</h1>
        ) : (
          <>
            <h1 className="py-4 text-center text-4xl font-bold">SUBSCRIBE</h1>
            <p className="mb-4 text-center">
              Sign up with your email address to receive news and updates.
            </p>
            <form
              className="flex items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="rounded-sm bg-stone-200 px-4 py-2 leading-tight focus:bg-stone-100 focus:outline-red-800 max-md:w-1/2"
                type="email"
                placeholder="Email address"
                {...register("email", { required: true })}
              />
              <button
                className="focus:shadow-outline border border-red-800 px-4 py-2 font-bold text-red-800 hover:bg-red-800 hover:text-stone-100 active:bg-rose-400"
                type="submit"
              >
                SIGN UP
              </button>
            </form>
          </>
        )}
        <div className="mt-4 flex justify-around">
          <label htmlFor="spotify-link-2" className="invisible absolute">
            Scalise Spotify Link
          </label>
          <label htmlFor="applemusic-link-2" className="invisible absolute">
            Scalise Apple Music Link
          </label>
          <label htmlFor="twitter-link-2" className="invisible absolute">
            Scalise Twitter Link
          </label>
          <label htmlFor="facebook-link-2" className="invisible absolute">
            Scalise Facebook Link
          </label>
          <label htmlFor="instagram-link-2" className="invisible absolute">
            Scalise Instagram Link
          </label>
          <label htmlFor="tiktok-link-2" className="invisible absolute">
            Scalise TikTok Link
          </label>
          <label htmlFor="youtube-link-2" className="invisible absolute">
            Scalise Youtube Link
          </label>
          <Link
            href="https://open.spotify.com/artist/1p2Ey5OjAPtcfhzmwlfIPZ?si=E5OkbxepRJSOZ1Zq7eeiKg"
            className="block rounded  py-2 pl-3 pr-4 text-stone-950 hover:text-red-800 md:p-0"
            rel="noopener noreferrer"
            target="_blank"
            id="spotify-link-2"
          >
            <SpotifyIcon />
          </Link>

          <Link
            href="https://music.apple.com/us/artist/scalise/1529031635"
            className="block rounded  py-2 pl-3 pr-4 text-stone-950 hover:text-red-800 md:p-0"
            rel="noopener noreferrer"
            target="_blank"
            id="applemusic-link-2"
          >
            <AppleMusicIcon />
          </Link>

          <Link
            href="https://twitter.com/ScaliseTheBand"
            className="block rounded  py-2 pl-3 pr-4 text-stone-950 hover:text-red-800 md:p-0"
            rel="noopener noreferrer"
            target="_blank"
            id="twitter-link-2"
          >
            <TwitterIcon />
          </Link>

          <Link
            href="https://www.facebook.com/ScaliseTheBand"
            className="block rounded  py-2 pl-3 pr-4 text-stone-950 hover:text-red-800 md:p-0"
            rel="noopener noreferrer"
            target="_blank"
            id="facebook-link-2"
          >
            <FacebookIcon />
          </Link>

          <Link
            href="https://www.tiktok.com/@scaliseband"
            className="block rounded  py-2 pl-3 pr-4 text-stone-950 hover:text-red-800 md:p-0"
            rel="noopener noreferrer"
            target="_blank"
            id="instagram-link-2"
          >
            <InstagramIcon />
          </Link>

          <Link
            href="https://www.tiktok.com/@scaliseband"
            className="block rounded  py-2 pl-3 pr-4 text-stone-950 hover:text-red-800 md:p-0"
            rel="noopener noreferrer"
            target="_blank"
            id="tiktok-link-2"
          >
            <TikTokIcon />
          </Link>

          <Link
            href="https://www.youtube.com/channel/UCWBsxAAhmKP1nRHWQQ5N0Qg"
            className="block rounded  py-2 pl-3 pr-4 text-stone-950 hover:text-red-800 md:p-0"
            rel="noopener noreferrer"
            target="_blank"
            id="youtube-link-2"
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
