import mongoose from "mongoose";

const conectarDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, 
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`BD conectada en: ${url}`);
    } catch (error) {
        console.log(`Error:${error.message}`);
        process.exit(1);
    }
};
export default conectarDB;