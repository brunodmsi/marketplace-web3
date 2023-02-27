import { FastifyInstance } from "fastify";
import userController from "./controllers/user-controller";

const health = async (app: FastifyInstance) => {
	app.get('/', async () => {
		return 'Ok';
	});

	return app;
}

const user = async (app: FastifyInstance) => {
	app.post('/get-nonce', userController.getNonce);
	app.post('/authenticate', userController.authenticate);

	return app;
}

export function routes(app: FastifyInstance): Promise<any>[] {
	return [
		app.register(health, { prefix: '/health' }),
		app.register(user, { prefix: '/user' })
	];
}

export async function router(app: FastifyInstance): Promise<any> {
	return Promise.all(routes(app));
}
