import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({

    nombre:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    telefono:{
        type:String,
        default:null,
        require:true,
        trim:true
    },
    web:{
        type:String,
        default:null,
    },
    token:{
        type:String,
        default:generarId()
    },
    confirmado:{
        type:Boolean,
        default:false
    },
})

veterinarioSchema.pre("save", async function(next){//si usamos arrowFunction( () => )  nos dara un undefined
    //si antes de guardar ....
    if(!this.isModified("password")){ // si ya esta hasheado no moifique de nuevo
        next();  //este next() va al siguiente middleware que esta en el index.js, por ejemplo... dotenv.config(); conectarDB(); app.use("/api/veterinarios", veterinarioRoutes);
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
});

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
return await bcrypt.compare(passwordFormulario, this.password); // compara el pasword hasheado con el password ingresado
};

const Veterinario = mongoose.model("veterinario", veterinarioSchema);
export default Veterinario;