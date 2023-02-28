import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpException } from '../utils/helpers/http-exception';
import { UserService } from '../services/user';
import { SignerService } from '../services/signer';

class UserController {
	public async getNonce(req: FastifyRequest, reply: FastifyReply) {
		const { publicAddress } = req.body as {
			publicAddress: string;
		};

		const userService = new UserService();
		const nonce = await userService.getNonce(publicAddress);

		if (!nonce)
			throw HttpException.badRequest(400, 'User with nonce not found');

		return reply.send({
			nonce,
		});
	}

	public async authenticate(req: FastifyRequest, reply: FastifyReply) {
		const { publicAddress, signature } = req.body as {
			publicAddress: string;
			signature: string;
		};

		const signer = new SignerService(publicAddress);

		const isUserVerified = await signer.isSignatureVerified({ signature });

		if (!isUserVerified) {
			throw HttpException.unauthorized();
		}

		const token = await reply.jwtSign({
			sub: publicAddress,
		});

		return reply.send({
			jwt: token,
		});
	}
}

export default new UserController();
