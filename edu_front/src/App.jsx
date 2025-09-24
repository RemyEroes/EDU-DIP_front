import React from 'react'
import './App.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import PrivateRoute from './components/PrivateRoute/private-route.jsx';
import PublicRoute from './components/PublicRoute/public-route.jsx';
import Apitest from './pages/api-test/apitest.jsx';
import User from "./components/User/user.jsx";


function App() {
    return (
        <Router>
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
                </Route>
            </Routes>
        </Router>
    );
}

export default App
