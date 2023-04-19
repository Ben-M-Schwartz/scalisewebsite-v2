/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";
import { carts, cart_items, product_details, product_quantity, in_checkout_amounts } from '~/db/schema'
import { db } from '~/db/db'
import { eq, and, or } from 'drizzle-orm/expressions';
import { type InferModel } from 'drizzle-orm';


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
    quantity: z.number(), 
    weight: z.number(), 
    size:  z.string(), 
    name: z.string() }))
  .mutation(async ({ input }) => {
      type NewCart = InferModel<typeof carts, 'insert'>;
      const newCart: NewCart = {
        cart_id: input.cart_id, 
        total_price: (input.price * input.quantity).toString(), 
        total_weight: (input.weight * input.quantity).toString()
      }
      await db.insert(carts)
      .values(newCart)
      type NewCartItem = InferModel<typeof cart_items, 'insert'>
      const newCartItem: NewCartItem = {
        cart_id: input.cart_id, 
        product_id: parseInt(input.product_id), 
        price: (input.price * input.quantity).toString(), 
        quantity: input.quantity, 
        weight: (input.weight).toString(), 
        size: input.size, 
        item_name: input.name 
      }
      await db.insert(cart_items)
      .values(newCartItem)
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
          eq(cart_items.product_id, parseInt(input.product_id)), 
          eq(cart_items.size, input.size)
          ))
        const cart_item = itemQuery[0]
        if(cart_item){
          const newQuantity = Number(cart_item.quantity) + input.quantity
          await db.update(cart_items)
          .set({ quantity: newQuantity})
          .where(and(
            eq(cart_items.cart_id, input.cart_id), 
            eq(cart_items.product_id, parseInt(input.product_id)), 
            eq(cart_items.size, input.size)
            ))
          await db.update(cart_items)
          .set({ price: (input.price * newQuantity).toString() })
          .where(and(
            eq(cart_items.cart_id, input.cart_id), 
            eq(cart_items.product_id, parseInt(input.product_id)), 
            eq(cart_items.size, input.size)
            ))
        } else {
          type NewCartItem = InferModel<typeof cart_items, 'insert'>
          const newCartItem: NewCartItem = {
            cart_id: input.cart_id, 
            product_id: parseInt(input.product_id), 
            price: (input.price * input.quantity).toString(), 
            quantity: input.quantity, 
            weight: input.weight.toString(), 
            size: input.size, 
            item_name: input.name 
          }
          await db.insert(cart_items)
          .values(newCartItem)
        }
        const newTotalPrice = Number(cart.total_price) + (input.price * input.quantity)
        const newTotalWeight = Number(cart.total_weight) + (input.weight * input.quantity)
        await db.update(carts)
        .set({ 
          total_price: newTotalPrice.toString(), 
          total_weight: newTotalWeight.toString()})
          .where(eq(carts.cart_id, input.cart_id))
      } else {
        type NewCart = InferModel<typeof carts, 'insert'>;
        const newCart: NewCart = {
          cart_id: input.cart_id, 
          total_price: (input.price * input.quantity).toString(), 
          total_weight: (input.weight * input.quantity).toString()
        }
        await db.insert(carts)
        .values(newCart)

        type NewCartItem = InferModel<typeof cart_items, 'insert'>
        const newCartItem: NewCartItem = {
          cart_id: input.cart_id, 
          product_id: parseInt(input.product_id), 
          price: (input.price * input.quantity).toString(), 
          quantity: input.quantity, 
          weight: (input.weight).toString(), 
          size: input.size, 
          item_name: input.name 
        }
        await db.insert(cart_items)
        .values(newCartItem)
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
    const cart_item = await db.select().from(cart_items)
    .where(and(
      eq(cart_items.cart_id, input.cart_id), 
      eq(cart_items.item_name, input.name), 
      eq(cart_items.size, input.size)
    ))
    const quantityDiff = input.quantity - (cart_item[0]!.quantity as number)
    const item_details = await db.select().from(product_details)
    .where(and(
      eq(product_details.name, input.name)
    ))
    if(cart){
      const currentPrice = parseFloat(cart[0]!.total_price as string)
      const currentWeight = parseFloat(cart[0]!.total_weight as string)
      await db.update(cart_items)
      .set({ quantity: input.quantity })
      .where(and(
        eq(cart_items.cart_id, input.cart_id), 
        eq(cart_items.size, input.size), 
        eq(cart_items.item_name, input.name)
        ))
      await db.update(cart_items)
      .set({ price: (parseInt(item_details[0]!.price as string) * input.quantity).toString() })
      .where(and(
        eq(cart_items.cart_id, input.cart_id),
        eq(cart_items.size, input.size),
        eq(cart_items.item_name, input.name)
        ))
      await db.update(carts)
      .set({ 
        total_price: (currentPrice + (parseFloat(item_details[0]!.price as string) * quantityDiff)).toString(), 
        total_weight: (currentWeight + (parseFloat(item_details[0]!.weight as string)* quantityDiff)).toString()
      }).where(eq(carts.cart_id, input.cart_id))
    } else {
      throw new Error('Cart not found')
    }
  }),


  //if doing a full remove set the quantity param to the full quantity of the item being removed
  //otherwise set the quantity param to the new quantity
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
        eq(product_details.id, parseInt(input.product_id))
      ))
      if(cart){
        const currentPrice = parseFloat(cart[0]!.total_price as string)
        const currentWeight = parseFloat(cart[0]!.total_weight as string)
        if(input.fullRemove){
          await db.delete(cart_items)
          .where(and(
            eq(cart_items.cart_id, input.cart_id), 
            eq(cart_items.product_id, parseInt(input.product_id)), 
            eq(cart_items.size, input.size)
            ))
          await db.update(carts)
          .set({
            total_price: (currentPrice - (parseFloat(item_details[0]!.price as string) * input.quantity)).toString(),
            total_weight: (currentWeight - (parseFloat(item_details[0]!.weight as string) * input.quantity)).toString()
          })
        } else {
          const cart_item = await db.select().from(cart_items)
          .where(and(
            eq(cart_items.cart_id, input.cart_id), 
            eq(cart_items.product_id, parseInt(input.product_id)), 
            eq(cart_items.size, input.size)
          ))
          const quantityDiff = cart_item[0]!.quantity as number - input.quantity
          await db.update(cart_items)
          .set({ quantity: input.quantity, price: (parseFloat(item_details[0]!.price as string) * input.quantity).toString() })
          .where(and(
            eq(cart_items.cart_id, input.cart_id), 
            eq(cart_items.size, input.size), 
            eq(cart_items.product_id, parseInt(input.product_id))
            ))
          await db.update(carts)
          .set({ 
            total_price: (currentPrice - (parseFloat(item_details[0]!.price as string) * quantityDiff)).toString(), 
            total_weight: (currentWeight - (parseFloat(item_details[0]!.weight as string) * quantityDiff)).toString()
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
          item_name: cart_items.item_name,
          quantity_in_stock:  product_quantity.quantity,
          quantity_in_checkouts: in_checkout_amounts.quantity,
        }
        })
        .from(carts)
        .leftJoin(cart_items, eq(carts.cart_id, cart_items.cart_id))
        .leftJoin(product_quantity, and(
          eq(cart_items.product_id, product_quantity.product_id),
          or(eq(cart_items.size, product_quantity.size), 
          and(
            eq(cart_items.size, ''),
            eq(product_quantity.size, 'NO SIZES')
          )
        )))
        .leftJoin(in_checkout_amounts, and(
          eq(in_checkout_amounts.product_id, product_quantity.product_id),
          or(eq(in_checkout_amounts.size, product_quantity.size), 
          and(
            eq(in_checkout_amounts.size, ''),
            eq(product_quantity.size, 'NO SIZES')
          )
        )))
        .where(eq(carts.cart_id, input.cart_id))
        return result
    })
})
