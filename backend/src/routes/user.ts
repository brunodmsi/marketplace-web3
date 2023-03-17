import { z } from 'zod';

import userController from '../controllers/user-controller';
import { trpcRouter, trpcProcedure, trpcProtectedProcedure } from '../trpc';

const userRouter = trpcRouter({
	'update-email': trpcProtectedProcedure
		.input(
			z.object({
				email: z.string().email(),
			})
		)
		.mutation(({ ctx }) => {
			return userController.updateEmail(ctx.req, ctx.res);
		}),
	authenticate: trpcProcedure
		.input(
			z.object({
				publicAddress: z.string(),
				signature: z.string(),
			})
		)
		.mutation(({ ctx }) => {
			return userController.authenticate(ctx.req, ctx.res);
		}),
	'get-nonce': trpcProcedure.query(({ ctx }) => {
		return userController.getNonce(ctx.req, ctx.res);
	}),
});

export default userRouter;
