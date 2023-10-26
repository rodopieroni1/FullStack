import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./paginas/Login"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import OlvidePassword from "./paginas/OlvidePassword"
import Registrar from "./paginas/Registrar"
import CofirmarCuenta from "./paginas/ConfirmarCuenta"
import NuevaPassword from "./paginas/NuevaPassword"
import { AuthProvider } from "./context/AuthProvider"

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL);
  console.log(import.meta.env.IMAGENES_URL);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevaPassword />} />
            <Route path="confirmar/:token" element={<CofirmarCuenta />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
