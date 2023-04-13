//import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const storeRouter = createTRPCRouter({
  hello: publicProcedure
    .query(() => {
      return {
        greeting: `Scalise Store`,
      };
    }),
});