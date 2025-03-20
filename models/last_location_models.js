import mongoose,{Schema} from "mongoose";

const last_location=new Schema({
    longitude:{
        type:String
    },
    latitude:{
        type:String
    },
    belongs_to:{
        type:Schema.Types.ObjectId,
        ref:'user_model'
    }
})

const last_location_model=mongoose.model('user_last_location',last_location);
export default last_location_model