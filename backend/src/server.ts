import Fastify, { FastifyInstance, FastifyError } from 'fastify'
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
	const port = (process?.env?.PORT ?? 8080);

	const { app } = server;

	await app.listen(port, 
		(err: FastifyError) => {
			if (err) {
				app.log.error(err);
			}
		}
	);
});


