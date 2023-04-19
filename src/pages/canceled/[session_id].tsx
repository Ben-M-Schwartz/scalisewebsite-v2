import Head from 'next/head';
import Link from 'next/link';

import { api } from '~/utils/api'

import { useRouter } from 'next/router'
import { useEffect } from 'react'



export default function Cancelled() {

  const router = useRouter()
  const { session_id } = router.query

  const cancelOrder = api.checkout.cancelOrder.useMutation()
  useEffect(() => {
    if(session_id){
      cancelOrder.mutate({id: session_id as string})
    }
  }, [session_id])

  return (
    <>
    <Head>
      <title>Cancellation</title>
    </Head>
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className='text-white flex flex-col items-center gap-2'>
          <h1>Your payment was cancelled</h1>
          <Link href='/Store' className='text-white text-white text-xl font-bold hover:underline hover:text-blue-700 active:text-gray-500 text-center'>Back to Store</Link>
          <Link href='/' className='text-white text-xl font-bold hover:underline hover:text-blue-700 active:text-gray-500 text-center'>Home</Link>
        </div>
      </main>
    </>
  );
}