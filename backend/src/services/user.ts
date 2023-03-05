import * as ethers from 'ethers';
import { z } from 'zod';

import { prismaClient } from '../database/prisma-client';
import { HttpException } from '../utils/helpers/http-exception';
import randomString from '../utils/helpers/random-string';
import signerService from './signer';

class UserService {
	public async create(publicAddress: string) {
		const isValidAddress = ethers.isAddress(publicAddress);

		if (!isValidAddress) {
			throw HttpException.badRequest('Public address is not valid');
		}

		const user = await prismaClient.user.create({
			data: {
				public_address: publicAddress,
				nonce: randomString(36),
			},
		});

		return user;
	}

	public async getNonce(publicAddress: string) {
		const user = await this.findOrCreate({
			publicAddress: publicAddress,
		});

		if (!user) throw HttpException.badRequest('User not found');

		return user.nonce;
	}

	public async authenticate(params: {
		publicAddress: string;
		signature: string;
	}) {
		const user = await this.findOrCreate({
			publicAddress: params.publicAddress,
		});

		if (!user) throw HttpException.badRequest('User not found');

		const isUserVerified = await signerService.isSignatureVerified({
			walletId: params.publicAddress,
			signature: params.signature,
		});

		if (!isUserVerified) {
			throw HttpException.unauthorized();
		}

		return user;
	}

	public async updateEmail(id: string, email: string) {
		const schema = z.string().email();

		if (!schema.safeParse(email).success) {
			throw HttpException.badRequest('Email is not valid');
		}

		const response = await prismaClient.user.update({
			where: {
				id,
			},
			data: {
				email,
			},
		});

		return response;
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
