/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import Stripe from 'stripe'
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
    typescript: true,
    appInfo: { // For sample support and debugging, not required for production:
      name: "stripe-samples/checkout-one-time-payments",
      version: "0.0.1",
      url: "https://github.com/stripe-samples/checkout-one-time-payments"
    }
  });

  export const paymentRouter = createTRPCRouter({
    testPayment: publicProcedure
    .query(async () => {
        await stripe.charges.create({
            amount: 2000, // $20.00
            currency: 'usd',
            source: 'tok_visa', // Test card number
            description: 'Test payment'
        }).then((res) => {
            return res
        });
    }),

    checkOut: publicProcedure
    .input(
        z.object({ 
            cartItems: z.array(z.object(
                {
                    product_id: z.string(),
                    price: z.string(),
                    quantity: z.number(),
                    size: z.string(),
                    item_name: z.string(),
                }))
            })
    )
    .mutation(async ({input}) => {
        //const cart = db.select().from(carts).where({id: input.cart_id})
        const items = input.cartItems;
        const domainURL = process.env.DOMAIN;

        //conver cart_items to stripe line items
        const lineItems = items.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    unit_amount: parseFloat(item.price as string) * 100,
                    product_data: {
                        name: item.item_name as string,
                        images:  ['none'/* `${domainURL}${item.image}` */],
                        description: (item.size === 'NO SIZES') ? 'CD' : `Size: ${item.size as string}`,
                    },
                },
                quantity: item.quantity as number,
            };
        });

        const session = await stripe.checkout.sessions.create({
            //payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${domainURL as string}/views/stripeCheckout/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainURL as string}/views/stripeCheckout/canceled.html`,
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
        }); 

        return session.url
    }),

    getCheckoutSession: publicProcedure
    .input(z.object({ sessionId: z.string()}))
    .query(async ({input}) => {
        return await stripe.checkout.sessions.retrieve(input.sessionId);
    })
})





