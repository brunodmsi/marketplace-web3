import { User } from "@prisma/client";
import { SignerService } from "../services/signer";
import { UserService } from "../services/user";
import { HttpException } from "../utils/helpers/http-exception";

export default class UserController {
	protected userService;

	constructor() {
		this.userService = new UserService();
	}

	async getNonce(params: { publicAddress: string }) {
		const nonce = this.userService.getNonce(params.publicAddress);

		return nonce;
	}

	async authenticate(params: { publicAddress: string, signature: string }) {
		const signer = new SignerService(params.publicAddress);

		const isUserVerified = signer.verifySignature({ signature: params.signature });

		if (!isUserVerified) {
			throw HttpException.unauthorized();
		}

		return {
			wallet: params.publicAddress
		};
	}

	async findOrCreate(publicAddress: string): Promise<User | null> {
		try {
			const user = await this.userService.findOrCreate({ publicAddress });
			return user;
		} catch (err) {
			throw HttpException.badRequest();
		}
	}	

	async create(publicAddress: string): Promise<void> {
		try {
			this.userService.create(publicAddress);
		} catch (err) {
			throw HttpException.badRequest();
		}
	}	
}
