import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB CONNECTED...')).catch((error) => console.log('error occured', error));
}
export default dbConnect;