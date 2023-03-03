import { Store, User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { prismaClient } from '../database/prisma-client';
import { HttpException } from '../utils/helpers/http-exception';

class StoreController {
	public async create(req: FastifyRequest, reply: FastifyReply) {
		const { name, description, networks } = req.body as Store;

		try {
			const user = req.user as User;
			const ownerId = user.id;

			await prismaClient.store.create({
				data: {
					owner_id: ownerId,
					name,
					description,
					networks,
				},
			});

			reply.send({
				success: true,
			});
		} catch (e) {
			throw HttpException.badRequest();
		}
	}

	public async edit(req: FastifyRequest, reply: FastifyReply) {
		const { id } = req.params as {
			id: string;
		};

		const body = req.body as Partial<Store>;

		try {
			const updatedStore = await prismaClient.store.update({
				where: {
					id,
				},
				data: body,
			});

			reply.send(updatedStore);
		} catch (e) {
			throw HttpException.badRequest();
		}
	}

	public async list(_: FastifyRequest, reply: FastifyReply) {
		try {
			const stores = await prismaClient.store.findMany();

			reply.send(stores);
		} catch (e) {
			throw HttpException.badRequest();
		}
	}

	public async delete(req: FastifyRequest, reply: FastifyReply) {
		const { id } = req.params as {
			id: string;
		};

		try {
			await prismaClient.store.delete({
				where: {
					id,
				},
			});

			reply.send();
		} catch (e) {
			throw HttpException.badRequest();
		}
	}
}

export default new StoreController();
