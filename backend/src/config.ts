const config = {
	jwt: {
		secret: process.env.JWT_SECRET || 'default-secret'
	}
}

export default config;
