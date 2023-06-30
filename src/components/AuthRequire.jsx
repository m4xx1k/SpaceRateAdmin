import React from 'react';
import {useAuth} from "../utils.js";
import {Navigate, Outlet} from "react-router";

const AuthRequire = () => {
    const {user} = useAuth()
    return (
        !!user ? <Outlet/> : <Navigate to={'/login'} />
    );
};

export default AuthRequire;
