// components/RegisterForm.tsx
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        email: data.email,
        password: data.password,
      });
      console.log(response.data);
    } catch (error) {
      setErrorMessage('Error al registrar el usuario');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Registro</h2>
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
        <div className="mb-4">
          <label className="block mb-1" htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input 
            id="confirmPassword"
            type="password"
            className="input input-bordered w-full"
            {...register('confirmPassword', { required: 'Confirmar contraseña es obligatorio' })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-full">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;
