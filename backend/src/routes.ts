import { FastifyInstance } from 'fastify';

import { trpcRouter, trpcProcedure } from './trpc';

import userRouter from './routes/user';
import product from './routes/product';
import store from './routes/store';
import userCart from './routes/user-cart';
import cartProduct from './routes/cart-product';

export const appRouter = trpcRouter({
	health: trpcProcedure.query(async () => {
		return 'Ok';
	}),
	user: userRouter,
});

export function routes(app: FastifyInstance): FastifyInstance {
	app.register(store, { prefix: '/store' });
	app.register(product, { prefix: '/product' });
	app.register(userCart, { prefix: '/user-cart' });
	app.register(cartProduct, { prefix: '/cart-product' });

	return app;
}

export async function router(app: FastifyInstance): Promise<any> {
	return routes(app);
}
