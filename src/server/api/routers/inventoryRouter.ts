import { z } from "zod";

import {db} from '~/db/db'

import { product_details, product_quantity, in_checkout_amounts } from '~/db/schema'
import { type InferModel } from 'drizzle-orm';
import { and, eq, or } from 'drizzle-orm/expressions'
import { sql } from 'drizzle-orm/sql'

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const inventoryRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return db.select().from(product_details);
  }),
  get: publicProcedure
  .input(z.object({id: z.string()}))
  .query(async ({ input }) => {
    /* db.select().from(product_details).where(eq(product_details.id, parseInt(input.id))) */
    const result = await db.select({
      id: product_details.id,
      price: product_details.price,
      weight: product_details.weight,
      name: product_details.name,
      image_path: product_details.image_path,
      product_quantity: {
        size: product_quantity.size,
        quantity_in_stock: product_quantity.quantity,
        quantity_in_checkouts: in_checkout_amounts.quantity
      }
    }).from(product_details)
    .leftJoin(product_quantity, eq(product_details.id, product_quantity.product_id))
    .leftJoin(in_checkout_amounts, and(
      eq(in_checkout_amounts.product_id, product_quantity.product_id),
      or(eq(in_checkout_amounts.size, product_quantity.size), 
      and(
        eq(in_checkout_amounts.size, ''),
        eq(product_quantity.size, 'NO SIZES')
      )
    )))
    .where(eq(product_details.id, parseInt(input.id)))
    return result
  }),
  create: publicProcedure
    .input(
      z.object({ name: z.string(), price: z.string(), weight: z.string(), sizes: z.string(), quantities: z.string()})
    )
    .mutation(async ({ input }) => {
      type NewProduct = InferModel<typeof product_details, 'insert'>;
      type NewProdcutQuantity = InferModel<typeof product_quantity, 'insert'>;

      const newProduct: NewProduct = {
        name: input.name,
        price: input.price,
        weight: input.weight,
        image_path: 'temp',
        sizes: input.sizes,
      }
      const result = await db.insert(product_details).values(newProduct)
      const productId = result.insertId
      const sizesArray = input.sizes.split(',')
      const quantityArray: Array<number> = JSON.parse("[" + input.quantities + "]") as Array<number>
      const newProductQuantities = []
      for(let i = 0; i<sizesArray.length; i++){
        const newProductQuantity: NewProdcutQuantity = {
          product_id: parseInt(productId),
          size: sizesArray[i],
          quantity: quantityArray[i]
        }
        newProductQuantities.push(newProductQuantity)
      }
      await db.insert(product_quantity).values(newProductQuantities)
    }),
    update: publicProcedure
    .input( z.object({product_id: z.string(), size: z.string(), quantity: z.string(), operation: z.string()}))
    .mutation(async ({ input }) => {
      await db.update(product_quantity)
      .set({quantity: sql`\${product_quantity.quantity} \${input.operation} \${input.quantity}`})
      .where(and(eq(product_quantity.product_id, parseInt(input.product_id)), eq(product_quantity.size, input.size)))
    })
});