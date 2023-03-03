import { FastifyInstance } from 'fastify';
import userController from '../controllers/user-controller';

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

export default user;
