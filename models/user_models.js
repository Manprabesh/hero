import mongoose,{Schema} from "mongoose";

const user=new Schema({
    name:{
        type:String,
    },
    address:{
        type:{}
    },
    contacts:{
        type:{}
    },
    phn_no:{
       type:String
    }
})

const user_model=mongoose.model('user_model',user)
export default user_model