import { z } from "zod";
import { db } from "~/db/db";
import { orders } from "~/db/schema";
import { eq } from "drizzle-orm/expressions";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ordersRouter = createTRPCRouter({
  listOrders: publicProcedure
    .input(z.object({ unshipped_only: z.boolean() }))
    .query(async ({ input }) => {
      const queryResult = input.unshipped_only
        ? await db.select().from(orders).where(eq(orders.shipped, false))
        : await db.select().from(orders);
      return queryResult;
    }),
  getEmail: publicProcedure
    .input(z.object({ session_id: z.string() }))
    .query(async ({ input }) => {
      const queryResult = await db
        .select({ email: orders.customer_email })
        .from(orders)
        .where(eq(orders.stripe_checkout_session_id, input.session_id));
      return queryResult[0]?.email;
    }),
  shipped: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db
        .update(orders)
        .set({ shipped: true })
        .where(eq(orders.id, input.id));
    }),
});
