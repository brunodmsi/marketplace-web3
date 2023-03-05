import { FastifyInstance } from 'fastify';
import product from './routes/product';
import store from './routes/store';
import user from './routes/user';
import userCart from './routes/user-cart';

const health = async (app: FastifyInstance) => {
	return [
		app.get('/', async () => {
			return 'Ok';
		}),
	];
};

export function routes(app: FastifyInstance): FastifyInstance {
	app.register(health, { prefix: '/health' });
	app.register(user, { prefix: '/user' });
	app.register(store, { prefix: '/store' });
	app.register(product, { prefix: '/product' });
	app.register(userCart, { prefix: '/user-cart' });

	return app;
}

export async function router(app: FastifyInstance): Promise<any> {
	return routes(app);
}
