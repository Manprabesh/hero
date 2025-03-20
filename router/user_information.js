import express from 'express'

const user_info=express.Router()

// import user_info_controller from '../controllers/user_inormation_controller.js'
import {user_info_controller,get_data_controller, user_location_controller} from '../controllers/user_inormation_controller.js'
import verify_user from '../middleware/jwt_verify.js'
user_info.post('/user/data',user_info_controller)
user_info.get('/user/data',verify_user,get_data_controller)
user_info.post('/user/location',verify_user,user_location_controller)

export default user_info