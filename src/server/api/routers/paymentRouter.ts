/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";

import { stripe } from '~/utils/stripe'

import { db } from "~/db/db"
import { in_checkout_amounts, product_quantity } from "~/db/schema"
import { type InferModel } from 'drizzle-orm';
import { eq } from 'drizzle-orm/expressions'

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

        const comparisons = await Promise.all(items.map(async item => {
            const stock = await db.select().from(product_quantity)
            .where(eq(product_quantity.product_id, parseInt(item.product_id)))

            const inCheckouts = await db.select().from(in_checkout_amounts)
            .where(eq(in_checkout_amounts.product_id, parseInt(item.product_id)))

            const max = stock[0]!.quantity as number - (inCheckouts[0]?.quantity || 0)
            return {
                item_name: item.item_name,
                product_id: item.product_id,
                quantity: item.quantity,
                size: item.size,
                max: max
            }
        }))
        const cartOverflows = comparisons.filter(item => item.quantity > item.max)
        if(cartOverflows.length > 0){
            return ['Not Enough Inventory', cartOverflows]
        }

        //convert cart_items to stripe line items
        const lineItems = items.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    unit_amount: (parseFloat(item.price as string) / item.quantity as number) * 100,
                    product_data: {
                        name: item.item_name as string,
                        images:  ['none'/* `${domainURL}${item.image}` */],
                        description: item.size === '' ? 'CD' : `Size: ${item.size as string}`,
                        metadata: {
                            size: item.size,
                            product_id: item.product_id,
                        }
                    },
                },
                quantity: item.quantity as number,
            };
        });

        const session = await stripe.checkout.sessions.create({
            //payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${domainURL as string}/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainURL as string}/canceled/{CHECKOUT_SESSION_ID}`,
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
        }); 
        return [session.url, session.id];
    }),

    createOrder: publicProcedure
    .input(
        z.object({ 
            cartItems: z.array(z.object(
                {
                    product_id: z.string(),
                    price: z.string(),
                    quantity: z.number(),
                    size: z.string(),
                    item_name: z.string(),
                })),
            checkoutId: z.string()
            })
    ).mutation(async ({input}) => {
        const dbInsertValues: InferModel<typeof in_checkout_amounts, 'insert'>[] = []
        input.cartItems.map((item) => {
            dbInsertValues.push({
                product_id: parseInt(item.product_id),
                stripe_checkout_id: input.checkoutId,
                size: item.size,
                quantity: item.quantity
            })
        })
        await db.insert(in_checkout_amounts).values(dbInsertValues)
    }),

    cancelOrder: publicProcedure
    .input( z.object({id: z.string()}))
    .mutation(async ({input}) => {
        await db.delete(in_checkout_amounts).where(eq(in_checkout_amounts.stripe_checkout_id, input.id))
    }),

    getCheckoutSession: publicProcedure
    .input(z.object({ sessionId: z.string()}))
    .query(async ({input}) => {
        return await stripe.checkout.sessions.retrieve(input.sessionId);
    })
})





