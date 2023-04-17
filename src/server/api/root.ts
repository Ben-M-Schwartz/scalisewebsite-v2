import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { cartRouter } from "~/server/api/routers/cartRouter"
import { subscriptionRouter } from "~/server/api/routers/subscriptionRouter"
import { inventoryRouter } from "~/server/api/routers/inventoryRouter"
import { paymentRouter } from "~/server/api/routers/paymentRouter"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  cart: cartRouter,
  subscription: subscriptionRouter,
  inventory: inventoryRouter,
  checkout: paymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
