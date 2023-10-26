import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();
app.use(express.json());// con esto se envia datos

dotenv.config();
conectarDB();


const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOption = {
    origin: function(origin, callback){
        console.log(origin);
        console.log(dominiosPermitidos);

        if ( dominiosPermitidos.indexOf(origin) !== -1 || !origin  ){
            //El origen del request esta permitido
            console.log('PasoIf');

            callback(null, true);
        }else{
            console.log('PasoElse');

            callback(new Error("No permitido por CORS"));
        }
    },
};
app.use(cors(corsOption));

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`escuchando en el puerto ${PORT}`);
})