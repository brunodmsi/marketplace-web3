import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserController from "./controllers/user-controller";
import { HttpException } from "./utils/helpers/http-exception";

const health = async (app: FastifyInstance) => {
	app.get('/', async () => {
		return 'Ok';
	});

	return app;
}

const user = async (app: FastifyInstance) => {
	const userController = new UserController();

	app.post('/get-nonce', async (req: FastifyRequest, res: FastifyReply) => {
		const { publicAddress } = req.body as {
			publicAddress: string; 
		};

		if (!publicAddress) throw HttpException.badRequest();

		const nonce = await userController.getNonce({ publicAddress });

		if (!nonce) {
			throw HttpException.userNotFound();
		}

		res.send({ nonce })
	});

	app.post('/authenticate', async (req: FastifyRequest, res: FastifyReply) => {
		const { publicAddress, signature } = req.body as {
			publicAddress: string; 
			signature: string;
		};

		if (!publicAddress) throw HttpException.badRequest();

		const { wallet } = await userController.authenticate({ publicAddress, signature });

		if (!wallet) {
			throw HttpException.userNotFound();
		}

		const token = await res.jwtSign({
			uid: wallet,
		});

		res.send({ jwt: token })
	});

	return app;
}

export function routes(app: FastifyInstance): Promise<any>[] {
	return [
		app.register(health, { prefix: '/health' }),
		app.register(user, { prefix: '/user' })
	];
}

export async function router(app: FastifyInstance): Promise<any> {
	return Promise.all(routes(app));
}
