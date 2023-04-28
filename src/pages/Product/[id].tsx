/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";

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

  if (!productData || !productData[0]) return null;

  return (
    <>
      <Head>
        <title>{productData[0].name} - SCALISE</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <h1 className="mt-12 pl-4 text-4xl text-white">Product Page</h1>
        <div className="flex flex-row gap-20">
          <div className="h-132 relative flex w-96 items-center justify-center">
            <Image
              className="full object-cover"
              src={`/${productData[0].image as string}.png`}
              alt="image"
              fill
            />
          </div>
          <div className="w-1/2">
            <div className="container mx-auto flex flex-col gap-12">
              <h1 className="mt-12 text-4xl text-white">
                {productData[0].name}
              </h1>
              <p className="text-white">$ {productData[0].price}</p>
            </div>
            <div className="container flex flex-col gap-12 px-4 py-16 ">
              <form
                className="flex flex-col gap-4"
                onSubmit={cartSubmit(onSubmitCart)}
              >
                {loadSizes && (
                  <div>
                    <label
                      htmlFor="size"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Size
                    </label>
                    <select
                      id="size"
                      {...cartRegister("size", { required: true })}
                      onChange={handleSizeChange}
                      defaultValue=""
                    >
                      <option value="" disabled selected>
                        Select Size
                      </option>
                      {productData
                        .sort((a, b) => {
                          return (
                            allOptions[
                              a.product_quantity.size.trim() as sizes
                            ]! -
                            allOptions[b.product_quantity.size.trim() as sizes]!
                          );
                        })
                        .map((product) => (
                          <option
                            key={product.product_quantity.size}
                            value={product.product_quantity.size}
                            data-max-quantity={
                              product.product_quantity.quantity_in_stock -
                              (product.product_quantity.quantity_in_checkouts ||
                                0)
                            }
                          >
                            {product.product_quantity.size}
                            {product.product_quantity.quantity_in_stock -
                              (product.product_quantity.quantity_in_checkouts ||
                                0) <=
                            0
                              ? "(Out of Stock)"
                              : ""}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                {!soldOut && (
                  <>
                    <div>
                      <label
                        htmlFor="quantitiy"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <input
                        id="quantities"
                        className="block w-auto rounded-lg border border-gray-300 bg-gray-50 px-1 py-2 text-sm text-gray-900 [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        {...cartRegister("quantity", { required: true })}
                        type="number"
                        max={maxQuantity}
                      />
                    </div>

                    {!processing && (
                      <button
                        type="submit"
                        id="submitButton"
                        disabled={addToCartDisabled}
                        className={`mb-2 mr-2 inline-block w-1/2 rounded-lg py-5 text-sm font-medium text-white focus:outline-none ${
                          addToCartDisabled
                            ? "cursor-not-allowed bg-gray-500"
                            : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        }`}
                      >
                        {buttonText}
                      </button>
                    )}
                    {processing && (
                      <button
                        type="button"
                        className="mb-2 mr-2 w-1/2 rounded-lg bg-blue-700 py-5 text-sm font-medium text-white dark:bg-blue-600"
                        disabled
                      >
                        <div className="flex flex-row justify-between px-2">
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
