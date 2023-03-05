import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import New from '../pages/New';
import All from '../pages/All';
import { AuthContext } from '../context/authContext';
import NotFound from '../pages/NotFound';

const Main = () => {

    const { user } = useContext(AuthContext);

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
                    <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
                    <Route path='/new' element={user ? <New /> : <Navigate to="/login" />} />
                    <Route path='/all' element={user ? <All /> : <Navigate to="/login" />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
};

export default Main;