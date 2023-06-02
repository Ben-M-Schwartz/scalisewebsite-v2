/*eslint-disable @typescript-eslint/no-unsafe-member-access */
/*eslint-disable @typescript-eslint/no-explicit-any */

import type { NextApiRequest, NextApiResponse } from "next";
import rawBody from "raw-body";
import type Stripe from "stripe";

import { db } from "~/db/db";
import { orders, product_quantity, in_checkout_amounts } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
import { and, eq } from "drizzle-orm/expressions";
import { stripe } from "~/utils/stripe";
import { sql } from "drizzle-orm/sql";

export const config = {
  /* runtime: "edge", */
  api: {
    // Turn off the body parser so we can access raw body for verification.
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await rawBody(req);
  const signature = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    return res.status(400).send(`Webhook Error: ${error.message as string}`);
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });
    const dbInsertValues: InferModel<typeof orders, "insert">[] = [];
    lineItems.data.map(async (item) => {
      const product = item.price?.product as Stripe.Product;
      const metadata = product?.metadata;
      const size = metadata.size || "";
      const quantity = item.quantity;
      const product_id = metadata.product_id || "";
      dbInsertValues.push({
        item: item.description,
        size: size,
        quantity: quantity,
        customer_name: session.customer_details?.name,
        customer_email: session.customer_details?.email,
        customer_phone: session.customer_details?.phone,
        customer_city: session.customer_details?.address?.city,
        customer_state: session.customer_details?.address?.state,
        customer_zip: session.customer_details?.address?.postal_code,
        customer_country: session.customer_details?.address?.country,
        customer_addressLine1: session.customer_details?.address?.line1,
        customer_addressLine2: session.customer_details?.address?.line2,
        stripe_checkout_session_id: session.id,
        payment_intent_id: session.payment_intent?.toString(),
        payment_status: session.payment_status,
      });
      if (session.payment_status === "paid") {
        await db
          .update(product_quantity)
          .set({
            quantity: sql`${product_quantity.quantity} - ${item.quantity}`,
          })
          .where(
            and(
              eq(product_quantity.product_id, parseInt(product_id)),
              eq(product_quantity.size, size)
            )
          );
      }
    });
    await db.insert(orders).values(dbInsertValues);
    await db
      .delete(in_checkout_amounts)
      .where(eq(in_checkout_amounts.stripe_checkout_id, session.id));
  }

  if (event.type === "checkout.session.expired") {
    await db
      .delete(in_checkout_amounts)
      .where(eq(in_checkout_amounts.stripe_checkout_id, session.id));
  }

  if (event.type === "checkout.session.async_payment_failed") {
    //TODO: test following two functions
    //TODO: Send email to user saying thier payment failed?
    await db
      .delete(orders)
      .where(eq(orders.stripe_checkout_session_id, session.id));
  }
  if (event.type === "checkout.session.async_payment_succeeded") {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });
    lineItems.data.map(async (item) => {
      const product = item.price?.product as Stripe.Product;
      const metadata = product?.metadata;
      const size = metadata.size || "";
      const product_id = metadata.product_id || "";
      await db
        .update(product_quantity)
        .set({ quantity: sql`${product_quantity.quantity} - ${item.quantity}` })
        .where(
          and(
            eq(product_quantity.product_id, parseInt(product_id)),
            eq(product_quantity.size, size)
          )
        );
    });
  }

  return res.json({});
}
