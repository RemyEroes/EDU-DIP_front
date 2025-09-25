import React from 'react'
import './App.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import PrivateRoute from './components/PrivateRoute/private-route.jsx';
import PublicRoute from './components/PublicRoute/public-route.jsx';
import Apitest from './pages/api-test/apitest.jsx';
import User from "./components/User/user.jsx";
import Quizz from "./components/Quizz/quizz.jsx";
import logo from './assets/images/logo.jpeg';
import Error404 from "./components/Error404/index.jsx";


function App() {
    return (
        <Router>
            <img src={logo} alt="EDU-DIP logo"/>
            <Routes>
                {/* Routes publiques */}
                <Route element={<PublicRoute/>}>
                    <Route path="/login" element={<Login/>}/>
                </Route>

                {/* Routes protégées */}
                <Route element={<PrivateRoute/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path='/apitest' element={<Apitest/>}/>
                    <Route path="/users/:id" element={<User/>}/>
                    <Route path="/quizz-without-correction/:id" element={<Quizz/>}/>
                    <Route path="*" element={<Error404/>}/>
                </Route>
            </Routes>

        </Router>
    );
}

export default App
