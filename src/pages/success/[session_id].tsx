import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SuccessPage: NextPage = () => {
  const router = useRouter();

  const { session_id } = router.query;

  return (
    <>
      <Head>
        <title>Confirmation</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {session_id && (
            <><h1>Payment Successful!</h1>
            <p>Thank you for your purchase.</p>
            <p>Check your email for order details</p>
            </>
        )}
        <Link href="/" className='text-xl font-bold hover:underline hover:text-blue-700 active:text-gray-500'>Back to Home</Link>
      </main>
    </>
  );
};

export default SuccessPage;