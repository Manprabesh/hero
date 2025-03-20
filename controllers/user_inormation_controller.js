import user_model from "../models/user_models.js";
import { createClient } from 'redis';
import set_cookie from "../middleware/jwt_signin.js";
import last_location_model from "../models/last_location_models.js";


const user_location_controller = async (req, res) => {
    const { longitude, latitude } = req.body

    console.log(longitude)

    const client = createClient({
        username: 'default',
        password: 'b1LtYYq3am68d6tHBEt5l1O0ICew061W',
        socket: {
            host: 'redis-18295.c74.us-east-1-4.ec2.redns.redis-cloud.com',
            port: 18295
        }
    });

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    let userSession;
    let main_data;

    const phn_no=req.body.user_data

    const redisKey = `location:${phn_no}`;
    if(longitude !='safe zone') {
        await client.hSet(redisKey, {
            longitude: longitude,
            latitude: latitude
        })


        userSession = await client.hGetAll(redisKey);
        main_data = JSON.stringify(userSession, null, 2);
    }
    else{
        userSession = await client.hGetAll(redisKey);
        main_data = JSON.stringify(userSession, null, 2);


        const last_longitude=userSession.longitude
        const last_latitude=userSession.latitude


        const user_data=await user_model.findOne({phn_no})
        console.log(user_data);

        const last_location=await last_location_model.create({
            longitude:last_longitude,
            latitude:last_latitude,
            belongs_to:user_data._id
        })

        console.log(last_location);

        return res.json("data saved in mongodb")


    }
    console.log(main_data);

    return res.json("data received in the backend")
}


const user_info_controller = async (req, res) => {
    // try {
    // 	fs.mkdir('./uploads', { recursive: true }, (err) => {

    // 		console.log(err);

    // 	});
    // } catch (error) {
    // 	// throw (err)
    // 	console.error(error)
    // }

    console.log("incoming")

    const { user_name, phn_no, address, contact} = req.body

    //saved in the database
    const user_exist=await user_model.findOne({phn_no})

    if(!user_exist){
        const data=await user_model.create({
            name: user_name,
            phn_no:phn_no,
            address: address,
            contacts: contact,
        })
        set_cookie(phn_no,res)

    }
    else{
        return res.json("user already exist")
    }


    // return res.json( {user_name, phn_no,address:address.city,contact:contact.mother,messaage:"account created successfully"})
    return res.json( {messaage:"account created successfully"})

}

const get_data_controller = async (req, res) => {
    const client = createClient({
        username: 'default',
        password: 'b1LtYYq3am68d6tHBEt5l1O0ICew061W',
        socket: {
            host: 'redis-18295.c74.us-east-1-4.ec2.redns.redis-cloud.com',
            port: 18295
        }
    });
    //
    const phn_no=req.body.user_data
    const redisKey = `location:${phn_no}`;

    await client.connect()
    let userLocation = await client.hGetAll(redisKey);
    console.log(JSON.stringify(userLocation, null, 1));
    console.log("incoming ");

/**
 * REMAINING
 * the last location need to send from the database
 * data need to be deleted from the redis
 */

    return res.json(userLocation)
}




export {
    user_location_controller, user_info_controller, get_data_controller
}