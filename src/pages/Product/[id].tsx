import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
//import { useForm } from "react-hook-form";

const Product: NextPage = () => {
    const router = useRouter();
    const product = api.inventory.get.useQuery({ id: router.query.id as string },  { enabled: !!router.query.id });
    const productData = product.data
    if(!productData || !productData[0]) return null;

    return (
        <>
            <Head>
                <title>{productData[0].name}</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <h1 className="mt-12 pl-4 text-4xl text-white">Product Page</h1>
            <div className="container mx-auto flex flex-col gap-12">
                <h1 className="mt-12 text-4xl text-white">{productData[0].name}</h1>
                <p className='text-white'>$ {productData[0].price}</p>
            </div>
            </main>
        </>
    )
}

export default Product;