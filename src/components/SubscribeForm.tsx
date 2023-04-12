import React, { ChangeEvent, FormEvent } from 'react';
import {
  SpotifyIcon,
  AppleMusicIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YoutubeIcon,
  CartIcon
  } from './icons'

import Link from 'next/link'

interface State {
  email: string;
}

class SubscribeForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      email: '',
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log(`Submitting email: ${this.state.email}`);
  }


  render() {
    return (
      <div className="flex flex-col justify-center items-center py-6 bg-white">
        <p className="text-center mb-4">Sign up with your email address to receive news and updates.</p>
        <form className="flex items-center" onSubmit={this.handleSubmit}>
          <input className="bg-gray-200 rounded-l-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="Enter your email address" value={this.state.email} onChange={this.handleChange} required />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline" type="submit">SIGN UP</button>
        </form>
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
}

export default SubscribeForm;


