import { FastifyInstance } from 'fastify';
import userController from './controllers/user-controller';

const health = async (app: FastifyInstance) => {
	return [
		app.get('/', async () => {
			return 'Ok';
		}),
	];
};

const user = async (app: FastifyInstance) => {
	return [
		app.post('/get-nonce', userController.getNonce),
		app.post('/authenticate', userController.authenticate),
	];
};

export function routes(app: FastifyInstance): FastifyInstance {
	app.register(health, { prefix: '/health' }),
		app.register(user, { prefix: '/user' });

	return app;
}

export async function router(app: FastifyInstance): Promise<any> {
	return routes(app);
}
