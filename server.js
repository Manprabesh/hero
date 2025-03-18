import express from "express"
import multer from "multer"
const app = express()
app.use(express.json())

import fs from 'node:fs';

const folderName = process.cwd() + '/Users/uploads';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads")
	},
	filename: function (req, file, cb) {

		cb(null, file.originalname)
		console.log(file.originalname);

		console.log("incoming file")

	}
})

const upload = multer({ storage: storage })
app.get('/', (req, res) => {
	res.send("hello dev'v")
})

try {
	app.post('/user/signup', (req, res) => {
		// try {
		// 	fs.mkdir('./uploads', { recursive: true }, (err) => {

		// 		console.log(err);

		// 	});
		// } catch (error) {
		// 	// throw (err)
		// 	console.error(error)
		// }

		const { user_name, phn_no, address, contact } = req.body
		// console.log(req);

		console.log(user_name);
		console.log(phn_no);
		console.log(address);
		console.log(contact);

		//saved in the database

		return res.json("data sent")

	})

} catch (error) {

}

app.listen(3000)
