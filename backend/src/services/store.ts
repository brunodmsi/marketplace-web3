import { prismaClient } from '../database/prisma-client';
import { StoreCreate, StoreUpdate } from '../interfaces/store';
import { User } from '../interfaces/user';
import { HttpException } from '../utils/helpers/http-exception';

class StoreService {
	async checkIfUserHasStorePermissions(params: {
		userId: string;
		storeId: string;
	}) {
		const store = await prismaClient.store.findFirst({
			where: {
				id: params.storeId,
				owner_id: params.userId,
			},
		});

		if (!store) {
			throw HttpException.badRequest(
				'Auth user does not have permission on store, or store does not exists'
			);
		}

		return true;
	}

	async create({ name, description, networks }: StoreCreate, auth: User) {
		const ownerId = auth.id;

		const store = await prismaClient.store.create({
			data: {
				owner_id: ownerId,
				name,
				description,
				networks,
			},
		});

		return store;
	}

	async get(storeId: string) {
		const store = await prismaClient.store.findFirst({
			where: {
				id: storeId,
			},
			include: {
				products: true,
			},
		});

		if (!store) {
			throw HttpException.badRequest('Store not found');
		}

		return store;
	}

	async update(id: string, data: StoreUpdate, auth: User) {
		const store = await prismaClient.store.findFirst({
			where: {
				id,
			},
		});

		if (!store) {
			throw HttpException.badRequest('Store not found');
		}

		await this.checkIfUserHasStorePermissions({
			storeId: id,
			userId: auth.id,
		});

		const updatedStore = await prismaClient.store.update({
			where: {
				id,
			},
			data,
		});

		return updatedStore;
	}

	async delete(id: string, auth: User) {
		const store = await prismaClient.store.findFirst({
			where: {
				id,
			},
		});

		if (!store) {
			throw HttpException.badRequest('Store not found');
		}

		await this.checkIfUserHasStorePermissions({
			storeId: id,
			userId: auth.id,
		});

		await prismaClient.store.delete({
			where: {
				id,
			},
		});

		return;
	}
}

export default new StoreService();
