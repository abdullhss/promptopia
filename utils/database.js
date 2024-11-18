import mongoose from "mongoose";

let isConnected = false ; 

export const connectToDB = async () =>{
    mongoose.set("strictQuery" , true) ; 

    if(isConnected){
        console.log("Mongo DB Is connected ");
        return ; 
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI , {
            dbName :"share_prompt" ,
            useNewUrlParser : true , 
            useUnifiedTopology : true 
        });

        isConnected = true ; 
        console.log("MOngo DB CONNECTED NOW !");

    } catch (error){
        console.log(error);
    }
}