import React from 'react';
import {Navigate, Outlet} from "react-router";

const AuthRequire = () => {
    const token = localStorage.getItem('token')
    console.log(token)
    return (
        !!token ? <Outlet/> : <Navigate to={'/login'} />
    );
};

export default AuthRequire;
