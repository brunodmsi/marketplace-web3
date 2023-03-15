import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import Fastify, { FastifyInstance } from 'fastify';
import fastifyAuth from '@fastify/auth';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';

import config from './config';
import { createContext } from './trpc/context';
import { appRouter } from './routes';
import { verifyJWT } from './middlewares/authorization';

const mount = async () => {
	const app: FastifyInstance = Fastify({ logger: true });

	app.register(fastifyJwt, {
		secret: config.jwt.secret,
	});
	app.register(fastifyAuth);

	app.decorate('verifyJWT', verifyJWT);

	await app.register(fastifyCors, {
		methods: 'HEAD, OPTIONS, PUT, POST, PATCH, GET, DELETE',
		allowedHeaders: 'content-type, authorization, x-usr-addr',
		credentials: true,
		maxAge: 1000 * 60 * 24,
		origin: '*',
	});

	app.register(fastifyTRPCPlugin, {
		prefix: '/trpc',
		trpcOptions: { createContext, router: appRouter },
	});

	// await router(app);

	return {
		app,
	};
};

mount().then(async server => {
	const port = +(process?.env?.PORT ?? 8080);

	const { app } = server;

	app.listen(
		{
			port,
		},
		(err: Error | null, address: string) => {
			if (!err) return;

			app.log.error(err);
			app.log.error(address);
		}
	);
});
