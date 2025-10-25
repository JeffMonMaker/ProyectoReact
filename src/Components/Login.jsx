import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({ setIsAuthenticated }) {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();


const handleLogin = (e) => {
e.preventDefault();
if (username === 'admin' && password === '1234') {
setIsAuthenticated(true);
navigate('/perfil');
} else {
alert('Credenciales incorrectas');
}
};


return (
<section className="login">
<h2>Iniciar sesión</h2>
<form onSubmit={handleLogin}>
<input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
<input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
<button type="submit">Ingresar</button>
</form>
</section>
);
}