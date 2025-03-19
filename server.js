import express from "express"
import multer from "multer"
const app = express()
app.use(express.json())


import database from "./config/database.js"

import fs from 'node:fs';

const folderName = process.cwd() + '/Users/uploads';


import storage from "./config/multer.js"

const upload = multer({ storage: storage })

app.get('/', async(req, res) => {
	res.send("hello dev'v");

	// const client = createClient({
	// 	username: 'default',
	// 	password: 'b1LtYYq3am68d6tHBEt5l1O0ICew061W',
	// 	socket: {
	// 		host: 'redis-18295.c74.us-east-1-4.ec2.redns.redis-cloud.com',
	// 		port: 18295
	// 	}
	// });

	// client.on('error', err => console.log('Redis Client Error', err));

	// await client.connect();

	// await client.set('foo', 'bar');
	// const result = await client.get('foo');
	// console.log(result)  // >>> bar



	return res.json("data ok")

})


// import redis from 'redis'
import { createClient } from 'redis';


import userRouter from "./router/userRoutes.js";
app.use("/api/users/", userRouter);

import helpRouter from "./router/helpRoutes.js"
app.use("/api/help/", helpRouter);


app.listen(3000, () => {
	console.log("listen");

	database()
})
