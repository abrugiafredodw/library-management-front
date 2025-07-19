
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import type { Login } from "../models/login";
import { AuthContext } from "../context/AuthContext";



export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email y contraseña son requeridos");
      return;
    }
    setError("");
    const login: Login = {
      email,
      password,
    };
    try {
      const userAuth = await userService().login(login);
      if (userAuth.token) {
        auth?.login(userAuth.token);
        navigate("/");
      } else {
        setError(userAuth.message || "Credenciales incorrectas");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Error en el inicio de sesión");
      } else {
        setError("Error en el inicio de sesión");
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};