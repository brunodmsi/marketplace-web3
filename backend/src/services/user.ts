import { prismaClient } from '../database/prisma-client';
import { HttpException } from '../utils/helpers/http-exception';
import randomString from '../utils/helpers/random-string';
import signerService from './signer';

class UserService {
	public async create(publicAddress: string) {
		const user = await prismaClient.user.create({
			data: {
				public_address: publicAddress,
				nonce: randomString(36),
			},
		});

		return user;
	}

	public async getNonce(publicAddress: string) {
		const user = await prismaClient.user.findFirst({
			where: {
				public_address: publicAddress,
			},
		});

		if (!user) throw HttpException.badRequest('User not found');

		return user.nonce;
	}

	public async authenticate(params: {
		publicAddress: string;
		signature: string;
	}) {
		const isUserVerified = await signerService.isSignatureVerified({
			walletId: params.publicAddress,
			signature: params.signature,
		});

		if (!isUserVerified) {
			throw HttpException.unauthorized();
		}

		const user = await this.findOrCreate({
			publicAddress: params.publicAddress,
		});

		if (!user) throw HttpException.badRequest();

		return user;
	}

	public async updateNonce(publicAddress: string, newNonce: string) {
		try {
			await prismaClient.user.update({
				where: {
					public_address: publicAddress,
				},
				data: {
					nonce: newNonce,
				},
			});
		} catch (e) {
			throw HttpException.badRequest();
		}
	}

	public async findOrCreate(params: { publicAddress: string }) {
		if (!params.publicAddress) return null;

		let user = await prismaClient.user.findUnique({
			where: {
				public_address: params.publicAddress,
			},
		});

		if (!user) {
			user = await this.create(params.publicAddress);
		}

		return user;
	}
}

export default new UserService();
