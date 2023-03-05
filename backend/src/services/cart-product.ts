import storeService from './store';
import userCartService from './user-cart';
import productService from './product';
import { HttpException } from '../utils/helpers/http-exception';
import { User } from '../interfaces/user';
import { prismaClient } from '../database/prisma-client';

class CartProductService {
	public async addProducts(
		data: {
			user_cart_id: string;
			products: Array<{
				product_id: string;
				amount: number;
			}>;
		},
		auth: User
	) {
		const userCart = await userCartService.get(data.user_cart_id);

		if (!userCart) {
			throw HttpException.badRequest('User Cart not found');
		}

		await storeService.checkIfUserHasStorePermissions({
			userId: auth.id,
			storeId: userCart.store_id,
		});

		for (let { product_id, amount } of data.products) {
			const foundProduct = await productService.get(product_id);

			if (!foundProduct) {
				continue;
			}

			await prismaClient.cartProduct.create({
				data: {
					user_cart_id: userCart.id,
					name: foundProduct.name,
					description: foundProduct.description,
					value: foundProduct.value,
					amount,
				},
			});
		}

		const refetchedUserCart = await userCartService.get(data.user_cart_id);

		return refetchedUserCart;
	}

	async get(id: string) {
		const cartProduct = await prismaClient.cartProduct.findFirst({
			where: {
				id,
			},
		});

		if (!cartProduct) {
			return null;
		}

		return cartProduct;
	}

	public async updateProducts(
		data: {
			user_cart_id: string;
			products: Array<{
				id: string;
				amount: number;
			}>;
		},
		auth: User
	) {
		const userCart = await userCartService.get(data.user_cart_id);

		if (!userCart) {
			throw HttpException.badRequest('User Cart not found');
		}

		await storeService.checkIfUserHasStorePermissions({
			userId: auth.id,
			storeId: userCart.store_id,
		});

		for (let { id, amount } of data.products) {
			const cartProduct = await this.get(id);
			console.log(cartProduct?.id, amount);

			if (!cartProduct) {
				continue;
			}

			if (amount <= 0) {
				await prismaClient.cartProduct.delete({
					where: {
						id: cartProduct.id,
					},
				});

				continue;
			}

			await prismaClient.cartProduct.update({
				where: {
					id: cartProduct.id,
				},
				data: {
					amount,
				},
			});
		}

		const refetchedUserCart = await userCartService.get(data.user_cart_id);

		return refetchedUserCart;
	}
}

export default new CartProductService();
