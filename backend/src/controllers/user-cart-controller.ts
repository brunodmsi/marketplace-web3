import { FastifyReply, FastifyRequest } from 'fastify';
import userCartService from '../services/user-cart';
import { User } from '../interfaces/user';

class UserCartController {
	public async create(req: FastifyRequest, reply: FastifyReply) {
		const { user_public_address, store_id } = req.body as {
			user_public_address: string;
			store_id: string;
		};

		try {
			const userCart = await userCartService.create(
				{ store_id, user_public_address },
				req.user as User
			);

			reply.send(userCart);
		} catch (e) {
			return e;
		}
	}
}

export default new UserCartController();
