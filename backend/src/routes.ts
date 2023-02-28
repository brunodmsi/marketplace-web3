import { FastifyInstance } from 'fastify';
import userController from './controllers/user-controller';
import storeController from './controllers/store-controller';

const health = async (app: FastifyInstance) => {
	return [
		app.get('/', async () => {
			return 'Ok';
		}),
	];
};

const user = async (app: FastifyInstance) => {
	return [
		app.post(
			'/get-nonce',
			{
				schema: {
					body: {
						type: 'object',
						required: ['publicAddress'],
						properties: { publicAddress: { type: 'string' } },
					},
				},
			},
			userController.getNonce
		),
		app.post(
			'/authenticate',
			{
				schema: {
					body: {
						type: 'object',
						required: ['publicAddress', 'signature'],
						properties: {
							publicAddress: { type: 'string' },
							signature: { type: 'string' },
						},
					},
				},
			},
			userController.authenticate
		),
	];
};

const store = async (app: FastifyInstance) => {
	return [
		app.post(
			'/create',
			{
				preHandler: app.auth([app.verifyJWT]),
				schema: {
					body: {
						type: 'object',
						required: ['name'],
						properties: {
							name: { type: 'string' },
						},
					},
				},
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
