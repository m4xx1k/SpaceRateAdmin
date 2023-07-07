import React from 'react';
import Sidebar from "./Sidebar/Sidebar.jsx";
import {Outlet} from "react-router";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div className={'layout'}>
            <Sidebar/>
            <main>
                <Outlet/>
            </main>
            <ToastContainer/>
        </div>
    );
};

export default Layout;
