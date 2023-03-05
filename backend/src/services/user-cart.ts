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

	public async get(id: string) {
		const userCart = await prismaClient.userCart.findFirst({
			where: { id },
			include: {
				cart_products: true,
			},
		});

		if (!userCart) {
			throw HttpException.badRequest('User Cart not found');
		}

		const userCartProductsWithItemsTotalValue = [];

		let totalValue = 0;
		if (userCart.cart_products.length > 0) {
			for (let i = 0; i < userCart.cart_products.length; i++) {
				const currCartProduct = userCart.cart_products[i];

				const calculatedValue = currCartProduct.value * currCartProduct.amount;
				userCartProductsWithItemsTotalValue.push({
					...currCartProduct,
					total_value: calculatedValue,
				});

				totalValue += calculatedValue;
			}
		}

		userCart.cart_products = userCartProductsWithItemsTotalValue;

		return { ...userCart, total_cart_value: totalValue };
	}
}

export default new UserCartService();
