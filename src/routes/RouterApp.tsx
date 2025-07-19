import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";
import PaginaNoEncontrada from "../pages/PaginaNoEncontrada";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import LibraryManagement from "../pages/LibraryManagement";


const RouterApp: React.FC = () => {
     return (
            <AuthProvider>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login/>} />
                            <Route path="/register" element={<Register/>} />
                            <Route path="/library" element={
                                <PrivateRoute>
                                    <LibraryManagement/>
                                </PrivateRoute>
                            } />
                            <Route path="*" element={<PaginaNoEncontrada/>} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </AuthProvider>
        )
} 

export default RouterApp;