import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { FastifyContextSchema } from '../config';
import { HttpException } from '../utils/helpers/http-exception';

export async function authorization(
	req: FastifyRequest,
	_: FastifyReply,
	app: FastifyInstance
) {
	if (req.raw.method === 'OPTIONS') return true;

	try {
		const context = req.context as FastifyContextSchema;

		if (!context.schema?.properties?.protected?.method) return false;

		const jwt = req.headers.authorization;

		if (!jwt) throw Error();

		const tokenDecoded = app.jwt.decode(jwt.replace('Bearer ', '')) as {
			sub: string;
		};

		const session = {
			publicAddress: tokenDecoded.sub,
		};

		const reqParams = req.params as {
			publicAddress?: string;
		};

		if (
			reqParams.publicAddress &&
			reqParams.publicAddress.toLowerCase() !==
				session.publicAddress.toLowerCase()
		) {
			throw Error();
		}

		return true;
	} catch (e) {
		console.log(e);
		throw HttpException.unauthorized();
	}
}
