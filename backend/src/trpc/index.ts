import { initTRPC } from '@trpc/server';
import { Context } from './context';

const trpcClient = initTRPC.context<Context>().create();

export const trpcRouter = trpcClient.router;
export const trpcMiddleware = trpcClient.middleware;
export const trpcProcedure = trpcClient.procedure;
