import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
	return { req, res };
}

export type Context = inferAsyncReturnType<typeof createContext>;

