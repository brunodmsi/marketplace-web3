import fastify, { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

declare module 'fastify' {
	export interface FastifyInstance<
		HttpServer = Server,
		HttpRequest = IncomingMessage,
		HttpResponse = ServerResponse
	> {
		verifyJWT: (
			req: FastifyRequest,
			_: any,
			done: (err?: Error) => void
		) => void;
	}
}
