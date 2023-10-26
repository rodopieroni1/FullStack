import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";

const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({msg: 'Campos Vacios', error:true });
            return;
        }
        if(password !== repetirPassword){
            setAlerta({msg: 'Las contraseñas no coinciden', error:true });
            return;
        }        
        if(password.length < 8 ){
            setAlerta({msg: 'El password debe ser mayor a 8 digitos', error:true });
            return;
        }
        setAlerta({});
        try {
            await clienteAxios.post('/veterinarios', { nombre, email, password });
            setAlerta({
                msg:'Se registro correctamente, revisa tu email',
                error:false
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            });
        }
    }

    const {msg} = alerta; // saco el msg del objeto arriba
    return (
        <>
        <div>
            <h1 className="text-indigo-900 font-black text-6xl">
                Crea tu cuenta y administra tus
                <span className="text-black"> Pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {msg && <Alerta alerta={alerta} />
            /*si hay algo en msg que se muestre sino vacio */}  
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Nombre:
                    </label>
                    <input type="nombre"
                        placeholder="Tu nombre"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Email:
                    </label>
                    <input type="email"
                        placeholder="Agregue mail"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Password:
                    </label>
                    <input type="password"
                        placeholder="Tu password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Repetir Password:
                    </label>
                    <input type="password"
                        placeholder="Repite tu password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value="Registrar"
                    className="bg-indigo-700 w-full py-3 px-10
                    rounded-xl text-white uppercase font-bold
                    mt-5 hover:cursor-pointer hover:bg-indigo-800
                    md:w-auto ">
                </input>
            </form>
            <nav className='mt-10'>
                <Link
                    to="/"
                    className="block text-center my-5 text-gray-600">¿ya tienes una cuenta? Inicia sesion</Link>
                <Link
                    to="/OlvidePassword"
                    className="block text-center my-5 text-gray-600">¿Olvidaste Password?</Link>
            </nav>
        </div>
        </>
    )
}

export default Registrar