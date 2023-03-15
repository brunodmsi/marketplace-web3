import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../interfaces/user';
import userService from '../services/user';

class UserController {
	public async getNonce(req: FastifyRequest, reply: FastifyReply) {
		const { publicAddress } = req.query as {
			publicAddress: string;
		};

		try {
			const nonce = await userService.getNonce(publicAddress);

			reply.send({ nonce });
		} catch (e) {
			return e;
		}
	}

	public async updateEmail(req: FastifyRequest, reply: FastifyReply) {
		const { email } = req.body as {
			email: string;
		};

		try {
			const response = await userService.updateEmail(
				(req.user as User).id,
				email
			);

			reply.send(response);
		} catch (e) {
			return e;
		}
	}

	public async authenticate(req: FastifyRequest, reply: FastifyReply) {
		const { publicAddress, signature } = req.body as {
			publicAddress: string;
			signature: string;
		};

		try {
			const user = await userService.authenticate({ publicAddress, signature });
			const token = await reply.jwtSign(user);

			return reply.send({
				jwt: token,
			});
		} catch (e) {
			return e;
		}
	}
}

export default new UserController();
