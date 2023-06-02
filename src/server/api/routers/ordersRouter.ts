import { z } from "zod";
import { db } from "~/db/db";
import { orders } from "~/db/schema";
import { eq } from "drizzle-orm/expressions";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ordersRouter = createTRPCRouter({
  getEmail: publicProcedure
    .input(z.object({ session_id: z.string() }))
    .query(async ({ input }) => {
      const queryResult = await db
        .select({ email: orders.customer_email })
        .from(orders)
        .where(eq(orders.stripe_checkout_session_id, input.session_id));
      console.log(queryResult[0]?.email);
      return queryResult[0]?.email;
    }),
});
