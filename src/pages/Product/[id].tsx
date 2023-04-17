/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react'

import { setCookie, getCookie, hasCookie/* , deleteCookie */ } from 'cookies-next';
import crypto from 'crypto'

type addToCartForm = {
    size: string;
    quantity: string;
  };

const Product: NextPage = () => {
    const router = useRouter();
    const product = api.inventory.get.useQuery({ id: router.query.id as string },  { enabled: !!router.query.id });
    const productData = product.data as {
        name: string,
        price: string,
        weight: string,
        id: number,
        sizes: string,
        image_path: string | null
    }[]
    const [ loadSizes, setLoadSizes ] = useState(true)
    /* 
    Check if cart_id cookies esists using hasCookie
    if it does not exist call the createNewCart mutation
    if it does exist call the add to cart mutation
    */
    const addToCart = api.cart.addToCart.useMutation();
    const createNewCart = api.cart.createCart.useMutation();
    const { register, handleSubmit } = useForm<addToCartForm>();
    const onSubmit = (formData: addToCartForm) => {
      const mutateOptions = {
        size: formData.size,
        quantity: parseInt(formData.quantity),
        price: parseFloat(productData[0]!.price),
        product_id:  productData[0]!.id.toString(),
        weight: parseFloat(productData[0]!.weight),
        name: productData[0]!.name,
        cart_id: 'temp string'
      }

      if(!hasCookie('cart_id')) {
        const new_cart_id = crypto.randomBytes(16).toString('hex');
        mutateOptions.cart_id = new_cart_id;
        createNewCart
        .mutateAsync(mutateOptions).catch((error) => console.error(error))
        setCookie('cart_id', new_cart_id)
      } else {
        mutateOptions.cart_id = getCookie('cart_id')!.toString();
        addToCart
        .mutateAsync(mutateOptions).catch((error) => console.error(error))
      }


      window.alert('Item added to cart!')
    };

    useEffect(() => {
        if (productData && productData[0]) {
          if (productData[0].sizes === 'NO SIZES') {
            setLoadSizes(false);
          }
        }
      }, [productData]);



    if(!productData || !productData[0]) return null;

    
    const sizes = productData[0].sizes?.split(',') || [];


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
            <div className="container flex flex-col gap-12 px-4 py-16 ">
                <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}>
                    {loadSizes && (
                    <div>
                    <label
                        htmlFor="size"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Size
                    </label>
                    <select id='size' {...register("size", { required: true })}>
                        {sizes && sizes.map((size) => (
                            <option key={size} value={size}>
                            {size}</option>
                            ))}
                    </select>
                    </div>
                    )}
                    <div>
                    <label
                        htmlFor="quantitiy"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Quantity
                    </label>
                    <input
                        id="quantities"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        {...register("quantity", { required: true })}
                    />
                    </div>

                    <button
                    type="submit"
                    className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                    Add To Cart
                    </button>
                </form>
            </div>
            </main>
        </>
    )
}

export default Product;