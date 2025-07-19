
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import userService from "../services/userService";
import type { User } from "../models/user";



interface RegisterForm {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const useRegister = () => {
  const [form, setForm] = useState<RegisterForm>({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    repeatPassword: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setError('');
    const registerUserData: User = {
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      password: form.password
    };
    const { register: registerUser } = userService();
    try {
      const response = await registerUser(registerUserData);
      console.log('Registro exitoso:', response);
      window.location.href = '/login'; // Redirigir a la página de login
    } catch (err) {
      console.error('Error en el registro:', err);
      setError('Error al registrar el usuario');
    }
  };

  return {
    form,
    error,
    handleChange,
    handleSubmit
  };
};