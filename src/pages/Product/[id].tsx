/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { CarretDown } from "~/components/icons";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

import {
  setCookie,
  getCookie,
  hasCookie /* , deleteCookie */,
} from "cookies-next";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length: number) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

type addToCartForm = {
  size: string;
  quantity: string;
};

type notifyForm = {
  email: string;
};

import { getProductPage } from "~/server/api/routers/inventoryRouter";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const result = await getProductPage(id);

  return {
    props: {
      product: result,
    },
  };
};

const Product: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  /*   const product = api.inventory.get.useQuery(
    { id: router.query.id as string },
    { enabled: !!router.query.id }
  ); */
  /*   const productData = product.data as {
    name: string;
    price: number;
    weight: number;
    id: number;
    image: string | null;
    product_quantity: {
      size: string;
      quantity_in_stock: number;
      quantity_in_checkouts: number;
    };
  }[]; */
  const productData = props.product as {
    name: string;
    price: number;
    weight: number;
    id: number;
    image: string | null;
    product_quantity: {
      size: string;
      quantity_in_stock: number;
      quantity_in_checkouts: number;
    };
  }[];
  const [loadSizes, setLoadSizes] = useState(true);
  const [soldOut, setSoldOut] = useState(false);
  const [addToCartDisabled, setAddToCartDisabled] = useState(true);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [pickedSize, setPickedSize] = useState("");
  const [processing, setProcessing] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Cart");

  const addToCart = api.cart.addToCart.useMutation();
  const { register: cartRegister, handleSubmit: cartSubmit } =
    useForm<addToCartForm>();
  const { register: notifyRegister, handleSubmit: notifySubmit } =
    useForm<notifyForm>();

  //all possible sizing options used to sort the select html element
  type sizes = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "XXXL";
  interface indexSignature {
    [key: string]: number;
  }
  const allOptions: indexSignature = {
    XXS: 0,
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
    XXXL: 7,
    XXXXL: 8,
  };

  const onSubmitCart = (formData: addToCartForm) => {
    setProcessing(true);
    const mutateOptions = {
      size: formData.size,
      quantity: parseInt(formData.quantity),
      price: productData[0]!.price,
      product_id: productData[0]!.id,
      weight: productData[0]!.weight,
      name: productData[0]!.name,
      cart_id: "",
    };

    if (!hasCookie("cart_id")) {
      const new_cart_id = generateString(16);
      mutateOptions.cart_id = new_cart_id;
      setCookie("cart_id", new_cart_id);
    } else {
      mutateOptions.cart_id = getCookie("cart_id")!.toString();
    }
    addToCart
      .mutateAsync(mutateOptions)
      .then(() => {
        setButtonText("Added to Cart!");
        setProcessing(false);
      })
      .catch(() => window.alert("error"));
  };

  useEffect(() => {
    if (productData && productData[0]) {
      if (productData[0].product_quantity.size === "") {
        setLoadSizes(false);
        setMaxQuantity(
          productData[0].product_quantity.quantity_in_stock +
            productData[0].product_quantity.quantity_in_checkouts
        );
        setAddToCartDisabled(false);
      }
    }
  }, [productData]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPickedSize(event.target.value);
    const selectedOption = event.target.options[event.target.selectedIndex];
    const maxQuantity = selectedOption!.dataset.maxQuantity;
    console.log(maxQuantity);
    setMaxQuantity(parseInt(maxQuantity as string));
    if (parseInt(maxQuantity as string) === 0) {
      setSoldOut(true);
      setAddToCartDisabled(true);
    } else if (event.target.value === "") {
      setAddToCartDisabled(true);
    } else {
      setSoldOut(false);
      setAddToCartDisabled(false);
    }
  };

  const notify = api.subscription.notificationSignUp.useMutation();
  const notifyWhenInStock = (formData: notifyForm) => {
    notify
      .mutateAsync({
        product_id: router.query.id as string,
        name: productData[0]?.name as string,
        size: pickedSize,
        email: formData.email,
      })
      .catch((error) => console.log(error));
  };

  if (!productData || !productData[0])
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div className="flex flex-row justify-between gap-2 text-white">
          <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
          <p className="flex">Loading...</p>
        </div>
      </main>
    );

  const Title = `${productData[0].name} - Scalise`;

  return (
    <>
      <Head>
        <title>{Title}</title>
      </Head>
      <main className="min-h-screen bg-black">
        <div className="flex flex-col items-center justify-center pb-20 md:flex-row md:gap-10 md:pb-0 xl:px-28">
          <div className="relative flex h-full w-2/3 flex-col md:w-1/2">
            <div className="flex flex-row items-center gap-4 py-10">
              <Link
                className="text-xl text-white hover:text-blue-400 hover:underline active:text-blue-700 active:underline"
                href="/Store"
              >
                STORE
              </Link>
              <p className="text-white">&gt;</p>
              <p className="text-xl text-white">{productData[0].name}</p>
            </div>
            <Image
              className="full object-cover shadow-lg"
              src={`/${productData[0].image as string}`}
              alt="image"
              height={719}
              width={540}
            />
          </div>
          <div className="w-2/3 md:w-1/3">
            <div className="container flex flex-col gap-4 pb-16">
              <h1 className="mt-12 text-4xl text-white md:mt-8 md:text-8xl">
                {productData[0].name}
              </h1>
              <p className="text-xl text-white">
                $ {productData[0].price}
                {productData[0].price % 1 === 0 ? ".00" : ""}
              </p>
            </div>
            <div className="container flex flex-col gap-12">
              <form
                className="flex flex-col gap-4"
                onSubmit={cartSubmit(onSubmitCart)}
              >
                {loadSizes && (
                  <div>
                    <label
                      htmlFor="size"
                      className="block text-sm font-medium text-white"
                    >
                      Size
                    </label>
                    <div className="flex w-1/4 flex-row items-center">
                      <select
                        id="size"
                        {...cartRegister("size", { required: true })}
                        onChange={handleSizeChange}
                        defaultValue=""
                        className="appearance-none border bg-black py-2 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                      >
                        <option value="" disabled>
                          Select Size
                        </option>
                        {productData
                          .sort((a, b) => {
                            return (
                              allOptions[
                                a.product_quantity.size.trim() as sizes
                              ]! -
                              allOptions[
                                b.product_quantity.size.trim() as sizes
                              ]!
                            );
                          })
                          .map((product) => (
                            <option
                              key={product.product_quantity.size}
                              value={product.product_quantity.size}
                              data-max-quantity={
                                product.product_quantity.quantity_in_stock -
                                (product.product_quantity
                                  .quantity_in_checkouts || 0)
                              }
                            >
                              {product.product_quantity.size}
                              {product.product_quantity.quantity_in_stock -
                                (product.product_quantity
                                  .quantity_in_checkouts || 0) <=
                              0
                                ? "(Out of Stock)"
                                : ""}
                            </option>
                          ))}
                      </select>
                      <div className="absolute h-5 w-5 translate-x-28">
                        <CarretDown />
                      </div>
                    </div>
                  </div>
                )}
                {!soldOut && (
                  <>
                    <div>
                      <label
                        htmlFor="quantitiy"
                        className="block text-sm font-medium text-white"
                      >
                        Quantity
                      </label>
                      <input
                        id="quantities"
                        className="block w-1/4 rounded-lg border bg-black px-6 py-2 text-center text-sm text-white [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                        {...cartRegister("quantity", { required: true })}
                        type="number"
                        defaultValue={1}
                        max={maxQuantity}
                        min={1}
                      />
                    </div>

                    {!processing && (
                      <button
                        type="submit"
                        id="submitButton"
                        disabled={addToCartDisabled}
                        className={`mb-2 mr-2 inline-block w-1/2 rounded-lg border py-5 text-sm font-medium text-white hover:bg-white hover:text-black ${
                          addToCartDisabled ? "cursor-not-allowed" : ""
                        }`}
                      >
                        {buttonText}
                      </button>
                    )}
                    {processing && (
                      <button
                        type="button"
                        className="mb-2 mr-2 w-1/2 rounded-lg border py-5 text-sm font-medium text-white"
                        disabled
                      >
                        <div className="flex flex-row justify-center gap-2 px-2">
                          <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
                          <p className="flex">Processing...</p>
                        </div>
                      </button>
                    )}
                  </>
                )}
              </form>
              {soldOut && (
                <>
                  <h2 className="text-white">Sold Out</h2>
                  <form onSubmit={notifySubmit(notifyWhenInStock)}>
                    <label htmlFor="notify" className="text-white">
                      Notify when back in stock?
                    </label>
                    <input
                      id="notify"
                      type="email"
                      placeholder="email@example.com"
                      className="block w-auto rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      {...notifyRegister("email", { required: true })}
                    />
                    <button
                      type="submit"
                      className="mb-2 mr-2 inline-block w-auto rounded-lg bg-blue-700 px-10 py-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Notify Me!
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
