import mongoose from "mongoose";
// import dotenv from dotenv;

 const connectDB = async () =>{
   try {
     const connect = mongoose.connect(process.env.MONGODB_URI,{
         useNewUrlParser: true,
    useUnifiedTopology: true,

    });
    console.log(`Db is connected ${connect.host}`)
   } catch (error) {
    console.log(`DB connection is failed ${error.message}`);
    process.exit(1);
   }
    }

    export default connectDB;