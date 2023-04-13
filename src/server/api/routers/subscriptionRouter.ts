import { z } from "zod";
import {db} from '~/db/db'
import { subscribers } from '~/db/schema'
import { type InferModel } from 'drizzle-orm';

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const subscriptionRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
        type Subscriber = InferModel<typeof subscribers, 'insert'>;
        const newSubscriber: Subscriber = {
            email: input.email
        }

        await db.insert(subscribers).values(newSubscriber)
    }),
});