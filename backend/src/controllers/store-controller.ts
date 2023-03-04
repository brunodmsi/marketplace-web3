import { FastifyReply, FastifyRequest } from 'fastify';

import { prismaClient } from '../database/prisma-client';
import { StoreCreate, StoreUpdate } from '../interfaces/store';
import { User } from '../interfaces/user';
import storeService from '../services/store';
import { HttpException } from '../utils/helpers/http-exception';

class StoreController {
	public async create(req: FastifyRequest, reply: FastifyReply) {
		const { name, description, networks } = req.body as StoreCreate;

		try {
			const response = await storeService.create(
				{ name, description, networks },
				req.user as User
			);

			reply.send(response);
		} catch (e) {
			throw HttpException.badRequest();
		}
	}

	public async edit(req: FastifyRequest, reply: FastifyReply) {
		const { id } = req.params as {
			id: string;
		};

		const body = req.body as StoreUpdate;

		try {
			const response = await storeService.update(id, body, req.user as User);

			reply.send(response);
		} catch (e) {
			return e;
		}
	}

	public async get(req: FastifyRequest, reply: FastifyReply) {
		const { id } = req.params as {
			id: string;
		};

		try {
			const store = await storeService.get(id);

			reply.send(store);
		} catch (e) {
			return e;
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
			await storeService.delete(id, req.user as User);

			reply.send();
		} catch (e) {
			return e;
		}
	}
}

export default new StoreController();
