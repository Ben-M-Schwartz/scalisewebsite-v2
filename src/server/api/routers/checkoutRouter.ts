import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { stripe } from "~/utils/stripe";

import { db } from "~/db/db";
import { in_checkout_amounts, product_quantity } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
import { eq, and } from "drizzle-orm/expressions";

export const config = {
  runtime: "edge",
  regions: ["cle1"],
};

export const checkoutRouter = createTRPCRouter({
  checkOut: publicProcedure
    .input(
      z.object({
        cartItems: z.array(
          z.object({
            product_id: z.number(),
            price: z.number(),
            quantity: z.number(),
            is_taxed: z.number(),
            size: z.string(),
            weight: z.number(),
            item_name: z.string(),
            image: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      //const cart = db.select().from(carts).where({id: input.cart_id})
      const items = input.cartItems;
      const domainURL = process.env.DOMAIN;
      const comparisons = await Promise.all(
        items.map(async (item) => {
          const stock = await db
            .select()
            .from(product_quantity)
            .where(
              and(
                eq(product_quantity.product_id, item.product_id),
                eq(product_quantity.size, item.size)
              )
            );

          const inCheckouts = await db
            .select()
            .from(in_checkout_amounts)
            .where(
              and(
                eq(in_checkout_amounts.product_id, item.product_id),
                eq(in_checkout_amounts.size, item.size)
              )
            );

          const max =
            (stock[0]?.quantity as number) - (inCheckouts[0]?.quantity || 0);
          return {
            item_name: item.item_name,
            product_id: item.product_id,
            quantity: item.quantity,
            size: item.size,
            price: item.price,
            weight: item.weight,
            max: max,
          };
        })
      );
      const cartOverflows = comparisons.filter(
        (item) => item.quantity > item.max
      );
      if (cartOverflows.length > 0) {
        return ["Not Enough Inventory", cartOverflows];
      }

      //convert cart_items to stripe line items
      const lineItems = items.map((item) => {
        const images = item.image.split(",");
        return {
          price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
              name: item.item_name,
              images: [`${domainURL as string}/${images[0] as string}`],
              description: item.size === "" ? "CD" : `Size: ${item.size}`,
              metadata: {
                size: item.size,
                product_id: item.product_id,
              },
            },
          },
          quantity: item.quantity,
          tax_rates:
            item.is_taxed === 1 ? ["txr_1N10EAHmtb6xoR6RcIowDGt8"] : undefined,
        };
      });
      //TODO: calculate shipping based on weight
      const session = await stripe.checkout.sessions.create({
        //payment_method_types: ['card'],
        line_items: lineItems,
        mode: "payment",
        success_url: `${domainURL as string}/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL as string}/canceled/{CHECKOUT_SESSION_ID}`,
        billing_address_collection: "required",
        allow_promotion_codes: true,
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 581, currency: "usd" },
              display_name: "USPS First",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 5 },
                maximum: { unit: "business_day", value: 7 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 1018, currency: "usd" },
              display_name: "USPS Priority",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 1 },
                maximum: { unit: "business_day", value: 1 },
              },
            },
          },
        ],
        phone_number_collection: {
          enabled: true,
        },
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        expires_at: Math.floor((new Date().getTime() + 1800000) / 1000),
      });
      return [session.url, session.id];
    }),

  createOrder: publicProcedure
    .input(
      z.object({
        cartItems: z.array(
          z.object({
            product_id: z.number(),
            price: z.number(),
            quantity: z.number(),
            size: z.string(),
            item_name: z.string(),
          })
        ),
        checkoutId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const dbInsertValues: InferModel<typeof in_checkout_amounts, "insert">[] =
        [];
      input.cartItems.map((item) => {
        dbInsertValues.push({
          product_id: item.product_id,
          stripe_checkout_id: input.checkoutId,
          size: item.size,
          quantity: item.quantity,
        });
      });
      await db.insert(in_checkout_amounts).values(dbInsertValues);
    }),

  cancelOrder: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db
        .delete(in_checkout_amounts)
        .where(eq(in_checkout_amounts.stripe_checkout_id, input.id));
    }),

  getCheckoutSession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      return await stripe.checkout.sessions.retrieve(input.sessionId);
    }),
});
