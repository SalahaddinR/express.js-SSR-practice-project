import mongoose from "mongoose";
mongoose.set('strictQuery', true)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB instantiated at ${conn.connection.host}`.green.underline);
    }
    catch(error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;