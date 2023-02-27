import { prismaClient } from "../database/prisma-client";
import { HttpException } from "../utils/helpers/http-exception";
import randomString from "../utils/helpers/random-string";

export type User = {
	public_address: string;
	nonce: string;
	id: string;
}

export class UserService {
	public async create(publicAddress: string) {
		const user = await prismaClient.user.create({
			data: {
				public_address: publicAddress,
				nonce: randomString(36)
			}
		});

		return user;
	}

	public async getNonce(publicAddress: string) {
		const user = await prismaClient.user.findFirst({
			where: {
				public_address: publicAddress
			}
		});

		if (!user) return null;

		return user.nonce;
	}

	public async updateNonce(publicAddress: string, newNonce: string) {
		try {
			await prismaClient.user.update({
				where: {
					public_address: publicAddress 
				},
				data: {
					nonce: newNonce
				}
			}) 
		} catch (e) {
			throw HttpException.badRequest();
		}
	}


	public async findOrCreate(params: { publicAddress: string }) {
		if (!params.publicAddress) return null;

		let user = await prismaClient.user.findUnique({
			where: {
				public_address: params.publicAddress
			}
		});
		
		if (!user) {
			user = await this.create(params.publicAddress);
		} 

		return user;
	}
}

