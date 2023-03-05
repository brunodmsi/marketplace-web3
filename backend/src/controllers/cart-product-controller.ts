import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../interfaces/user';
import cartProductService from '../services/cart-product';

class CartProductController {
	public async updateProducts(req: FastifyRequest, reply: FastifyReply) {
		const { user_cart_id, products } = req.body as {
			user_cart_id: string;
			products: Array<{
				cart_product_id: string;
				amount: number;
			}>;
		};

		try {
			const userCart = await cartProductService.updateProducts(
				{
					user_cart_id,
					products,
				},
				req.user as User
			);

			reply.send(userCart);
		} catch (e) {
			return e;
		}
	}

	public async addProducts(req: FastifyRequest, reply: FastifyReply) {
		const { user_cart_id, products } = req.body as {
			user_cart_id: string;
			products: Array<{
				product_id: string;
				amount: number;
			}>;
		};

		try {
			const userCart = await cartProductService.addProducts(
				{
					user_cart_id,
					products,
				},
				req.user as User
			);

			reply.send(userCart);
		} catch (e) {
			return e;
		}
	}
}

export default new CartProductController();
