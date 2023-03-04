import { FastifyReply, FastifyRequest } from 'fastify';

import { prismaClient } from '../database/prisma-client';
import { ProductCreate, ProductUpdate } from '../interfaces/product';
import { HttpException } from '../utils/helpers/http-exception';
import productService from '../services/product';
import { User } from '../interfaces/user';

class ProductController {
	public async create(req: FastifyRequest, reply: FastifyReply) {
		const { name, description, value, store_id } = req.body as ProductCreate;

		try {
			const response = await productService.create({
				name,
				description,
				value,
				store_id,
			});

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
			const product = await productService.get(id);

			reply.send(product);
		} catch (e) {
			return e;
		}
	}

	public async edit(req: FastifyRequest, reply: FastifyReply) {
		const { id } = req.params as {
			id: string;
		};

		const body = req.body as ProductUpdate;

		try {
			const response = await productService.update(id, body, req.user as User);

			reply.send(response);
		} catch (e) {
			return e;
		}
	}

	public async list(_: FastifyRequest, reply: FastifyReply) {
		try {
			const products = await prismaClient.product.findMany();

			reply.send(products);
		} catch (e) {
			throw HttpException.badRequest();
		}
	}

	public async delete(req: FastifyRequest, reply: FastifyReply) {
		const { id } = req.params as {
			id: string;
		};

		try {
			await productService.delete(id, req.user as User);

			reply.send();
		} catch (e) {
			return e;
		}
	}
}

export default new ProductController();
