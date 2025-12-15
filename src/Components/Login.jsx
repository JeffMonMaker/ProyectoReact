import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos el contexto

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Sacamos la función login del contexto

  const handleLogin = (e) => {
    e.preventDefault();
    // Usamos la función del contexto que devuelve true si es correcto
    const exito = login(username, password); 
    
    if (exito) {
      navigate('/perfil');
    } else {
      alert('Credenciales incorrectas (Prueba: admin / 1234)');
    }
  };

  return (
    <section className="login">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Usuario" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}