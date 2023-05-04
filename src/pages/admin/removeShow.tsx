import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

const Shows: NextPage = () => {
  const router = useRouter();
  const { isLoaded, userId, orgId } = useAuth();
  if (!isLoaded)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="text-white">Loading...</div>;
      </main>
    );
  if (!userId)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <h1 className="text-2xl text-white">
          This page is for band members only
        </h1>
        <SignIn redirectUrl="/admin" />
      </main>
    );
  if (orgId !== process.env.ADMIN_ORGID) {
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
      <h1 className="text-2xl text-white">
        Sorry you are not authorized to visit this page
      </h1>
    </main>;
  }

  const shows = api.shows.get.useQuery();
  const remove = api.shows.remove.useMutation();
  return (
    <>
      <Head>
        <title>Shows</title>
      </Head>
      <main className="flex  min-h-screen flex-col items-center justify-center bg-gray-800">
        <Link
          href="/admin/home"
          className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Admin Home
        </Link>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">Remove Shows</p>
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
                    className="mb-2 mr-2 inline-block w-auto rounded-lg bg-blue-700 px-10 py-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
