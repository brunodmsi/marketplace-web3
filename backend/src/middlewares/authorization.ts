import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyJWT(
	request: FastifyRequest,
	_: FastifyReply,
	done: (error?: Error) => void
) {
	const bearerToken = request.headers.authorization;
	const jwt = bearerToken?.replace('Bearer ', '');

	if (!jwt) {
		return done(new Error('Missing token header'));
	}

	request.jwtVerify({}, onVerify);

	function onVerify(err: Error | null, decoded: any) {
		if (err || !decoded.sub) {
			return done(new Error('Token not valid'));
		}

		done();
	}
}
