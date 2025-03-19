import mongoose from "mongoose";

const uri = "mongodb+srv://monboruah0986:pass123@cluster0.9qypq.mongodb.net/help";

async function database() {
    mongoose.connection.on('connected', () => console.log('connected'));
    await mongoose.connect(uri)
}

export default database