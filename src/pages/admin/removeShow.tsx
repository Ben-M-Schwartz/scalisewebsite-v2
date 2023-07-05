import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
//import { SignIn } from "@clerk/clerk-react";
//import { useAuth } from "@clerk/nextjs";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

const Shows: NextPage = () => {
  const router = useRouter();
  //const { isLoaded, userId } = useAuth();
  const shows = api.shows.get.useQuery();
  const remove = api.shows.remove.useMutation();

  // if (!isLoaded)
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
  //       <div className="text-stone-100">Loading...</div>;
  //     </main>
  //   );
  // if (!userId)
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
  //       <h1 className="text-2xl text-stone-100">
  //         This page is for band members only
  //       </h1>
  //       <div>
  //         <SignIn redirectUrl="/admin/removeShow" />
  //         <div className="absolute z-10 h-16 w-60 -translate-y-20 translate-x-10 bg-white object-contain"></div>
  //       </div>
  //     </main>
  //   );

  return (
    <>
      <Head>
        <title>Shows</title>
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
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-stone-100">Remove Shows</p>
          {shows.data?.map((show, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="divide-y">
                <div className="flex items-center justify-center gap-10 py-4">
                  <div className="pr-4 font-medium text-gray-100">
                    {show.date}
                  </div>
                  <div className="pr-4 font-medium text-gray-100">
                    {show.location}
                  </div>
                  <div className="pr-4 font-medium text-gray-100">
                    {show.name}
                  </div>
                  <button
                    onClick={() => {
                      remove.mutate({ id: show.id });
                      window.alert("success");
                      router.reload();
                    }}
                    className="mb-2 mr-2 inline-block w-auto rounded-lg  bg-red-800 px-10 py-3 text-sm font-medium  text-stone-100 hover:bg-red-900 active:bg-red-950"
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Shows;
