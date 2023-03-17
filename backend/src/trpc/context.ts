import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { User } from '../interfaces/user';

export const createContext = async ({
	req,
	res,
}: CreateFastifyContextOptions) => {
	const bearerToken = req.headers?.authorization ?? '';
	const jwt = bearerToken.replace('Bearer ', '');

	let decoded: User | undefined;
	if (jwt !== '') {
		decoded = (await req.jwtVerify({})) as User;
	}

	return { req, res, user: decoded };
};

export type Context = inferAsyncReturnType<typeof createContext>;
