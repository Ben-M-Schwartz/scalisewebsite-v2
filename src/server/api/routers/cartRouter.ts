import { z } from "zod";
import {
  carts,
  cart_items,
  product_quantity,
  in_checkout_amounts,
  product_details,
} from "~/db/schema";
import { db } from "~/db/db";
import { eq, and } from "drizzle-orm/expressions";
import { type InferModel } from "drizzle-orm";
import { sql } from "drizzle-orm/sql";

export const config = {
  runtime: "edge",
  regions: ["cle1"],
};

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  addToCart: publicProcedure
    .input(
      z.object({
        cart_id: z.string(),
        product_id: z.number(),
        price: z.number(),
        quantity: z.number(),
        weight: z.number(),
        size: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const cartQuery = await db
        .select()
        .from(carts)
        .where(eq(carts.cart_id, input.cart_id));
      const cart = cartQuery[0];
      if (cart) {
        const itemQuery = await db
          .select()
          .from(cart_items)
          .where(
            and(
              eq(cart_items.cart_id, input.cart_id),
              eq(cart_items.product_id, input.product_id),
              eq(cart_items.size, input.size)
            )
          );
        const cart_item = itemQuery[0];
        if (cart_item) {
          await db
            .update(cart_items)
            .set({ quantity: sql`${cart_items.quantity} + ${input.quantity}` })
            .where(
              and(
                eq(cart_items.cart_id, input.cart_id),
                eq(cart_items.product_id, input.product_id),
                eq(cart_items.size, input.size)
              )
            );
        } else {
          type NewCartItem = InferModel<typeof cart_items, "insert">;
          const newCartItem: NewCartItem = {
            cart_id: input.cart_id,
            product_id: input.product_id,
            price: input.price,
            quantity: input.quantity,
            weight: input.weight,
            size: input.size,
            item_name: input.name,
          };
          await db.insert(cart_items).values(newCartItem);
        }
        await db
          .update(carts)
          .set({
            total_price: sql`${carts.total_price} + ${
              input.price * input.quantity
            }`,
            total_weight: sql`${carts.total_weight} + ${
              input.weight * input.quantity
            }`,
          })
          .where(eq(carts.cart_id, input.cart_id));
      } else {
        type NewCart = InferModel<typeof carts, "insert">;
        const newCart: NewCart = {
          cart_id: input.cart_id,
          total_price: input.price * input.quantity,
          total_weight: input.weight * input.quantity,
        };
        await db.insert(carts).values(newCart);

        type NewCartItem = InferModel<typeof cart_items, "insert">;
        const newCartItem: NewCartItem = {
          cart_id: input.cart_id,
          product_id: input.product_id,
          price: input.price,
          quantity: input.quantity,
          weight: input.weight,
          size: input.size,
          item_name: input.name,
        };
        await db.insert(cart_items).values(newCartItem);
      }
    }),

  remove: publicProcedure
    .input(
      z.object({
        cart_id: z.string(),
        product_id: z.number(),
        size: z.string(),
        quantity: z.number(),
        price: z.number(),
        weight: z.number(),
        fullRemove: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const cart = await db
        .select()
        .from(carts)
        .where(eq(carts.cart_id, input.cart_id));
      if (cart) {
        if (input.fullRemove) {
          await db
            .delete(cart_items)
            .where(
              and(
                eq(cart_items.cart_id, input.cart_id),
                eq(cart_items.product_id, input.product_id),
                eq(cart_items.size, input.size)
              )
            );
        } else {
          await db
            .update(cart_items)
            .set({ quantity: sql`${cart_items.quantity} - ${input.quantity}` })
            .where(
              and(
                eq(cart_items.cart_id, input.cart_id),
                eq(cart_items.size, input.size),
                eq(cart_items.product_id, input.product_id)
              )
            );
        }
        await db
          .update(carts)
          .set({
            total_price: sql`${carts.total_price} - ${
              input.price * input.quantity
            }`,
            total_weight: sql`${carts.total_weight} - ${
              input.weight * input.quantity
            }`,
          })
          .where(eq(carts.cart_id, input.cart_id));
      } else {
        throw new Error("Cart not found");
      }
    }),

  clearCart: publicProcedure
    .input(z.object({ cart_id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(carts).where(eq(carts.cart_id, input.cart_id));
      await db.delete(cart_items).where(eq(cart_items.cart_id, input.cart_id));
    }),

  getCartAmount: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const items = await db
        .select()
        .from(cart_items)
        .where(eq(cart_items.cart_id, input.id));
      return (
        items.reduce((sum, current) => sum + (current.quantity as number), 0) ||
        0
      );
    }),

  getCart: publicProcedure
    .input(z.object({ cart_id: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select({
          cart_id: cart_items.cart_id,
          total_price: carts.total_price,
          total_weight: carts.total_weight,
          cart_item: {
            product_id: cart_items.product_id,
            price: cart_items.price,
            quantity: cart_items.quantity,
            size: cart_items.size,
            weight: cart_items.weight,
            item_name: cart_items.item_name,
            quantity_in_stock: product_quantity.quantity,
            quantity_in_checkouts: in_checkout_amounts.quantity,
            image: product_details.image,
            is_taxed: product_details.is_taxed,
          },
        })
        .from(carts)
        .leftJoin(cart_items, eq(carts.cart_id, cart_items.cart_id))
        .leftJoin(
          product_quantity,
          and(
            eq(cart_items.product_id, product_quantity.product_id),
            eq(cart_items.size, product_quantity.size)
          )
        )
        .leftJoin(
          in_checkout_amounts,
          and(
            eq(in_checkout_amounts.product_id, product_quantity.product_id),
            eq(in_checkout_amounts.size, product_quantity.size)
          )
        )
        .leftJoin(
          product_details,
          eq(cart_items.product_id, product_details.id)
        )
        .where(eq(carts.cart_id, input.cart_id));
    }),
});
