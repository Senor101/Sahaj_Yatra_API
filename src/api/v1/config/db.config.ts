import mongoose from "mongoose";

require('dotenv').config();

export const connectDB = async () : Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Database Connected");
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}