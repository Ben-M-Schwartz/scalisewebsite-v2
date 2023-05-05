/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { CartContext, type CartContextType } from "~/pages/_app";
import Link from "next/link";
import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Item } from "~/components/cartItem";
import { motion, AnimatePresence } from "framer-motion";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

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
  is_taxed: number | null;
};

type Cart = {
  cart_id: string;
  total_price: string | null;
  total_weight: string | null;
  cart_item: CartItem | null;
};

const Cart: NextPage = () => {
  const [emptyCart, setEmptyCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [disable, setDisable] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const cart_id = getCookie("cart_id")?.toString() || "not found";

  const { updateAmount } = useContext<CartContextType>(CartContext);

  useEffect(() => {
    if (!hasCookie("cart_id")) {
      setEmptyCart(true);
      setLoading(false);
    }
  }, []);

  api.cart.getCart.useQuery(
    {
      cart_id: cart_id,
    },
    {
      onSuccess: (data) => {
        if (data.length === 0 || !data) {
          setEmptyCart(true);
        } else {
          setTotalPrice(data[0]!.total_price as number);
          setCartItems(data as Cart[]);
        }
        setLoading(false);
      },
    }
  );
  const addToCart = api.cart.addToCart.useMutation();
  const handleAddToCart = (
    item_name: string,
    size: string,
    quantity: number,
    product_id: number,
    price: number,
    weight: number
  ) => {
    setProcessing(true);
    setDisable(true);
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
        setProcessing(false);
        setUpdated(true);
        setTimeout(() => setUpdated(false), 1000);
        updateAmount(quantity);
        setDisable(false);
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
    setProcessing(true);
    setDisable(true);
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
          setProcessing(false);
          setUpdated(true);
          setTimeout(() => setUpdated(false), 1000);
          updateAmount(-quantity);
          if (fullRemove) {
            window.alert("Removed From Cart");
          }
          setDisable(false);
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
        is_taxed: item.cart_item?.is_taxed as number,
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

  const handleTotalUpdate = useCallback((newTotal: number) => {
    setTotalPrice(Math.floor(newTotal * 100) / 100);
  }, []);

  return (
    <>
      <Head>
        <title>SCALISE</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gray-900 pb-20">
        {loading && (
          <div className="flex min-h-screen flex-row items-center justify-between gap-2 text-white">
            <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
            <p className="flex">Loading...</p>
          </div>
        )}
        {!loading && emptyCart && (
          <>
            <div className="flex flex-col items-center justify-center gap-2 pb-20 pt-32">
              <h1 className="text-2xl font-bold text-white">
                Your cart is empty
              </h1>
              <Link
                className="focus:shadow-outline text-xsl w-full rounded-sm border-2 border-white bg-rose-700 py-4 text-center text-white hover:border-rose-700 hover:bg-white hover:text-rose-700 active:bg-rose-400"
                href="/Store"
              >
                Return To Store
              </Link>
            </div>
          </>
        )}
        {!loading && !emptyCart && (
          <>
            <div className="border-bo flex w-full flex-row items-center justify-start gap-4 px-4 pt-10 sm:w-2/3 sm:px-0">
              <h1 className="text-2xl font-bold text-white">Shopping Cart</h1>
              <button
                className="focus:shadow-outline rounded-lg border border-white bg-transparent px-2 py-1 text-xs text-white hover:border-black hover:bg-gray-100 hover:text-black active:bg-blue-600"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <div
                className={`flex flex-row justify-center gap-2 px-2 ${
                  processing ? "block" : "hidden"
                }`}
              >
                <span className="flex h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-white"></span>
                <p className="flex text-white">Processing...</p>
              </div>
              <AnimatePresence>
                {updated && (
                  <motion.p
                    className="px-6 text-white"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    Updated
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="flex w-full flex-col justify-between border-b border-b-white px-4 sm:w-2/3 sm:px-0">
              <div className="divide-y divide-gray-600">
                {cartItems.map((item: Cart, index) => (
                  <>
                    <div
                      key={`div_${index}`}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <Item
                        key={`item_${index}`}
                        item={item.cart_item as CartItem}
                        disableUpdates={disable}
                        onAdd={() => {
                          handleTotalUpdate(
                            totalPrice + item.cart_item!.price!
                          );
                          //window.alert("Updated Quantity");
                          handleAddToCart(
                            item.cart_item!.item_name!,
                            item.cart_item!.size as string,
                            1,
                            item.cart_item!.product_id as number,
                            item.cart_item!.price as number,
                            item.cart_item!.weight as number
                          );
                        }}
                        onRemove={() => {
                          handleTotalUpdate(
                            totalPrice - item.cart_item!.price!
                          );
                          //window.alert("Updated Quantity");
                          handleRemoveFromCart(
                            item.cart_item!.product_id!,
                            item.cart_item!.size as string,
                            1,
                            item.cart_item!.price as number,
                            item.cart_item!.weight as number,
                            false
                          );
                        }}
                        onTextUpdate={(changeAmount: number, op: "+" | "-") => {
                          if (op === "+") {
                            handleTotalUpdate(
                              totalPrice + item.cart_item!.price! * changeAmount
                            );
                            //window.alert("Updated Quantity");
                            handleAddToCart(
                              item.cart_item!.item_name as string,
                              item.cart_item!.size as string,
                              changeAmount,
                              item.cart_item!.product_id as number,
                              item.cart_item!.price as number,
                              item.cart_item!.weight as number
                            );
                          } else {
                            handleTotalUpdate(
                              totalPrice -
                                (item.cart_item!.price as number) * changeAmount
                            );
                            //window.alert("Updated Quantity");
                            handleRemoveFromCart(
                              item.cart_item!.product_id as number,
                              item.cart_item!.size as string,
                              changeAmount,
                              item.cart_item!.price as number,
                              item.cart_item!.weight as number,
                              false
                            );
                          }
                        }}
                        onDelete={() => {
                          handleRemoveFromCart(
                            item.cart_item!.product_id as number,
                            item.cart_item!.size as string,
                            item.cart_item!.quantity as number,
                            item.cart_item!.price as number,
                            item.cart_item!.weight as number,
                            true
                          );
                        }}
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="flex w-2/3 flex-col items-end justify-center gap-4 pt-4 text-white">
              <div className="flex w-full grow flex-row justify-between sm:w-1/3">
                <p>Subtotal: </p>
                <p className="text-xl font-bold">
                  ${totalPrice}
                  {totalPrice % 1 === 0 ? ".00" : ""}
                </p>
              </div>
              <button
                className="focus:shadow-outline text-xsl w-full rounded-sm border-2 border-white bg-rose-700 py-4 text-white hover:border-rose-700 hover:bg-white hover:text-rose-700 active:bg-rose-400 sm:w-1/3"
                onClick={handleCheckout}
                disabled={disable}
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
