import { FastifyContext } from 'fastify';

export interface FastifyContextSchema extends FastifyContext {
	schema: {
		properties: {
			protected: {
				method: string;
				permission?: string | number;
			};
		};
	};
}

const config = {
	jwt: {
		secret: process.env.JWT_SECRET || 'default-secret',
	},
	route: (method: 'jwt', permission?: string | number) => {
		return {
			schema: {
				properties: {
					protected: {
						method,
						permission: permission || 1,
					},
				},
			},
		};
	},
};

export default config;
