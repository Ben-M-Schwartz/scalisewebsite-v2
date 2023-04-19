/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect } from 'react';
import Link from "next/link";

import { getCookie, hasCookie } from 'cookies-next';

import { useRouter } from 'next/router';

import { api } from "~/utils/api";

type CartItem = {
  product_id: number | null;
  price: string | null;
  quantity: number | null;
  size: string | null;
  item_name: string | null;
  quantity_in_stock: number | null;
  quantity_in_checkouts: number | null;
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

  const cart_id = getCookie('cart_id')?.toString() || 'not found';
  const queryResult = api.cart.getCart.useQuery({ cart_id: cart_id });

  useEffect(() => {
    if (!hasCookie('cart_id')) {
      setEmptyCart(true);
      setLoading(false);
    } else {
      if (queryResult.data && queryResult.data.length > 0) {
        setEmptyCart(false);
        const cart_items = queryResult.data as Cart[];
        console.log(cart_items)
        setTotalPrice(parseFloat(queryResult.data[0]!.total_price as string))
        setCartItems(cart_items);
        setLoading(false);
      }  else {
        setEmptyCart(true);
      }
      if(queryResult.data){
        setLoading(false)
      }
    }
  }, [queryResult]);

  const addToCart = api.cart.updateCart.useMutation()
  const handleAddToCart = (item_name: string, size: string, quantity: number) => {
    addToCart.mutateAsync({ 
      cart_id: cart_id, 
      name: item_name, 
      size: size, 
      quantity: quantity,
      })
      .then(() => {
        router.reload()
      }).catch((error) => console.error(error))
  }

  const removeFromCart = api.cart.remove.useMutation()
  const handleRemoveFromCart = (product_id: string, size: string, quantity: number) => {
    removeFromCart.mutateAsync({ 
      product_id: product_id.toString(), 
      cart_id: cart_id, 
      size: size, 
      quantity: quantity, 
      fullRemove: false})
    .then(() => {
      router.reload()
    }).catch((error) => console.error(error))
  }

  //removes all of one item from the cart
  const handleRemoveAllFromCart = (product_id: string, size: string, quantity: number) => {
    removeFromCart.mutateAsync({ 
      product_id: product_id.toString(), 
      cart_id: cart_id, 
      size: size, 
      quantity: quantity, 
      fullRemove: true})
    .then(() => {
      router.reload()
    }).catch((error) => console.error(error))
  }

  const clearCart = api.cart.clearCart.useMutation()
  const handleClearCart = () => {
    clearCart.mutateAsync({ cart_id: cart_id })
    .then(() => {
      setEmptyCart(true)
      router.reload()
    }).catch((error) => console.error(error))
  }

  const createCheckoutSession = api.checkout.checkOut.useMutation()
  const createOrder = api.checkout.createOrder.useMutation()
  const handleCheckout = async () => {
    const cart_items = cartItems.map(item => {
      return {
        product_id: item.cart_item?.product_id?.toString() as string,
        price: item.cart_item?.price as string,
        quantity:  item.cart_item?.quantity as number,
        size: item.cart_item?.size as string,
        item_name: item.cart_item?.item_name as string
      }
    })
    await createCheckoutSession.mutateAsync({cartItems: cart_items})
    .then((result) => {

      if(result[0] === 'Not Enough Inventory'){
        let errorMessage = 'Sorry! Unfortunately our inventory has changed\n'
        const overflows = result[1] as unknown as {item_name: string, quantity: number, max: number, product_id: string, size: string}[]
        for(let obj of overflows){
          if(obj.max === 0){
            errorMessage += `${obj.item_name} is no longer available. See the store page to be notified when it is back in stock\n`
            removeFromCart.mutateAsync({product_id: obj.product_id, cart_id: cart_id, size: obj.size, quantity: obj.quantity, fullRemove: true})
          } else {
            errorMessage += `We now only have ${obj.max} left in stock for ${obj.item_name}`
            removeFromCart.mutateAsync({product_id: obj.product_id, cart_id: cart_id, size: obj.size, quantity: obj.max, fullRemove: false})
          }
        }
        window.alert(errorMessage);
        router.reload();

      } else {
        createOrder.mutateAsync({cartItems: cart_items, checkoutId: result[1] as string})
        .then(() => {

          router.push(result[0] as string).catch(error=>console.error(error))

        }).catch(error => console.error(error))
      }
    }).catch(error => console.error(error))
    }

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]'>
        {loading && (
          <div className='text-white'>Loading...</div>
        )}
        {!loading && emptyCart && (
          <><h1 className='text-white text-2xl font-bold'>Your cart is empty</h1>
          <Link className = 'text-white text-xl font-bold hover:underline hover:text-blue-700 active:text-gray-500' href='/Store'>Store</Link>
          </>
        )}
        {!loading && !emptyCart && (
          <>
            <h1 className='text-white text-2xl font-bold'>Cart</h1>
            <div className='flex flex-col items-center justify-center'>
            <div className="divide-y">
              {cartItems.map((item: any) => (
                <div key={item.cart_item.product_id} className="flex items-center justify-center gap-10 py-4">
                  <div>
                    <div className="font-medium text-gray-100 w-2/5 pr-4">{item.cart_item.item_name}</div>
                    {item.cart_item.size !== 'NO SIZES' && (
                      <div className="text-gray-500">{item.cart_item.size}</div>
                    )}
                  </div>
                  <div className="w-1/5 flex items-center">
                    <form onSubmit={(e) => {e.preventDefault(); 
                      handleAddToCart(item.cart_item.item_name, item.cart_item.size, parseInt(item.cart_item.quantity) + 1)}}>
                      <button disabled={item.cart_item.quantity >= (item.cart_item.quantity_in_stock - (item.cart_item.quantity_in_checkouts ? item.cart_item.quantity_in_checkouts : 0))} type='submit' className='bg-gray-700 hover:bg-blue-500 active:bg-gray-900 disabled:bg-gray-400 px-1 py-1 rounded-l-lg'>+</button>
                    </form>
                    <input
                      type="number"
                      name="quantity"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-[50px] rounded-none border border-gray-300 bg-gray-50 px-1 py-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      value={item.cart_item.quantity}
                      max={item.cart_item.quantity_in_stock - (item.cart_item.quantity_in_checkouts ? item.cart_item.quantity_in_checkouts : 0)}
                      min={1}
                      readOnly
                    />
                    <form onSubmit={(e) => {e.preventDefault(); handleRemoveFromCart(item.cart_item.product_id, item.cart_item.size, parseInt(item.cart_item.quantity) - 1)}}>
                      <button disabled={item.cart_item.quantity <= 1} type='submit' className='bg-gray-700 hover:bg-blue-500 active:bg-gray-900 disabled:bg-gray-400 px-1 py-1 rounded-r-lg'>-</button>
                    </form>
                  </div>
                  <div className="text-right text-gray-100">
                    <div>${item.cart_item.price}</div>
                    <form onSubmit={(e) => {e.preventDefault(); handleRemoveAllFromCart(item.cart_item.product_id, item.cart_item.size, item.cart_item.quantity)}}>
                      <button type='submit' className='text-gray-500 font-medium hover:underline hover:text-blue-700 active:text-gray-500'>Remove</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
            </div>
            <button className = 'text-white text-xl font-bold hover:underline hover:text-blue-700 active:text-gray-500' onClick={handleClearCart}>Clear Cart</button>
            <div className='flex flex-col items-center justify-center text-white'>
              <h1>Total: {totalPrice}</h1>
              <p>Tax: nothing for now</p>
              <p>Shipping: nothing for now</p>
              <button className = 'text-white text-xl font-bold hover:underline hover:text-blue-700 active:text-gray-500' onClick={handleCheckout}>Checkout</button>
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