import createError from 'http-errors';

export class HttpException {
	static factory(code: number, msg?: string) {
		return createError(+code, msg ?? 'Error');
	}

	static badRequest(msg?: string) {
		return createError(400, msg || 'Bad request');
	}

	static unauthorized(msg?: string) {
		return createError(401, msg || 'Unauthorized');
	}
}
