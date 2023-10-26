import express from "express";
const router = express.Router();
import { registrar, perfil, confirmar, autenticar,olvidePassword,comprobarToken, nuevoPassword} from "../controllers/veterinarioControllers.js";
import checkAuth from "../middelware/authMiddelware.js";

router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
//router.get('/olvide-password/:token', comprobarToken);
//router.post('/olvide-password/:token', nuevoPassword);

//tambien puede hacerce asi 
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)

router.get('/perfil', checkAuth , perfil);//primero ejectura el checkout y con el next que hay en esta funcion, se ejecuta el perfil




export default router;