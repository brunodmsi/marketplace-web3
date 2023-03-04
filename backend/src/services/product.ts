import { prismaClient } from '../database/prisma-client';
import { ProductCreate, ProductUpdate } from '../interfaces/product';
import { HttpException } from '../utils/helpers/http-exception';
import storeService from './store';

class ProductService {
	async create({ name, description, value, store_id }: ProductCreate) {
		const store = await storeService.get(store_id);

		const product = await prismaClient.product.create({
			data: {
				name,
				description,
				value,
				store_id: store.id,
			},
		});

		return product;
	}

	async get(id: string) {
		const product = await prismaClient.product.findFirst({
			where: {
				id,
			},
			include: {
				store: true,
			},
		});

		if (!product) {
			throw HttpException.badRequest('Product not found');
		}

		return product;
	}

	async update(id: string, data: ProductUpdate) {
		const product = await prismaClient.product.findFirst({
			where: {
				id,
			},
		});

		if (!product) {
			throw HttpException.badRequest('Store not found');
		}

		const updatedProduct = await prismaClient.product.update({
			where: {
				id,
			},
			data,
		});

		return updatedProduct;
	}

	async delete(id: string) {
		const product = await prismaClient.product.findFirst({
			where: {
				id,
			},
		});

		if (!product) {
			throw HttpException.badRequest('Product not found');
		}

		await prismaClient.product.delete({
			where: {
				id,
			},
		});

		return;
	}
}

export default new ProductService();
