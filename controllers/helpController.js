import * as crypto from "node:crypto";
import helpModel from "../models/helpModel.js";
import userModel from "../models/userModel.js";


export const createHelp = async (req, res) => {
    try {
    const { phone } = req.body;

    const currentUser = await userModel.findOne({ phone: phone });

    if (!currentUser)
    {
        return res.status(404).send({success: false, message: "User not found."});
    }

    const newHelp = new helpModel({
        userId: currentUser._id,
        phone: currentUser.phone,
        accessKey: crypto.randomBytes(20).toString('hex'),
        status: "New",
    });

    await newHelp.save();

    const data = {
        id: newHelp._id,
        access_key: newHelp.accessKey
    }

    return res.status(200).send({success: true, data: data, message: "Help created successfull."});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}


export const listHelps = async (req, res) => {
    try {

        const helpList = await helpModel.find({});

    return res.status(200).send({success: true, message: "Help List successfull", data: helpList});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}