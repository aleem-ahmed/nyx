// [REQUIRE]
require('dotenv').config();

export default {
	// [HEROKU]
	nodeENV: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 5000,
	
	// [APP]
	app: {
		// [MONGODB]
		mongoURI: process.env.APP__MONGO_URI || '',

		// [BASE-URL]
		baseURL: {
			client: process.env.APP__BASE_URL || 'http://localhost:8080',
			server: process.env.APP__BASE_URL || 'http://localhost:5000',
		},
	},

	// [API]
	api: {
		coinbase: {
			apiKey: process.env.API__COINBASE__API_KEY,
			apiSecret: process.env.API__COINBASE__API_SECRET,
		}
	},
};