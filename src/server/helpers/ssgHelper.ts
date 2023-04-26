import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";

export const generateSSGHelper = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });
