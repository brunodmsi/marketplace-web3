import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';

const trpcClient = initTRPC.context<Context>().create();

export const trpcRouter = trpcClient.router;
export const trpcMiddleware = trpcClient.middleware;
export const trpcProcedure = trpcClient.procedure;

const isAuthed = trpcClient.middleware(({ next, ctx }) => {
	if (!ctx.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx: {
			req: ctx.req,
			res: ctx.res,
			user: ctx.user,
		},
	});
});

export const trpcProtectedProcedure = trpcProcedure.use(isAuthed);
