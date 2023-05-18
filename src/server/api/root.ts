import { createTRPCRouter } from "~/server/api/trpc";
import { cartRouter } from "~/server/api/routers/cartRouter";
import { emailRouter } from "~/server/api/routers/emailRouter";
import { inventoryRouter } from "~/server/api/routers/inventoryRouter";
import { checkoutRouter } from "~/server/api/routers/checkoutRouter";
import { showRouter } from "~/server/api/routers/showRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cart: cartRouter,
  email: emailRouter,
  inventory: inventoryRouter,
  checkout: checkoutRouter,
  shows: showRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
