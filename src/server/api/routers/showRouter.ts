import { z } from "zod";

import { db } from "~/db/db";

import { shows } from "~/db/schema";
import { type InferModel } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const config = {
  runtime: "edge",
  regions: ["cle1"],
};

export const showRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        date: z.string(),
        time: z.string(),
        location: z.string(),
        name: z.string(),
        maps_link: z.string(),
        bandsintown_link: z.string(),
        ticket_link: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      type NewShow = InferModel<typeof shows, "insert">;
      const newShow: NewShow = {
        date: input.date,
        time: input.time,
        name: input.name,
        maps_link: input.maps_link,
        location: input.location,
        bandsintown_link: input.bandsintown_link,
        ticket_link: input.ticket_link,
      };
      await db
        .insert(shows)
        .values(newShow)
        .catch((error) => console.error(error));
    }),

  remove: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(shows).where(eq(shows.id, input.id));
    }),

  get: publicProcedure.query(() => {
    return db.select().from(shows);
  }),
});
