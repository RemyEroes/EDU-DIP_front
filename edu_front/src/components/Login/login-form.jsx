import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import './login-form.scss';


export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {username, password});
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', res.data.user)
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Erreur connexion');
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        handleLogin();
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" id="username" placeholder="Nom d'utilisateur"
                   onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder="Mot de passe"
                   onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" className="btn" onClick={handleLogin}>Se connecter</button>
        </form>
    )
}
