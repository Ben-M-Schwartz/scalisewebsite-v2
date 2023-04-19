/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { NextApiRequest, NextApiResponse } from "next"
import rawBody from "raw-body"
import type Stripe from "stripe"

import { db } from "~/db/db"
import { orders, product_quantity, in_checkout_amounts } from "~/db/schema"
import { type InferModel } from 'drizzle-orm';
import { and, or, eq } from 'drizzle-orm/expressions'
import { stripe } from "~/utils/stripe"

export const config = {
  api: {
    // Turn off the body parser so we can access raw body for verification.
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await rawBody(req)
  const signature = req.headers["stripe-signature"] as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    )
  } catch (error: any) {
    return res.status(400).send(`Webhook Error: ${error.message}`)
  }

  const session = event.data.object as Stripe.Checkout.Session

   if (event.type === "checkout.session.completed") {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product']
    })
    const dbInsertValues: InferModel<typeof orders, 'insert'>[] = []
    lineItems.data.map(async (item) => {
        const product = item.price?.product as Stripe.Product
        const metadata = product?.metadata
        const size = metadata.size || ''
        const quantity = item.quantity
        const product_id = metadata.product_id || ''
        dbInsertValues.push({
            item: item.description,
            size: size,
            quantity: quantity,
            customer_name: session.customer_details?.name,
            customer_email: session.customer_details?.email,
            customer_phone: session.customer_details?.phone,
            customer_city: session.shipping_details?.address?.city,
            customer_state: session.shipping_details?.address?.state,
            customer_zip: session.shipping_details?.address?.postal_code,
            customer_country: session.shipping_details?.address?.country,
            customer_addressLine1: session.shipping_details?.address?.line1,
            customer_addressLine2: session.shipping_details?.address?.line2,
            stripe_checkout_session_id: session.id,
            payment_intent_id:  session.payment_intent?.toString(),
            payment_status: session.payment_status,
        })
        const result = await db.select().from(product_quantity).where(or(
                and(eq(product_quantity.product_id, parseInt(product_id)), eq(product_quantity.size, size)),
                and(eq(product_quantity.product_id, parseInt(product_id)), eq(product_quantity.size, 'NO SIZES'))))
        const currentQuantity = result[0]!.quantity
        await db.update(product_quantity)
        .set({quantity: currentQuantity! - quantity!})
        .where(or(
            and(eq(product_quantity.product_id, parseInt(product_id)), eq(product_quantity.size, size)),
            and(eq(product_quantity.product_id, parseInt(product_id)), eq(product_quantity.size, 'NO SIZES'))))
    })
    await db.insert(orders).values(dbInsertValues)
    await db.delete(in_checkout_amounts).where(eq(in_checkout_amounts.stripe_checkout_id, session.id))
  }
  return res.json({})
}