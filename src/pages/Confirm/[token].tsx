import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

const useSubscribe = () => {
  const subscribe = api.subscription.subscribe.useMutation();
  return (token: string) => subscribe.mutateAsync({ token });
};

const Confirm: NextPage = () => {
  const router = useRouter();
  const token = router.query.token as string;
  const subscribe = useSubscribe();
  const [loading, setLoading] = useState(true);
  const [invalidLink, setInvalid] = useState(true);

  useEffect(() => {
    if (token) {
      subscribe(token)
        .then(() => {
          setLoading(false);
          setInvalid(false);
        })
        .catch(() => {
          //console.error(error);
          setInvalid(true);
          setLoading(false);
        });
    }
  }, [token, subscribe]);

  return (
    <>
      <Head>
        <title>Confirm</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="flex flex-col items-center gap-2">
          {invalidLink && loading && (
            <div className="flex flex-row justify-between gap-2 text-white">
              <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
              <p className="flex">Loading...</p>
            </div>
          )}
          {invalidLink && !loading && (
            <>
              <p className="text-white">
                This confirmation link is no longer valid
              </p>
              <Link
                href="/"
                className="text-center text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
              >
                Home
              </Link>
            </>
          )}
          {!invalidLink && loading && <p className="text-white">Loading...</p>}
          {!invalidLink && !loading && (
            <>
              <p className="text-2xl text-white">
                You Are Now Subscribed! You will start receiving emails from
                SCALISE
              </p>
              <Link
                href="/"
                className="text-center text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
              >
                Home
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Confirm;
