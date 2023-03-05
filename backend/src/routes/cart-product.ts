import { FastifyInstance } from 'fastify';
import cartProductController from '../controllers/cart-product-controller';

const cartProduct = async (app: FastifyInstance) => {
	app.put(
		'/update-products',
		{
			preHandler: app.auth([app.verifyJWT]),
			schema: {
				body: {
					type: 'object',
					required: ['user_cart_id', 'products'],
					properties: {
						user_cart_id: { type: 'string' },
						products: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									product_id: { type: 'string' },
									amount: { type: 'number' },
								},
							},
						},
					},
				},
			},
		},
		cartProductController.updateProducts
	);
	app.post(
		'/add-products',
		{
			preHandler: app.auth([app.verifyJWT]),
			schema: {
				body: {
					type: 'object',
					required: ['user_cart_id', 'products'],
					properties: {
						user_cart_id: { type: 'string' },
						products: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									product_id: { type: 'string' },
									amount: { type: 'number' },
								},
							},
						},
					},
				},
			},
		},
		cartProductController.addProducts
	);
};

export default cartProduct;
