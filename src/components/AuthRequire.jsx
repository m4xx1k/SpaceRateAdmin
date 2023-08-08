import React from 'react';
import {useAuth} from "../utils.js";
import {Navigate, Outlet} from "react-router";

const AuthRequire = () => {
    const token = localStorage.getItem('token')
    return (
        !!token ? <Outlet/> : <Navigate to={'/login'} />
    );
};

export default AuthRequire;
