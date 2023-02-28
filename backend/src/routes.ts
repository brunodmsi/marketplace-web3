import { FastifyInstance } from 'fastify';
import userController from './controllers/user-controller';
import storeController from './controllers/store-controller';

const health = async (app: FastifyInstance) => {
	return [
		app.get(
			'/',
			{
				preHandler: app.auth([app.verifyJWT]),
			},
			async () => {
				return 'Ok';
			}
		),
	];
};

const user = async (app: FastifyInstance) => {
	return [
		app.post('/get-nonce', userController.getNonce),
		app.post('/authenticate', userController.authenticate),
	];
};

const store = async (app: FastifyInstance) => {
	return [
		app.post(
			'/create',
			{
				preHandler: app.auth([app.verifyJWT]),
			},
			storeController.create
		),
	];
};

export function routes(app: FastifyInstance): FastifyInstance {
	app.register(health, { prefix: '/health' });
	app.register(user, { prefix: '/user' });
	app.register(store, { prefix: '/store' });

	return app;
}

export async function router(app: FastifyInstance): Promise<any> {
	return routes(app);
}
