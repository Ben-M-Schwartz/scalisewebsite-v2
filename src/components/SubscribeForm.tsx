import React, { useState } from 'react'
import {
  SpotifyIcon,
  AppleMusicIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YoutubeIcon
  } from './icons'
import Link from 'next/link'
import { api } from "~/utils/api";
import { useForm } from "react-hook-form"
import { type NextPage } from "next"

type subscriptionForm = {
  email: string
}

const Subscribe: NextPage = () => {
  //const subscribe = api.subscription.subscribe.useMutation()
  const confirm = api.subscription.confirm.useMutation()
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit } = useForm<subscriptionForm>()
  const onSubmit = (formData: subscriptionForm) => {
    setIsSubmitted(true);
    void confirm.mutateAsync({email: formData.email, url: window.location.origin})
  }
  return (
    <div className="flex flex-col justify-center items-center py-6 bg-white">
      {isSubmitted ? (
        <h1>Thank you for subscribing!</h1>
      ) :
      (
        //eslint-disable-next-line @typescript-eslint/no-misused-promises
        <><p className="text-center mb-4">Sign up with your email address to receive news and updates.</p><form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
          <input className="bg-gray-200 rounded-l-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="Enter your email address" {...register("email", { required: true })} />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline" type="submit">SIGN UP</button>
        </form></>
      )}
      <div className="flex justify-center mt-4 bg-white">
        <Link href="https://open.spotify.com/artist/1p2Ey5OjAPtcfhzmwlfIPZ?si=E5OkbxepRJSOZ1Zq7eeiKg" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" rel="noopener noreferrer" target="_blank">
          <SpotifyIcon />
        </Link>

        <Link href="https://music.apple.com/us/artist/scalise/1529031635" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" rel="noopener noreferrer" target="_blank">
          <AppleMusicIcon />
        </Link>

        <Link href="https://twitter.com/ScaliseTheBand" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" rel="noopener noreferrer" target="_blank">
          <TwitterIcon />
        </Link>

        <Link href="https://www.facebook.com/ScaliseTheBand" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" rel="noopener noreferrer" target="_blank">
          <FacebookIcon />
        </Link>

        <Link href="https://www.tiktok.com/@scaliseband" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" rel="noopener noreferrer" target="_blank">
          <InstagramIcon />
        </Link>

        <Link href="https://www.tiktok.com/@scaliseband" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" rel="noopener noreferrer" target="_blank">
          <TikTokIcon />
        </Link>

        <Link href="https://www.youtube.com/channel/UCWBsxAAhmKP1nRHWQQ5N0Qg" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" rel="noopener noreferrer" target="_blank">
          <YoutubeIcon />
        </Link>
      </div>
      <p className="text-center mt-4">© Scalise 2023</p>
    </div>
  );
}

export default Subscribe;


