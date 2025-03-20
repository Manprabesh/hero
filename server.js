import express from "express"
import multer from "multer"
const app = express()
app.use(express.json())


import database from "./config/database.js"
import fs from 'node:fs';
const folderName = process.cwd() + '/Users/uploads';
import storage from "./config/multer.js"
const upload = multer({ storage: storage })
import cookieParser from "cookie-parser"
app.use(cookieParser())

import cors from 'cors'
let whitelist = ['Insert your fucking origin']
let corsOptions = {
    credentials:true,
    origin: function (origin, callback) {
        console.log(whitelist.indexOf(origin));
        console.log(whitelist.indexOf());
        console.log(origin);
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    // methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsOptions))

import user_info from "./router/user_information.js"
app.use(user_info)


app.listen(3000, () => {
	console.log("listen");

	database()
})
