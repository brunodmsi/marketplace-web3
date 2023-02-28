import createError from 'http-errors';

export class HttpException {
	static factory(code: number, msg?: string) {
		return createError(+code, msg ?? 'Error');
	}

	static badRequest(code?: number, msg?: string) {
		return createError(+(code || 400), msg || 'Bad request');
	}

	static unauthorized(code?: number, msg?: string) {
		return createError(+(code || 401), msg || 'Unauthorized');
	}

	static userAlreadyExists(code?: number, msg?: string) {
		return createError(+(code || 409), msg || 'User already exists');
	}

	static userNotFound(code?: number, msg?: string) {
		return createError(+(code || 422), msg || 'User not found');
	}
}
