import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) =>{
    let token;
    if(req.headers.authorization && 
       req.headers.authorization.startsWith("Bearer")
       ){
    try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("token: "+token);
        console.log("decoded: "+decoded);

        req.veterinario = await Veterinario.findById(decoded.id).select(
            "-password -token -confirmado"
            ); //aqui hay error me da null y tiene que traer el objeto del usuario
        return next();// whit this return, go's to the next middelware,and not execute the following lines
        } catch (error) {
            const e = new Error("Token no valido: ");
            return res.status(403).json({msg: e.message});
        
    }    
}
if(!token){
    const error = new Error("Token no valido o inexistente");
    return res.status(403).json({msg: error.message});
    }
    next();
};
export default checkAuth;