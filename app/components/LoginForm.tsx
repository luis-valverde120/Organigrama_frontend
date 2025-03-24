// components/LoginForm.tsx
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: data.email,
        password: data.password,
      });
      // Guardar el token o manejar la autenticación como sea necesario
      console.log(response.data);
    } catch (error) {
      setErrorMessage('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email</label>
          <input 
            id="email"
            type="email"
            className="input input-bordered w-full"
            {...register('email', { required: 'Email es obligatorio' })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">Contraseña</label>
          <input 
            id="password"
            type="password"
            className="input input-bordered w-full"
            {...register('password', { required: 'Contraseña es obligatoria' })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-full">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
