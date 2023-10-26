import { useContext } from "react";
import AuthContext from "../context/AuthProvider";


// es este const AuthContext = createContext() que esta en AuthProvider

const useAuth = () =>{
    return useContext(AuthContext)
}

export default useAuth