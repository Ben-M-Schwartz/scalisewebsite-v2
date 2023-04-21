/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { getCookie, hasCookie } from "cookies-next";

import { useRouter } from "next/router";

import { api } from "~/utils/api";

type CartItem = {
  product_id: number | null;
  price: number | null;
  quantity: number | null;
  size: string | null;
  weight: number | null;
  item_name: string | null;
  quantity_in_stock: number | null;
  quantity_in_checkouts: number | null;
  image: string | null;
};

type Cart = {
  cart_id: string | null;
  total_price: string | null;
  total_weight: string | null;
  cart_item: CartItem | null;
};

const Cart: NextPage = () => {
  const [emptyCart, setEmptyCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();

  const cart_id = getCookie("cart_id")?.toString() || "not found";
  const queryResult = api.cart.getCart.useQuery({ cart_id: cart_id });

  useEffect(() => {
    if (!hasCookie("cart_id")) {
      setEmptyCart(true);
      setLoading(false);
    } else {
      if (queryResult.data && queryResult.data.length > 0) {
        setEmptyCart(false);
        const cart_items = queryResult.data as Cart[];
        console.log(cart_items);
        setTotalPrice(queryResult.data[0]!.total_price as number);
        setCartItems(cart_items);
        setLoading(false);
      } else {
        setEmptyCart(true);
      }
      if (queryResult.data) {
        setLoading(false);
      }
    }
  }, [queryResult]);

  const addToCart = api.cart.addToCart.useMutation();
  const handleAddToCart = (
    item_name: string,
    size: string,
    quantity: number,
    product_id: number,
    price: number,
    weight: number
  ) => {
    addToCart
      .mutateAsync({
        cart_id: cart_id,
        name: item_name,
        size: size,
        quantity: quantity,
        product_id: product_id,
        price: price,
        weight: weight,
      })
      .then(() => {
        router.reload();
      })
      .catch((error) => console.error(error));
  };

  const removeFromCart = api.cart.remove.useMutation();
  const handleRemoveFromCart = (
    product_id: number,
    size: string,
    quantity: number,
    price: number,
    weight: number,
    fullRemove: boolean
  ) => {
    if (cartItems.length <= 1 && fullRemove === true) {
      handleClearCart();
    } else {
      removeFromCart
        .mutateAsync({
          product_id: product_id,
          cart_id: cart_id,
          size: size,
          quantity: quantity,
          price: price,
          weight: weight,
          fullRemove: fullRemove,
        })
        .then(() => {
          router.reload();
        })
        .catch((error) => console.error(error));
    }
  };

  const clearCart = api.cart.clearCart.useMutation();
  const handleClearCart = () => {
    clearCart
      .mutateAsync({ cart_id: cart_id })
      .then(() => {
        setEmptyCart(true);
        router.reload();
      })
      .catch((error) => console.error(error));
  };

  const createCheckoutSession = api.checkout.checkOut.useMutation();
  const createOrder = api.checkout.createOrder.useMutation();
  const handleCheckout = async () => {
    const cart_items = cartItems.map((item) => {
      return {
        product_id: item.cart_item?.product_id as number,
        price: item.cart_item?.price as number,
        quantity: item.cart_item?.quantity as number,
        size: item.cart_item?.size as string,
        item_name: item.cart_item?.item_name as string,
        weight: item.cart_item?.weight as number,
        image: item.cart_item?.image as string,
      };
    });
    await createCheckoutSession
      .mutateAsync({ cartItems: cart_items })
      .then(async (result) => {
        if (result[0] === "Not Enough Inventory") {
          let errorMessage = "Sorry! Unfortunately our inventory has changed\n";
          const overflows = result[1] as unknown as {
            item_name: string;
            quantity: number;
            max: number;
            product_id: number;
            size: string;
            price: number;
            weight: number;
          }[];

          const promises = [];
          for (const obj of overflows) {
            if (obj.max === 0) {
              errorMessage += `${obj.item_name} ${
                obj.size ? `Size: ${obj.size}` : ""
              } 
            is no longer available. See the store page to be notified when it is back in stock\n`;
            } else {
              errorMessage += `We now only have ${obj.max} left in stock for ${
                obj.item_name
              } ${obj.size ? `Size: ${obj.size}` : ""} `;
            }
            promises.push(
              removeFromCart.mutateAsync({
                product_id: obj.product_id,
                cart_id: cart_id,
                size: obj.size,
                quantity: obj.quantity - obj.max,
                price: obj.price,
                weight: obj.weight,
                fullRemove: obj.max === 0,
              })
            );
          }

          await Promise.all(promises)
            .then(() => {
              window.alert(errorMessage);
              router.reload();
            })
            .catch((error) => console.log(error));
        } else {
          createOrder
            .mutateAsync({
              cartItems: cart_items,
              checkoutId: result[1] as string,
            })
            .then(() => {
              router
                .push(result[0] as string)
                .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {loading && <div className="text-white">Loading...</div>}
        {!loading && emptyCart && (
          <>
            <h1 className="text-2xl font-bold text-white">
              Your cart is empty
            </h1>
            <Link
              className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
              href="/Store"
            >
              Store
            </Link>
          </>
        )}
        {!loading && !emptyCart && (
          <>
            <h1 className="text-2xl font-bold text-white">
              Cart ({cartItems.length} Item(s))
            </h1>
            <div className="flex flex-col items-center justify-center">
              <div className="divide-y">
                {cartItems.map((item: any) => (
                  <div
                    key={item.cart_item.product_id}
                    className="flex items-center justify-center gap-10 py-4"
                  >
                    <div className="relative flex h-32 w-32 items-center justify-center">
                      <Image
                        className="full object-cover"
                        src={`/${item.cart_item.image as string}.png`}
                        alt="image"
                        fill
                      />
                    </div>
                    <div>
                      <div className="pr-4 font-medium text-gray-100">
                        {item.cart_item.item_name}
                      </div>
                      <div className="text-gray-500">
                        Price: ${item.cart_item.price}
                      </div>
                      {item.cart_item.size !== "" && (
                        <div className="text-gray-500">
                          Size: {item.cart_item.size}
                        </div>
                      )}
                    </div>
                    <div className="flex w-1/5 items-center">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddToCart(
                            item.cart_item.item_name,
                            item.cart_item.size,
                            1,
                            item.cart_item.product_id,
                            item.cart_item.price,
                            item.cart_item.weight
                          );
                        }}
                      >
                        <button
                          disabled={
                            item.cart_item.quantity >=
                            item.cart_item.quantity_in_stock -
                              (item.cart_item.quantity_in_checkouts
                                ? item.cart_item.quantity_in_checkouts
                                : 0)
                          }
                          type="submit"
                          className="rounded-l-lg bg-gray-700 px-1 py-1 hover:bg-blue-500 active:bg-gray-900 disabled:bg-gray-400"
                        >
                          +
                        </button>
                      </form>
                      <input
                        type="number"
                        name="quantity"
                        className="block w-[50px] rounded-none border border-gray-300 bg-gray-50 px-1 py-1 text-sm text-gray-900 [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        value={item.cart_item.quantity}
                        max={
                          item.cart_item.quantity_in_stock -
                          (item.cart_item.quantity_in_checkouts
                            ? item.cart_item.quantity_in_checkouts
                            : 0)
                        }
                        min={1}
                        readOnly
                      />
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleRemoveFromCart(
                            item.cart_item.product_id,
                            item.cart_item.size,
                            1,
                            item.cart_item.price,
                            item.cart_item.weight,
                            false
                          );
                        }}
                      >
                        <button
                          disabled={item.cart_item.quantity <= 1}
                          type="submit"
                          className="rounded-r-lg bg-gray-700 px-1 py-1 hover:bg-blue-500 active:bg-gray-900 disabled:bg-gray-400"
                        >
                          -
                        </button>
                      </form>
                    </div>
                    <div className="text-right text-gray-100">
                      <div>
                        Total: ${item.cart_item.price * item.cart_item.quantity}
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleRemoveFromCart(
                            item.cart_item.product_id,
                            item.cart_item.size,
                            item.cart_item.quantity,
                            item.cart_item.price,
                            item.cart_item.weight,
                            true
                          );
                        }}
                      >
                        <button
                          type="submit"
                          className="font-medium text-gray-500 hover:text-blue-700 hover:underline active:text-gray-500"
                        >
                          Remove
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <div className="flex flex-col items-center justify-center text-white">
              <h1>Subtotal: {totalPrice}</h1>
              <button
                className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Cart;

//need to come back to the onchange for this input
/*                           onChange={(e) => {
                            if(Number.isNaN(parseInt(e.target.value))){

                            } else{
                              if(e.target.value > item.cart_item.quantity){
                                item.cart_item.quantity = Math.min(parseInt(e.target.value), item.cart_item.quantity_in_stock - (item.cart_item.quantity_in_checkouts ? item.cart_item.quantity_in_checkouts : 0))
                                handleAddToCart(item.cart_item.item_name, item.cart_item.size, Math.min(parseInt(e.target.value), item.cart_item.quantity_in_stock - (item.cart_item.quantity_in_checkouts ? item.cart_item.quantity_in_checkouts : 0)))
                                if(e.target.value > item.cart_item.quantity_in_stock - (item.cart_item.quantity_in_checkouts ? item.cart_item.quantity_in_checkouts : 0)){
                                  window.alert(`Sorry, we only have ${item.cart_item.quantity_in_stock - (item.cart_item.quantity_in_checkouts ? item.cart_item.quantity_in_checkouts : 0)} in stock`)
                                }
                              } else {
                                item.cart_item.quantity = Math.max(parseInt(e.target.value), 1)
                                handleRemoveFromCart(item.cart_item.product_id, item.cart_item.size, Math.max(parseInt(e.target.value), 1))
                              }
                            }
                          }} */
