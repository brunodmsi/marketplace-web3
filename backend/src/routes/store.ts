import { FastifyInstance } from 'fastify';
import storeController from '../controllers/store-controller';

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

export default store;
