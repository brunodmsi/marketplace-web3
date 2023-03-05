import { prismaClient } from '../database/prisma-client';
import { User } from '../interfaces/user';
import { HttpException } from '../utils/helpers/http-exception';

import storeService from './store';
import userService from './user';

class UserCartService {
	public async create(
		data: { store_id: string; user_public_address: string },
		auth: User
	) {
		const store = await storeService.get(data.store_id);

		if (!store) {
			throw HttpException.badRequest('Store not found');
		}

		const user = await userService.findOrCreate({
			publicAddress: data.user_public_address,
		});

		if (!user) {
			throw HttpException.badRequest('User not found or unabled to create');
		}

		await storeService.checkIfUserHasStorePermissions({
			userId: auth.id,
			storeId: store.id,
		});

		const userCart = await prismaClient.userCart.create({
			data: {
				store_id: store.id,
				user_id: user.id,
			},
		});

		return userCart;
	}
}

export default new UserCartService();
