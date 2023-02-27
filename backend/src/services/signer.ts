import * as ethers from 'ethers';
import { HttpException } from '../utils/helpers/http-exception';
import randomString from '../utils/helpers/random-string';
import { UserService } from './user';

export class SignerService {
	private userService;
	private walletId: string;

	constructor(walletId: string) {
		this.userService = new UserService();

		if (ethers.isAddress(walletId)) {
			this.walletId = walletId
		} else {
			throw HttpException.badRequest();
		}
	}

	async isSignatureVerified(params: { signature: string }): Promise<Boolean> {
		try {
			const user = await this.userService.findOrCreate({ publicAddress: this.walletId });

			if (!user) {
				throw HttpException.unauthorized();
			}

			const msg = `Signing my one-time nonce: ${user.nonce}`;
 
			const recovered = ethers.verifyMessage(msg, params.signature);

			if (ethers.getAddress(this.walletId) === ethers.getAddress(recovered)) {
				this.userService.updateNonce(this.walletId, randomString(36));
				return true;
			}

			return false;
		} catch (e) {
			return false;
		}
	}
}
