// [IMPORT]
import axios from "axios";
import cors from "cors";
import crypto from "crypto";
import express from "express";
// [IMPORT] Personal
import config from "../../s-config";


const fetch = require('node-fetch');


// [EXPRESS + USE]
const router = express.Router().use(cors());


// [INIT]
const baseURL = 'https://api.exchange.coinbase.com';
let returnObj = {
	executed: true,
	status: false,
	message: ""
};


router.get(
	"/candles/:product_id",
	async (req: express.Request, res: express.Response) => {
		// [INIT]
		let _returnObj = {
			...returnObj,
			product_id: req.params.product_id,
		};
		
		// [INIT] Const
		const granularity = req.query.granularity || 60;

		// [API-REQ]
		const data = await fetch(
			`${baseURL}/products/${req.params.product_id}/candles?granularity=${granularity}`,
			{ method: 'GET' }
		)
			.then(res =>  res.json())
			.catch(err => err)
		;

		// [200]
		res.status(200).send({
			..._returnObj,
			candles: data,
		})
	}
);


router.get(
	"/list-tokens",
	async (req: express.Request, res: express.Response) => {
		// [INIT]
		let _returnObj = {
			...returnObj,
			coinbaseData: {},
		};
		const cb_access_timestamp: number = Date.now() / 1000;

		// [CRYPTO]
		const cb_access_sign = crypto
			.createHmac(
				"sha256",
				Buffer.from(config.api.coinbase.apiSecret, "base64")
			)
			.update(cb_access_timestamp + "GET" + "/currencies" + JSON.stringify({}))
			.digest('base64')
		;

		// [API-REQUEST]
		const request = await axios.get(
			`${baseURL}/currencies`,
			{
				headers: {
					"CB-ACCESS-KEY": config.api.coinbase.apiKey,
					"CB-ACCESS-SIGN": cb_access_sign,
					"CB-ACCESS-TIMESTAMP": `${cb_access_timestamp}`,
					"CB-ACCESS-PASSPHRASE": "",
				}
			}
		);
		
		// [200]
		res.status(200).send({
			..._returnObj,
			status: true,
			coinbaseCurrencies: request.data
		})
	}
);


router.get(
	"/get-prices/:product_id",
	async (req: express.Request, res: express.Response) => {
		// [INIT]
		let _returnObj = {
			...returnObj,
			product_id: req.params.product_id,
		};

		// [API-REQ]
		const data = await fetch(
			`${baseURL}/products/${req.params.product_id}/book`,
			{ method: 'GET' }
		)
			.then(res =>  res.json())
			.catch(err => err)
		;

		// [200]
		res.status(200).send({
			..._returnObj,
			book: data,
		})
	}
);


export default router;