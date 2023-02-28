import { User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { prismaClient } from '../database/prisma-client';

class StoreController {
	public async create(req: FastifyRequest, reply: FastifyReply) {
		const { name } = req.body as {
			name: string;
		};

		try {
			const user = req.user as User;
			const ownerId = user.id;

			await prismaClient.store.create({
				data: {
					owner_id: ownerId,
					name,
				},
			});

			reply.send({
				success: true,
			});
		} catch (e) {
			return e;
		}
	}
}

export default new StoreController();
