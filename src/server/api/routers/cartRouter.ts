import { z } from "zod";

import { carts, cart_items, product_details } from '~/db/schema'
import { db } from '~/db/db'

import { eq, and } from 'drizzle-orm/expressions';


import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  createCart: publicProcedure
  .input(z.object({
    cart_id: z.string(), 
    product_id: z.string(), 
    price: z.number(),  
    quantity: z.string(), 
    weight: z.number(), 
    size:  z.string(), 
    name: z.string() }))
  .mutation(async ({ input }) => {
      await db.insert(carts)
      .values({ 
        cart_id: input.cart_id, 
        total_price: (input.price * input.quantity), 
        total_weight: (input.weight * input.quantity)
      })
      await db.insert(cart_items)
      .values({ 
        cart_id: input.cart_id, 
        product_id: input.product_id, 
        price: input.price * input.quantity, 
        quantity: input.quantity, 
        weight: input.weight, 
        size: input.size, 
        item_name: input.name 
      })
    }),

  addToCart:  publicProcedure
  .input(z.object({ 
    cart_id: z.string(), 
    product_id: z.string(), 
    price:  z.number(),  
    quantity: z.number(), 
    weight: z.number(), 
    size:  z.string(), 
    name: z.string() }))
  .mutation(async ({ input }) => {
      const cartQuery = await db.select().from(carts).where(eq(carts.cart_id, input.cart_id))
      const cart = cartQuery[0]
      if(cart){
        const itemQuery = await db.select().from(cart_items)
        .where(and(
          eq(cart_items.cart_id, input.cart_id), 
          eq(cart_items.product_id, input.product_id), 
          eq(cart_items.size, input.size)
          ))
        const cart_item = itemQuery[0]
        if(cart_item){
          const newQuantity = Number(cart_item.quantity) + input.quantity
          await db.update(cart_items)
          .set({ quantity: newQuantity})
          .where(and(
            eq(cart_items.cart_id, input.cart_id), 
            eq(cart_items.product_id, input.product_id), 
            eq(cart_items.size, input.size)
            ))
          await db.update(cart_items)
          .set({ price: (input.price * newQuantity).toString() })
          .where(and(
            eq(cart_items.cart_id, input.cart_id), 
            eq(cart_items.product_id, input.product_id), 
            eq(cart_items.size, input.size)
            ))
        } else {
          await db.insert(cart_items)
          .values({ 
            cart_id: input.cart_id, 
            product_id: input.product_id, 
            price: (input.price * input.quantity).toString(), 
            quantity: input.quantity, 
            weight: input.weight, 
            size: input.size, 
            item_name: input.name 
          })
        }
        const newTotalPrice = Number(cart.total_price) + (input.price * input.quantity)
        const newTotalWeight = Number(cart.total_weight) + (input.weight * input.quantity)
        await db.update(carts)
        .set({ 
          total_price: newTotalPrice, 
          total_weight: newTotalWeight})
          .where(eq(carts.cart_id, input.cart_id))
      } else {
        await db.insert(carts)
        .values({ 
          cart_id: input.cart_id, 
          total_price: (input.price * input.quantity), 
          total_weight: (input.weight * input.quantity) 
        })
        await db.insert(cart_items)
        .values({ 
          cart_id: input.cart_id, 
          product_id: input.product_id, 
          price: (input.price * input.quantity).toString(), 
          quantity: input.quantity, 
          weight: input.weight, 
          size: input.size, 
          item_name: input.name })
      }
    }),

  updateCart: publicProcedure
  .input(z.object({
    cart_id: z.string(),
    name: z.string(),
    size: z.string(),
    quantity: z.number()
  }))
  .mutation(async ({ input }) => {
    const cart = await db.select().from(carts).where(eq(carts.cart_id, input.cart_id))
    const item_details = await db.select().from(product_details)
    .where(and(
      eq(product_details.name, input.name)
    ))
    if(cart){
      const currentPrice = parseFloat(cart[0].total_price)
      const currentWeight = parseFloat(cart[0].total_weight)
      await db.update(cart_items)
      .set({ quantity: input.quantity })
      .where(and(
        eq(cart_items.cart_id, input.cart_id), 
        eq(cart_items.size, input.size), 
        eq(cart_items.item_name, input.name)
        ))
      await db.update(cart_items)
      .set({ price: item_details[0].price * input.quantity })
      .where(and(
        eq(cart_items.cart_id, input.cart_id),
        eq(cart_items.size, input.size),
        eq(cart_items.item_name, input.name)
        ))
      await db.update(carts)
      .set({ 
        total_price: currentPrice + parseFloat(item_details[0].price), 
        total_weight: currentWeight + parseFloat(item_details[0].weight)
      }).where(eq(carts.cart_id, input.cart_id))
    } else {
      throw new Error('Cart not found')
    }
  }),

  remove: publicProcedure
    .input(z.object({ 
      cart_id: z.string(), 
      product_id: z.string(), 
      size: z.string(), 
      quantity: z.number(), 
      fullRemove: z.boolean() }))
    .mutation(async ({ input }) => {
      const cart = await db.select().from(carts).where(eq(carts.cart_id, input.cart_id))
      const item_details = await db.select().from(product_details)
      .where(and(
        eq(product_details.id, input.product_id)
      ))
      if(cart){
        const currentPrice = parseFloat(cart[0].total_price)
        const currentWeight = parseFloat(cart[0].total_weight)
        if(input.fullRemove){
          await db.delete(cart_items)
          .where(and(
            eq(cart_items.cart_id, input.cart_id), 
            eq(cart_items.product_id, input.product_id), 
            eq(cart_items.size, input.size)
            ))
          await db.update(carts)
          .set({
            total_price: currentPrice - (parseFloat(item_details[0].price) * input.quantity),
            total_weight: currentWeight - (parseFloat(item_details[0].weight) * input.quantity)
          })
        } else {
          await db.update(cart_items)
          .set({ quantity: input.quantity })
          .where(and(
            eq(cart_items.cart_id, input.cart_id), 
            eq(cart_items.size, input.size), 
            eq(cart_items.product_id, input.product_id)
            ))
          await db.update(cart_items)
          .set({ price: item_details[0].price * input.quantity })
          .where(and(
            eq(cart_items.cart_id, input.cart_id),
            eq(cart_items.size, input.size),
            eq(cart_items.product_id, input.product_id)
            ))
          await db.update(carts)
          .set({ 
            total_price: currentPrice - parseFloat(item_details[0].price), 
            total_weight: currentWeight - parseFloat(item_details[0].weight)
          }).where(eq(carts.cart_id, input.cart_id))
      }
      } else {
        throw new Error('Cart not found')
      }
    }),

    clearCart: publicProcedure
    .input(z.object({ cart_id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(carts)
      .where(eq(carts.cart_id, input.cart_id))
      await db.delete(cart_items)
      .where(eq(cart_items.cart_id, input.cart_id))
    }),
    
    getCart: publicProcedure
    .input(z.object({ cart_id: z.string() }))
    .query(async ({ input }) => {
      const result = await db.select({ 
        cart_id: cart_items.cart_id, 
        total_price: carts.total_price, 
        total_weight: carts.total_weight, 
        cart_item: { 
          product_id: cart_items.product_id, 
          price: cart_items.price, 
          quantity: cart_items.quantity, 
          size: cart_items.size, 
          item_name: cart_items.item_name}
        })
        .from(carts)
        .leftJoin(cart_items, eq(carts.cart_id, cart_items.cart_id))
        .where(eq(carts.cart_id, input.cart_id))
        return result
    })
})
