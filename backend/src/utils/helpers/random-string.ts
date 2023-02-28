const characters =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function randomString(length: number) {
	let result = '';

	const charsLength = characters.length;
	for (let i = 0; i < length; i += 1) {
		result += characters.charAt(Math.floor(Math.random() * charsLength));
	}

	return result;
}
