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
		app.put(
			'/edit/:id',
			{
				preHandler: app.auth([app.verifyJWT]),
				schema: {
					body: {
						type: 'object',
						properties: {
							owner_id: { not: {} },
							name: { type: 'string' },
							description: { type: 'string' },
							networks: {
								type: 'array',
								items: { type: 'string' },
								default: [],
							},
						},
					},
				},
			},
			storeController.edit
		),
		app.post(
			'/create',
			{
				preHandler: app.auth([app.verifyJWT]),
				schema: {
					body: {
						type: 'object',
						required: ['name', 'description', 'networks'],
						properties: {
							name: { type: 'string' },
							description: { type: 'string' },
							networks: {
								type: 'array',
								items: { type: 'string' },
								default: [],
							},
						},
					},
				},
			},
			storeController.create
		),
		app.get(
			'/list',
			{
				preHandler: app.auth([app.verifyJWT]),
			},
			storeController.list
		),
		app.delete(
			'/delete/:id',
			{
				preHandler: app.auth([app.verifyJWT]),
			},
			storeController.delete
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
