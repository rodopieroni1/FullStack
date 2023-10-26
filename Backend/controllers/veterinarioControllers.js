import Veterinario from '../models/Veterinario.js'
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';
import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvidePassword from '../helpers/emailOlvidePassword.js';

const registrar = async(req, res) => {
    //console.log(req.body);//aqui lo traemos al body desde postman mediate el request
    const {email, nombre}= req.body;
    const existeUsuario = await Veterinario.findOne({email});
    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message})
    }    
    try {
        //Guardar un Nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        emailRegistro ({
            email,
            nombre,
            token:veterinarioGuardado.token
        });

        res.json({msg:"Registrando usuario"});
    } catch (error) {
        console.log(error);
    }
};

const perfil = (req, res) => {
    const {veterinario} = req;
    res.json({perfil:veterinario});
};

const confirmar = async(req, res) =>{
    const {token}  = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token});
    if(!usuarioConfirmar){
        const error = new Error("Token no valido...");
        return res.status(404).json({msg: error.message});
    }
try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({msg: "Usuario confirmado correctamente..."});
} catch (error) {
    console.log(error);
}}

const autenticar = async(req, res) =>{
    const {email, password} = req.body;    
    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email});
    if(!usuario){
        const error = new Error("Usuario no valido...");
        return res.status(403).json({msg: error.message});
    }
    //comprobrar si el usuario esta confirmado
    if(!usuario.confirmado){
        console.log("que carajo es :"+usuario.confirmado);
        const error = new Error("El usuario no ha sido confirmado...");
        return res.status(403).json({msg: error.message});
    }
    //Revisar el passowrd
    if(await usuario.comprobarPassword(password)){
        console.log(usuario.id);
        //autenticar
        res.json({token:generarJWT(usuario.id)});
    }else{
        const error = new Error("El Password es incorrecto...");
        return res.status(403).json({msg: error.message});
    }

};

const olvidePassword = async(req, res) =>{
    const {email} = req.body; //req.body: informacion de un formulario
    const existeVeterinario = await Veterinario.findOne({email});
    if (!existeVeterinario){
        const error = new Error('No se encontro al veterinario');
        return res.status(400).json({msg: error.message});
    }
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        //enviar email con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        })
        res.json({msg: "Hemos enviado un email con las instrucciones"});
    } catch (error) {
        
    console.log(error); 
    }
};

const comprobarToken = async (req, res) =>{
    const {token} =  req.params; //req.params: informacion de la URL
    const tokenValido = await Veterinario.findOne({token});
    if(tokenValido){
        res.json({msj: "Token Re Valido"});
    } else{
        const error = new Error('Token invalido');
        return res.status(400).json({msg: error.message});
    }
    console.log(token);
}

const nuevoPassword = async (req, res) =>{
    const {token} =  req.params; //req.params: informacion de la URL
    console.log(token);
    const {password} =  req.body; //req.body: informacion de un formulario
    const veterinario = await Veterinario.findOne({token});
    if(!veterinario){   
        const error = new Error('Hubo un Error');
        return res.status(400).json({msg: error.message});
    }
    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: 'Password modificado correctamente'});
     } catch (error) {
        console.log(error);
    }
};

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}