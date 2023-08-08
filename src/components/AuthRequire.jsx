import React from 'react';
import {useAuth} from "../utils.js";
import {Navigate, Outlet} from "react-router";

const AuthRequire = () => {
    const {token} = useAuth()
    return (
        !!token ? <Outlet/> : <Navigate to={'/login'} />
    );
};

export default AuthRequire;
