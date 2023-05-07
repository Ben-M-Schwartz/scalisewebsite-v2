import { z } from "zod";

import { db } from "~/db/db";

import {
  product_details,
  product_quantity,
  in_checkout_amounts,
} from "~/db/schema";
import { type InferModel } from "drizzle-orm";
import { and, eq, or, gte } from "drizzle-orm/expressions";
import { sql } from "drizzle-orm/sql";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const config = {
  runtime: "edge",
  regions: ["cle1"],
};

export const getProductPage = async (name: string) => {
  const result = await db
    .select({
      id: product_details.id,
      price: product_details.price,
      sale_price: product_details.sale_price,
      weight: product_details.weight,
      name: product_details.name,
      image: product_details.image,
      product_quantity: {
        size: product_quantity.size,
        quantity_in_stock: product_quantity.quantity,
        quantity_in_checkouts: in_checkout_amounts.quantity,
      },
    })
    .from(product_details)
    .leftJoin(
      product_quantity,
      eq(product_details.id, product_quantity.product_id)
    )
    .leftJoin(
      in_checkout_amounts,
      and(
        eq(in_checkout_amounts.product_id, product_quantity.product_id),
        or(
          eq(in_checkout_amounts.size, product_quantity.size),
          and(eq(in_checkout_amounts.size, ""), eq(product_quantity.size, ""))
        )
      )
    )
    .where(eq(product_details.name, name));
  return result;
};

export const getProductRoutes = async () => {
  const queryResult = await db
    .select({ name: product_details.name })
    .from(product_details);
  const productRoutes = queryResult.map((p) => {
    return {
      params: {
        name: (p.name as string).replace(/\s+/g, "-"),
      },
    };
  });
  return productRoutes;
};

export const inventoryRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    return await db
      .select()
      .from(product_details)
      .orderBy(product_details.store_order);
  }),

  listInventory: publicProcedure.query(() => {
    return db
      .select({
        product_id: product_details.id,
        size: product_quantity.size,
        quantity: product_quantity.quantity,
      })
      .from(product_details)
      .leftJoin(
        product_quantity,
        eq(product_details.id, product_quantity.product_id)
      );
  }),

  get: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      /* db.select().from(product_details).where(eq(product_details.id, parseInt(input.id))) */
      return await getProductPage(input.name);
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        weight: z.number(),
        sizes: z.string(),
        quantities: z.string(),
        imageName: z.string(),
        is_taxed: z.number(),
        store_order: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      type NewProduct = InferModel<typeof product_details, "insert">;
      type NewProdcutQuantity = InferModel<typeof product_quantity, "insert">;

      await db
        .update(product_details)
        .set({ store_order: sql`${product_details.store_order} + 1` })
        .where(gte(product_details.store_order, input.store_order));

      const newProduct: NewProduct = {
        name: input.name,
        price: input.price,
        weight: input.weight,
        image: input.imageName,
        is_taxed: input.is_taxed,
        store_order: input.store_order,
      };
      const result = await db.insert(product_details).values(newProduct);
      const productId = result.insertId;
      const sizesArray = input.sizes.split(",");
      const quantityArray: Array<number> = JSON.parse(
        "[" + input.quantities + "]"
      ) as Array<number>;
      const newProductQuantities = [];
      for (let i = 0; i < sizesArray.length; i++) {
        const newProductQuantity: NewProdcutQuantity = {
          product_id: parseInt(productId),
          size: sizesArray[i],
          quantity: quantityArray[i],
        };
        newProductQuantities.push(newProductQuantity);
      }
      await db.insert(product_quantity).values(newProductQuantities);
    }),

  update: publicProcedure
    .input(
      z.object({
        product_id: z.number(),
        size: z.string(),
        quantity: z.number(),
        operation: z.enum(["+", "-", "set"]),
      })
    )
    .mutation(async ({ input }) => {
      await db
        .update(product_quantity)
        .set({
          quantity:
            input.operation === "+"
              ? sql`${product_quantity.quantity} + ${input.quantity}`
              : input.operation === "-"
              ? sql`${product_quantity.quantity} - ${input.quantity}`
              : input.quantity,
        })
        .where(
          and(
            eq(product_quantity.product_id, input.product_id),
            eq(product_quantity.size, input.size)
          )
        );
    }),

  remove: publicProcedure
    .input(z.object({ product_id: z.number() }))
    .mutation(async ({ input }) => {
      const result = await db
        .select({ store_order: product_details.store_order })
        .from(product_details)
        .where(eq(product_details.id, input.product_id));

      const order = result[0]?.store_order as number;

      await db.transaction(async (tx) => {
        await tx
          .delete(product_details)
          .where(eq(product_details.id, input.product_id));
        await tx
          .delete(product_quantity)
          .where(eq(product_quantity.product_id, input.product_id));
        await tx
          .update(product_details)
          .set({ store_order: sql`${product_details.store_order} - 1` })
          .where(gte(product_details.store_order, order));
      });
    }),

  addSale: publicProcedure
    .input(z.object({ product_id: z.number(), sale_price: z.number() }))
    .mutation(async ({ input }) => {
      await db
        .update(product_details)
        .set({ sale_price: input.sale_price })
        .where(eq(product_details.id, input.product_id));
    }),

  removeSale: publicProcedure
    .input(z.object({ product_id: z.number() }))
    .mutation(async ({ input }) => {
      await db
        .update(product_details)
        .set({ sale_price: null })
        .where(eq(product_details.id, input.product_id));
    }),
});
