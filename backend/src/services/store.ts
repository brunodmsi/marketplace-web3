import { prismaClient } from '../database/prisma-client';

export class StoreService {
	async create(params: { name: string; ownerId: string }) {
		if (!params.name || !params.ownerId) return null;

		await prismaClient.store.create({
			data: {
				name: params.name,
				owner_id: params.ownerId,
			},
		});
	}
}
