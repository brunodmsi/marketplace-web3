import Fastify, { FastifyInstance } from 'fastify'
import fastifyJwt from '@fastify/jwt';
import config from './config';
import { router } from './routes';
import { authorization } from './middlewares/authorization';

const mount = async () => {
	const app: FastifyInstance = Fastify({ logger: true });

	app.register(fastifyJwt, {
		secret: config.jwt.secret
	});

	// TODO: cors
	// TODO: sessioninit
	//
	app.addHook("onRequest", async (req, res) => {
    await authorization(req, res, app);
  });

	await router(app);

	return {
		app
	}
}

mount().then(async (server) => {
	const port = +(process?.env?.PORT ?? 8080);

	const { app } = server;

	app.listen({
			port
		},
		(err: Error | null, address: string) => {
			app.log.error(err);
			app.log.error(address);
			process.exit(1);
		}
	);
});


