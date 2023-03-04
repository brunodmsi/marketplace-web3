import { FastifyInstance } from 'fastify';
import productController from '../controllers/product-controller';

const product = async (app: FastifyInstance) => {
	return [
		app.get(
			'/get/:id',
			{
				preHandler: app.auth([app.verifyJWT]),
			},
			productController.get
		),
		app.put(
			'/edit/:id',
			{
				preHandler: app.auth([app.verifyJWT]),
				schema: {
					body: {
						type: 'object',
						properties: {
							name: { type: 'string' },
							description: { type: 'string' },
							value: { type: 'number' },
							store_id: { type: 'string' },
						},
					},
				},
			},
			productController.edit
		),
		app.post(
			'/create',
			{
				preHandler: app.auth([app.verifyJWT]),
				schema: {
					body: {
						type: 'object',
						required: ['name', 'value', 'store_id'],
						properties: {
							name: { type: 'string' },
							description: { type: 'string' },
							value: { type: 'number' },
							store_id: { type: 'string' },
						},
					},
				},
			},
			productController.create
		),
		app.get(
			'/list',
			{
				preHandler: app.auth([app.verifyJWT]),
			},
			productController.list
		),
		app.delete(
			'/delete/:id',
			{
				preHandler: app.auth([app.verifyJWT]),
			},
			productController.delete
		),
	];
};

export default product;
