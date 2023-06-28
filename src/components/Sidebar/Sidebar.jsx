import React from 'react';
import s from './Sidebar.module.css'
import {Link, useLocation} from "react-router-dom";
import clsx from 'clsx';

const routes = [
    {
        path: '/categories',
        name: 'categories'
    },
    {
        path: '/places',
        name: 'places'
    },
    {
        path: '/users',
        name: 'users'
    },
]
const Sidebar = () => {
    const {pathname} = useLocation()
    return (
        <div className={s.container}>
            <h1 className={s.title}>Admin</h1>
            <div className={s.list}>
                {
                    routes.map(route => (
                        <Link key={route.path} to={route.path} className={
                            clsx(s.link, {[s.active]: pathname===route.path})

                        }>{route.name}</Link>

                    ))
                }
            </div>
        </div>
    );
};

export default Sidebar;
