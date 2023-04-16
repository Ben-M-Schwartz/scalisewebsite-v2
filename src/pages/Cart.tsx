import { type NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect } from 'react';
import Link from "next/link";

import { getCookie, hasCookie } from 'cookies-next';

import { useRouter } from 'next/router';

import { api } from "~/utils/api";

const Cart: NextPage = () => {
  const [emptyCart, setEmptyCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();

  const cart_id = getCookie('cart_id')?.toString();
  const queryResult = api.cart.getCart.useQuery({ cart_id: cart_id });

  useEffect(() => {
    if (!hasCookie('cart_id')) {
      setEmptyCart(true);
      setLoading(false);
    } else {
      if (queryResult.data && queryResult.data.length > 0) {
        setEmptyCart(false);
        const cart_items = queryResult.data;
        setTotalPrice(queryResult.data[0].total_price)
        setCartItems(cart_items);
        setLoading(false);
      }  else {
        setEmptyCart(true);
      }
      if(queryResult.data){
        setLoading(false)
      };
    }
  }, [queryResult]);

  const addToCart = api.cart.updateCart.useMutation()
  const handleAddToCart = (item_name: string, size: string, quantity: number) => {
    addToCart.mutateAsync({ 
      cart_id: cart_id, 
      name: item_name, 
      size: size, 
      quantity: quantity + 1})
      .then(() => {
        router.reload()
      })
  }

  const removeFromCart = api.cart.remove.useMutation()
  const handleRemoveOneFromCart = (product_id: string, item_name: string, size: string, quantity: number) => {
    removeFromCart.mutateAsync({ 
      product_id: product_id.toString(), 
      cart_id: cart_id, 
      item_name: item_name, 
      size: size, 
      quantity: quantity - 1, 
      fullRemove: false})
    .then(() => {
      router.reload()
    })
  }

  const fullRemoveFromCart = api.cart.remove.useMutation()
  const handleRemoveAllFromCart = (product_id: string,item_name: string, size: string, quantity: number) => {
    fullRemoveFromCart.mutateAsync({ 
      product_id: product_id.toString(), 
      cart_id: cart_id, 
      item_name: item_name, 
      size: size, 
      quantity: quantity, 
      fullRemove: true})
    .then(() => {
      router.reload()
    })
  }

  const clearCart = api.cart.clearCart.useMutation()
  const handleClearCart = () => {
    clearCart.mutateAsync({ cart_id: cart_id })
    .then(() => {
      setEmptyCart(true)
      router.reload()
    })
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
          <><h1 className='text-white text-2xl font-bold'>Your cart is empty</h1><Link className='text-white' href='/Store'>Store</Link></>
        )}
        {!loading && !emptyCart && (
          <>
            <h1 className='text-white text-2xl font-bold'>Cart</h1>
            <div className='flex flex-col items-center justify-center'>
              <table className='table-auto w-full text-white'>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item: any) => (
                    <tr key={[item.cart_item.name, item.cart_item.size]}>
                      <td>{item.cart_item.item_name}</td>
                      <td>{item.cart_item.size}</td>
                      <td>
                        <form onSubmit={(e) => {e.preventDefault(); handleAddToCart(item.cart_item.item_name, item.cart_item.size, item.cart_item.quantity)}}>
                          <button type='submit'>+</button>
                        </form>
                        {item.cart_item.quantity}
                        <form onSubmit={(e) => {e.preventDefault(); handleRemoveOneFromCart(item.cart_item.product_id, item.cart_item.item_name, item.cart_item.size, item.cart_item.quantity)}}>
                          <button disabled={item.cart_item.quantity <= 1} type='submit'>-</button>
                        </form>
                      </td>
                      <td>{item.cart_item.price}</td>
                      <td>
                        <form onSubmit={(e) => {e.preventDefault(); handleRemoveAllFromCart(item.cart_item.product_id, item.cart_item.item_name, item.cart_item.size, item.cart_item.quantity)}}>
                          <button type='submit'>Remove</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className = 'text-white text-xl font-bold' onClick={handleClearCart}>Clear Cart</button>
            <div className='flex flex-col items-center justify-center text-white'>
              <h1>Total: {totalPrice}</h1>
              <p>Tax: nothing for now</p>
              <p>Shipping: nothing for now</p>
              <button className = 'text-white text-xl font-bold'>Checkout</button>
            </div>
          </>
        )}
      </main>
    </>
  );  
};

export default Cart;
