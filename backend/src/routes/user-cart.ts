import { FastifyInstance } from 'fastify';
import userCartController from '../controllers/user-cart-controller';

const userCart = async (app: FastifyInstance) => {
	app.post(
		'/create',
		{
			preHandler: app.auth([app.verifyJWT]),
			schema: {
				body: {
					type: 'object',
					required: ['store_id', 'user_public_address'],
					properties: {
						user_public_address: { type: 'string' },
						store_id: { type: 'string' },
					},
				},
			},
		},
		userCartController.create
	);
};

export default userCart;
