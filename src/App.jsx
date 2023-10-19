import React from 'react'
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import { AppContext } from './appcontextprovider';
import { checkLogin } from './components/functions.jsx';

import Home from './Home.jsx';
import About from './components/About.jsx';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import DashboardHome from './components/Dashboard/DashboardHome';
import Orders from './components/Dashboard/Orders';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/checkout',
        element: <Checkout />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/logout',
        element: <Logout />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: '',
                element: <DashboardHome />
            },
            {
                path: 'orders',
                element: <Orders />
            },
        ]
    },
])

const App = () => {

    const [isLogin, setIslogin] = useState(false);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        checkLogin().then(data => {
            setIslogin(data.login);
            setUser(data.user);
        });
    }, [])


    return (
        <AppContext.Provider value={{ isLogin, setIslogin, user, setUser, cart, setCart }}>
            <RouterProvider router={router} />
        </AppContext.Provider>
    )
}

export default App
