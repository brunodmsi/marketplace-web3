import { FastifyReply, FastifyRequest } from 'fastify';
import userService from '../services/user';

class UserController {
	public async getNonce(req: FastifyRequest, reply: FastifyReply) {
		const { publicAddress } = req.body as {
			publicAddress: string;
		};

		try {
			const nonce = await userService.getNonce(publicAddress);

			reply.send({ nonce });
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
