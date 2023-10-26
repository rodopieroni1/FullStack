import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../../config/axios';
import Alerta from '../components/Alerta';

const CofirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const[alerta, setAlerta] = useState({

  });
  const params = useParams(); // sacamos el parametro que esta en la URL, en este caso el token
  const {token} =params
  useEffect(() => {
    const confirmarCuenta = async()=>{
      try {
        const url = `/veterinarios/confirmar/${token}`;
        const {data}= await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
    }
    setCargando(false);
  }
  confirmarCuenta();
},[])
  return (
    <>
      <div>
        <h1 className="text-indigo-900 font-black text-6xl">
          Confirma tu cuenta y comienza administra tus
          <span className="text-black"> Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!cargando && <Alerta
          alerta={alerta}
        />}

        {cuentaConfirmada &&
        (<Link
          className="block text-center my-5 text-gray-600"
          to="/">Inicia sesion</Link>
          )}
      </div>
    </>
  )
}

export default CofirmarCuenta