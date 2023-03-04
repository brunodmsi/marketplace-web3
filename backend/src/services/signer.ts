import * as ethers from 'ethers';
import { HttpException } from '../utils/helpers/http-exception';
import randomString from '../utils/helpers/random-string';
import userService from './user';

class SignerService {
	async isSignatureVerified(params: {
		walletId: string;
		signature: string;
	}): Promise<Boolean> {
		try {
			const user = await userService.findOrCreate({
				publicAddress: params.walletId,
			});

			if (!user) {
				throw HttpException.unauthorized();
			}

			const msg = `Signing my one-time nonce: ${user.nonce}`;

			const recovered = ethers.verifyMessage(msg, params.signature);

			if (ethers.getAddress(params.walletId) === ethers.getAddress(recovered)) {
				userService.updateNonce(params.walletId, randomString(36));
				return true;
			}

			return false;
		} catch (e) {
			return false;
		}
	}
}

export default new SignerService();
