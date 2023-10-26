import { useState, useEffect, createContext } from "react";

const AuthContext = createContext()
const AuthProvider = ({children}) => {
const [auth, setAuth] = useState({});
    return (
        <AuthContext.Provider>
                {children}
                {/* estos son los children 
         <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevaPassword />} />
            <Route path="confirmar/:token" element={<CofirmarCuenta />} />
          </Route>
        </Routes>  */}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext