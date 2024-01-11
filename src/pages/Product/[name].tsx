/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
//import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useContext } from "react";
import { CarretDown } from "~/components/icons";
import { CartContext, type CartContextType } from "~/pages/_app";

import { Images } from "~/components/productImages";

import { motion } from "framer-motion";

/* export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
}; */

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

/* import { getProductPage } from "~/server/api/routers/inventoryRouter";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params as { name: string };
  const result = await getProductPage(name.replace(/-/g, " "));

  return {
    props: {
      product: result,
    },
  };
}; */

import {
  getProductPage,
  getProductRoutes,
} from "~/server/api/routers/inventoryRouter";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params as { name: string };
  const result = await getProductPage(name.replace(/-/g, " "));

  return {
    props: {
      product: result,
    },
    revalidate: 10,
  };
};

import { type GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const productPaths = await getProductRoutes();
  return {
    paths: productPaths,
    fallback: true,
  };
};

//props: InferGetServerSidePropsType<typeof getServerSideProps>
const Product: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const productData = props.product as {
    name: string;
    price: number;
    sale_price: number | null;
    description: string;
    weight: number;
    id: number;
    image: string | null;
    product_quantity: {
      size: string;
      quantity_in_stock: number;
      quantity_in_checkouts: number;
    };
  }[];
  /*     const router = useRouter();
    let name = "";
    if (router.query.name) {
      name = (router.query.name as string).replace(/-/g, " ");
    }
    const product = api.inventory.get.useQuery(
      { name: name },
      { enabled: !!router.query.name }
    );
    const productData = product.data as {
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

  const [loadSizes, setLoadSizes] = useState(true);
  const [soldOut, setSoldOut] = useState(false);
  const [addToCartDisabled, setAddToCartDisabled] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [pickedSize, setPickedSize] = useState("");
  const [processing, setProcessing] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [notifyProcessing, setNotifyProcessing] = useState(false);
  const [notifyButtonText, setNotifyButtonText] = useState("Notify Me!");
  const [goToCartButton, setGoToCart] = useState(false);

  const { updateAmount } = useContext<CartContextType>(CartContext);

  const addToCart = api.cart.addToCart.useMutation();
  const notify = api.email.notificationSignUp.useMutation();

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

  useEffect(() => {
    if (productData && productData[0]) {
      if (productData[0].product_quantity.size === "") {
        setLoadSizes(false);
        if (productData[0].product_quantity.quantity_in_stock === -1) {
          setMaxQuantity(-1);
          setAddToCartDisabled(false);
        } else {
          setMaxQuantity(
            productData[0].product_quantity.quantity_in_stock +
              productData[0].product_quantity.quantity_in_checkouts
          );
        }
        setAddToCartDisabled(false);
      }
    }
  }, [productData]);
  const onSubmitCart = (formData: addToCartForm) => {
    setProcessing(true);
    const mutateOptions = {
      size: formData.size,
      quantity: parseInt(formData.quantity) || 1,
      price:
        (productData[0]?.sale_price as number) ||
        (productData[0]?.price as number),
      product_id: productData[0]?.id as number,
      weight: productData[0]?.weight as number,
      name: productData[0]?.name as string,
      cart_id: "",
      max_quantity: maxQuantity,
    };

    if (!navigator.cookieEnabled) {
      window.alert("Please enable cookies to continue");
      setProcessing(false);
      return;
    }

    if (!hasCookie("cart_id")) {
      const new_cart_id = generateString(16);
      mutateOptions.cart_id = new_cart_id;
      setCookie("cart_id", new_cart_id);
    } else {
      mutateOptions.cart_id = getCookie("cart_id")?.toString() as string;
    }
    addToCart
      .mutateAsync(mutateOptions)
      .then(() => {
        updateAmount(mutateOptions.quantity);
        setButtonText("Added to Cart!");
        setGoToCart(true);
        setProcessing(false);
      })
      .catch((error: { message: string }) => {
        window.alert(error.message);
        setProcessing(false);
      });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setButtonText("Add to Cart");
    setPickedSize(event.target.value);
    const selectedOption = event.target.options[event.target.selectedIndex];
    const maxQuantity = selectedOption?.dataset.maxQuantity;
    setMaxQuantity(parseInt(maxQuantity as string));
    if (parseInt(maxQuantity as string) === 0) {
      setSoldOut(true);
      setAddToCartDisabled(true);
    } else {
      setSoldOut(false);
      setAddToCartDisabled(false);
    }
  };

  const notifyWhenInStock = (formData: notifyForm) => {
    setNotifyProcessing(true);
    notify
      .mutateAsync({
        product_id: productData[0]?.id.toString() as string,
        name: productData[0]?.name as string,
        size: pickedSize,
        email: formData.email,
      })
      .then(() => {
        setNotifyProcessing(false);
        setNotifyButtonText("Confirmed!");
      })
      .catch((error) => console.log(error));
  };

  if (!productData || !productData[0])
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <div className="flex flex-row justify-between gap-2 text-stone-100">
          <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
          <p className="flex">Loading...</p>
        </div>
      </main>
    );

  const images = productData[0].image?.split(",");

  return (
    <>
      <Head>
        <title>SECOND HAND DAN - PRODUCTS</title>
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
      <main className="mx-auto min-h-screen bg-stone-950">
        <div className="hidden justify-center md:flex">
          <div className="flex w-full flex-row items-center justify-start gap-4 py-2 md:w-11/12 md:py-4 md:pl-8 lg:py-6 lg:pl-10 xl:w-3/4 xl:py-8 xl:pl-4 ">
            <Link
              className="text-xl text-stone-100 hover:text-red-800 hover:underline active:text-red-950 active:underline"
              href="/Store"
            >
              STORE
            </Link>
            <p className="text-stone-100">&gt;</p>
            <p className="text-xl text-stone-100">{productData[0].name}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pb-20 pt-8 md:flex-row md:items-start md:gap-10 md:pt-0 xl:px-28">
          {images?.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  y: { stiffness: 1000, duration: 0.5 },
                  opacity: { duration: 0.5 },
                },
              }}
            >
              <Image
                className="full flex border-stone-100 object-cover shadow-lg"
                src={`/${images[0]?.trim() as string}`}
                alt="image"
                height={719}
                width={540}
              />
            </motion.div>
          )}
          {(images?.length as number) > 1 && (
            <Images images={images as string[]} />
          )}

          <div className="w-2/3 md:w-1/3">
            <div className="container flex flex-col gap-4 pb-4">
              <h1 className="mt-12 text-4xl text-stone-100 md:mt-8 md:text-5xl lg:text-6xl">
                {productData[0].name}
              </h1>
              {productData[0].name ===
                "From Nothing To Nothing Digital Download" && (
                <h5 className="mb-2 pr-2 text-2xl tracking-tight text-stone-100">
                  FREE!
                </h5>
              )}
              {productData[0].name !==
                "From Nothing To Nothing Digital Download" && (
                <div className="flex flex-row">
                  <p
                    className={`mb-2 pr-2 text-xl tracking-tight text-stone-100 ${
                      productData[0].sale_price === null ? "hidden" : "block"
                    }`}
                  >
                    ${productData[0].sale_price}
                    {(productData[0].sale_price as number) % 1 === 0
                      ? ".00"
                      : ""}
                  </p>
                  <p
                    className={`mb-2 text-xl tracking-tight text-stone-100 ${
                      productData[0].sale_price !== null ? "line-through" : ""
                    }`}
                  >
                    ${productData[0].price}
                    {productData[0].price % 1 === 0 ? ".00" : ""}
                  </p>
                </div>
              )}
            </div>
            <p className="my-8 text-xl text-stone-100">
              {productData[0].description}
            </p>
            <div className="container flex flex-col gap-12">
              <form
                className="flex flex-col gap-4"
                onSubmit={cartSubmit(onSubmitCart)}
              >
                {loadSizes && (
                  <div>
                    <label
                      htmlFor="size"
                      className="block pb-2 text-sm font-medium text-stone-100"
                    >
                      Size
                    </label>
                    <div className="relative flex w-1/2 items-center">
                      <select
                        id="size"
                        {...cartRegister("size", { required: true })}
                        onChange={handleSizeChange}
                        defaultValue=""
                        className="z-10 h-12 w-full appearance-none border bg-transparent pl-4 text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-100 focus:ring-offset-2 focus:ring-offset-stone-950"
                      >
                        <option value="" data-max-quantity={0} disabled>
                          Select Size
                        </option>
                        {productData
                          .sort((a, b) => {
                            return (
                              (allOptions[
                                a.product_quantity.size.trim() as sizes
                              ] as number) -
                              (allOptions[
                                b.product_quantity.size.trim() as sizes
                              ] as number)
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
                                ? "(Sold Out)"
                                : ""}
                            </option>
                          ))}
                      </select>
                      <div className="absolute flex h-full w-full flex-row items-center justify-end object-contain">
                        <div className="absolute z-10 mr-4 h-5 w-5 md:max-lg:mr-2">
                          <CarretDown />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {productData[0].description !== "" && (
                  <p>{productData[0].description}</p>
                )}
                {productData[0].name ===
                  "From Nothing To Nothing Digital Download" && (
                  <Link
                    href="https://drive.google.com/file/d/1wtm3NGxEYZNAJKuiHrc6BPGojMYsEip6/view"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="mb-2 mr-2 inline-block w-1/2 rounded-lg border py-5 text-center text-sm font-medium text-stone-100 hover:bg-stone-100 hover:text-stone-950"
                  >
                    Click here for download
                  </Link>
                )}
                {!soldOut &&
                  productData[0].name !==
                    "From Nothing To Nothing Digital Download" && (
                    <>
                      {maxQuantity !== -1 && (
                        <div>
                          <label
                            htmlFor="quantitiy"
                            className="block pb-2 text-sm font-medium text-stone-100"
                          >
                            Quantity
                          </label>
                          <div className="relative flex w-1/2 items-center sm:w-1/4">
                            <select
                              id="quantity"
                              defaultValue="1"
                              {...cartRegister("quantity")}
                              //onChange={handleQuantityChange}
                              onClick={() => {
                                if (pickedSize === "") {
                                  window.alert("select a size first");
                                }
                              }}
                              onChange={() => setButtonText("Add to Cart")}
                              className="z-10 h-12 w-full appearance-none border bg-transparent pl-4 text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-100 focus:ring-offset-2 focus:ring-offset-stone-950"
                            >
                              {[
                                ...(Array(
                                  Math.min(maxQuantity, 20)
                                ) as number[]),
                              ]
                                .map((_, i) => i + 1)
                                .map((i: number) => (
                                  <option key={i} value={i}>
                                    {i}
                                  </option>
                                ))}
                            </select>
                            <div className="absolute flex h-full w-full flex-row items-center justify-end object-contain">
                              <div className="absolute z-0 mr-4 h-5 w-5 md:max-lg:mr-2">
                                <CarretDown />
                              </div>
                            </div>
                          </div>
                          {/*                       <input
                    id="quantity"
                    className="block w-1/2 rounded-lg border bg-stone-950 px-6 py-2 text-center text-sm text-stone-100 [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-stone-100 focus:ring-offset-2 focus:ring-offset-stone-950 sm:w-1/4 md:max-lg:px-4"
                    {...cartRegister("quantity", { required: true })}
                    type="number"
                    defaultValue={1}
                    max={maxQuantity}
                    min={1}
                  /> */}
                        </div>
                      )}
                      <div className="flex flex-row gap-4">
                        {!processing && (
                          <button
                            type="submit"
                            id="submitButton"
                            disabled={addToCartDisabled}
                            className={`mb-2 mr-2 inline-block w-1/2 rounded-lg border py-5 text-sm font-medium text-stone-100 hover:bg-stone-100 hover:text-stone-950 ${
                              addToCartDisabled ? "cursor-not-allowed" : ""
                            }`}
                            onClick={(e) => {
                              if (pickedSize === "" && loadSizes === true) {
                                e.preventDefault();
                                alert("Please pick a size");
                              }
                            }}
                          >
                            {buttonText}
                          </button>
                        )}
                        {processing && (
                          <button
                            type="button"
                            className="mb-2 mr-2 w-1/2 rounded-lg border py-5 text-sm font-medium text-stone-100"
                            disabled
                          >
                            <div className="flex flex-row justify-center gap-2 px-2">
                              <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
                              <p className="flex">Processing...</p>
                            </div>
                          </button>
                        )}
                        {goToCartButton && (
                          <Link
                            className="mb-2 mr-2 w-1/2 rounded-lg border py-5 text-center text-sm font-medium text-stone-100 hover:bg-stone-100 hover:text-stone-950"
                            href="/Cart"
                          >
                            Go To Cart
                          </Link>
                        )}
                      </div>
                    </>
                  )}
              </form>
              {soldOut && (
                <>
                  <h2 className="text-stone-100">Sold Out</h2>
                  <form onSubmit={notifySubmit(notifyWhenInStock)}>
                    <label htmlFor="notify" className="text-stone-100">
                      Notify when back in stock?
                    </label>
                    <input
                      id="notify"
                      type="email"
                      placeholder="email@example.com"
                      className="mb-4 block w-auto rounded-lg border bg-stone-950 px-6 py-2 text-sm text-stone-100 [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-stone-100 focus:ring-offset-2 focus:ring-offset-stone-950"
                      {...notifyRegister("email", { required: true })}
                    />
                    {!notifyProcessing && (
                      <button
                        type="submit"
                        className="mb-2 mr-2 w-1/2 rounded-lg border py-5 text-sm font-medium text-stone-100 hover:bg-stone-100 hover:text-stone-950"
                      >
                        {notifyButtonText}
                      </button>
                    )}
                    {notifyProcessing && (
                      <button
                        type="button"
                        className="mb-2 mr-2 w-1/2 rounded-lg border py-5 text-sm font-medium text-stone-100"
                        disabled
                      >
                        <div className="flex flex-row justify-center gap-2 px-2">
                          <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
                          <p className="flex">Processing...</p>
                        </div>
                      </button>
                    )}
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
