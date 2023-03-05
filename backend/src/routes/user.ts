import { FastifyInstance } from 'fastify';
import userController from '../controllers/user-controller';

const user = async (app: FastifyInstance) => {
	return [
		app.put(
			'/update-email',
			{
				preHandler: app.auth([app.verifyJWT]),
				schema: {
					body: {
						type: 'object',
						required: ['email'],
						properties: { email: { type: 'string' } },
					},
				},
			},
			userController.updateEmail
		),
		app.get('/get-nonce/:publicAddress', userController.getNonce),
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

export default user;
