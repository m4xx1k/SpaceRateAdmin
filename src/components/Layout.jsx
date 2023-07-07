import React from 'react';
import Sidebar from "./Sidebar/Sidebar.jsx";
import {Outlet} from "react-router";

const Layout = () => {
    return (
        <div className={'layout'}>
         <Sidebar/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;
