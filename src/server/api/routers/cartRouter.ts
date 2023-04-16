import { z } from "zod";

import { carts, cart_items } from '~/db/schema'
import { db } from '~/db/db'

import { eq, and } from 'drizzle-orm/expressions';


import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  createCart: publicProcedure
  .input(z.object({cart_id: z.string(), product_id: z.string(), price: z.number(),  quantity: z.string(), weight: z.number(), size:  z.string(), name: z.string() }))
  .mutation(async ({ input }) => {
      await db.insert(carts).values({ cart_id: input.cart_id, total_price: (input.price * input.quantity), total_weight: (input.weight * input.quantity) })
      await db.insert(cart_items).values({ cart_id: input.cart_id, product_id: input.product_id, price: (input.price * input.quantity).toString(), quantity: input.quantity, weight: input.weight, size: input.size, item_name: input.name })
    }),

  addToCart:  publicProcedure
  .input(z.object({ cart_id: z.string(), product_id: z.string(), price:  z.number(),  quantity: z.number(), weight: z.number(), size:  z.string(), name: z.string() }))
  .mutation(async ({ input }) => {
      const cartQuery = await db.select().from(carts).where(eq(carts.cart_id, input.cart_id))
      const cart = cartQuery[0]
      if(cart){
        const itemQuery = await db.select().from(cart_items).where(and(eq(cart_items.cart_id, input.cart_id), eq(cart_items.product_id, input.product_id), eq(cart_items.size, input.size)))
        const cart_item = itemQuery[0]
        if(cart_item){
          const newQuantity = Number(cart_item.quantity) + input.quantity
          await db.update(cart_items).set({ quantity: newQuantity}).where(and(eq(cart_items.cart_id, input.cart_id), eq(cart_items.product_id, input.product_id), eq(cart_items.size, input.size)))
          await db.update(cart_items).set({ price: (input.price * newQuantity).toString() }).where(and(eq(cart_items.cart_id, input.cart_id), eq(cart_items.product_id, input.product_id), eq(cart_items.size, input.size)))
        } else {
          await db.insert(cart_items).values({ cart_id: input.cart_id, product_id: input.product_id, price: (input.price * input.quantity).toString(), quantity: input.quantity, weight: input.weight, size: input.size, item_name: input.name })
        }
        const newTotalPrice = Number(cart.total_price) + (input.price * input.quantity)
        const newTotalWeight = Number(cart.total_weight) + (input.weight * input.quantity)
        await db.update(carts).set({ total_price: newTotalPrice, total_weight: newTotalWeight}).where(eq(carts.cart_id, input.cart_id))
      } else {
        await db.insert(carts).values({ cart_id: input.cart_id, total_price: (input.price * input.quantity), total_weight: (input.weight * input.quantity) })
        await db.insert(cart_items).values({ cart_id: input.cart_id, product_id: input.product_id, price: (input.price * input.quantity).toString(), quantity: input.quantity, weight: input.weight, size: input.size, item_name: input.name })
      }
    }),

  remove: publicProcedure
    .input(z.object({ cart_id: z.string(), product_id: z.string(), size: z.string(), quantity: z.number(), fullRemove: z.boolean() }))
    .mutation(async ({ input }) => {
      const cart = await db.select().from(carts).where(eq(carts.cart_id, input.cart_id))
      if(cart){
        if(input.fullRemove){
          await db.delete(cart_items).where(and(eq(cart_items.cart_id, cart_id), eq(cart_items.product_id, input.product_id), eq(cart_items.size, input.size)))
          await db.delete(carts).where(eq(carts.cart_id, input.cart_id))
        } else {
          const cart_item = await db.select().from(cart_items).where(and(eq(cart_items.cart_id, input.cart_id), eq(cart_items.product_id, input.product_id), eq(cart_items.size, input.size)))
          if(cart_item){
            await db.update(cart_items).set({ quantity: cart_item.quantity - input.quantity }).where(and(eq(cart_items.cart_id, input.cart_id), eq(cart_items.product_id, input.product_id), eq(cart_items.size, input.size)))
            await db.update(carts).set({ total_price: cart.total_price - (input.price * input.quantity), total_weight: cart.total_weight - input.weight }).where(eq(carts.cart_id, input.cart_id))
          } else {
            throw new Error('Item not found')
          }
        }
      } else {
        throw new Error('Cart not found')
      }
    }),

    getCart: publicProcedure
    .input(z.object({ cart_id: z.string() }))
    .query(async ({ input }) => {
      return await db.select().from(carts).leftjoin('cart_items', eq(carts.cart_id, cart_items.cart_id)).where(eq(carts.cart_id, input.cart_id))
    })
})
