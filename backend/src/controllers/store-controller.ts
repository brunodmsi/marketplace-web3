import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpException } from '../utils/helpers/http-exception';

class StoreController {
	public async create(req: FastifyRequest, reply: FastifyReply) {
		const { name } = req.body as {
			name: string;
		};

		const ownerId = reply.context;
	}
}

export default new StoreController();
