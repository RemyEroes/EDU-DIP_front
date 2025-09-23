import {useEffect, useState} from 'react'
import './App.scss'
import MenuPage from "./components/Menu/menu.jsx";
import LoginForm from "./components/Login/login-form.jsx";

function  App () {

    const data =  fetch("http://localhost:3030/ok")
        .then(data => console.log(data))
    const [isConnected, setIsConnected] = useState(false)
    return (
        <>
            <h1>Bienvenue sur EDU DIP</h1>
            <h2>Votre portail éducatif</h2>

            {isConnected ? <MenuPage/> : <LoginForm/>}
        </>
    )
}

export default App
