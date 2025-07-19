import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";




const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const auth = useContext(AuthContext);
    return auth?.token ? children : <Navigate to="/login" />;
}


export default PrivateRoute;