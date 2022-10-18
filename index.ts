// [IMPORT]
import bodyParser from "body-parser";
import history from "connect-history-api-fallback";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose, { ConnectOptions } from "mongoose";
import path from "path";

// [IMPORT] Personal
import config from "./s-config";
import route_api from './s-route/api';


// [EXPRESS]
const app = express();


// [SERVER] Upgrade app to server
const server = http.createServer(app);


/**
 * @notice [SET][USE]
 * socketio
 * body-parser
 * cors
 * Express - static folder
 * Rate Limiter - Global
*/
app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(cors())
	.use(history({
		rewrites: [
			{
				from: /^\/api.*$/,
				to: function (context) {
					return context.parsedUrl.path
				}
			}
		]
	}))
;


/**
 * @notice [USE]
 * [ROUTE][API]
*/
app
	.use("/api", route_api)
;


// [HEROKU] Set Static Folder
if (config.nodeENV == "production") {
	app.use(express.static("client/dist"));

	app.get(
		"*",
		(req: express.Request, res: express.Response) => {
			res.sendFile(
				path.resolve(__dirname, "client", "build", "index.html")
			);
		}
	);
}


// [MONGOOSE-CONNECT]
mongoose.connect(
	config.app.mongoURI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	} as ConnectOptions
)
	.then(() => {
		console.log("Mongoose Connected to MongoDB");
	})
	.catch((err) => {
		console.log(`Failed to connect to MongoDB: ${err}`);
	})
;


// [LISTEN]
server.listen(
	config.port,
	() => console.log(`Server Running on Port: ${config.port}`)
);