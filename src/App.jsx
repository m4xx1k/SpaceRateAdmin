import './App.css'
import {Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
import Category from "./pages/Category/Category.jsx";
import Places from "./pages/Places/Places.jsx";
import Users from "./pages/Users.jsx";
import AuthRequire from "./components/AuthRequire.jsx";
import Login from "./pages/Login.jsx";
import Ratings from "./pages/Ratings/Ratings.jsx";
import Mailing from "./pages/Mailing/Mailing";
import Events from "./pages/Events/Events";
import Advertisement from "./pages/Advertisements/CategoryAdvertisement";
import EventTypes from './pages/EventTypes/EventTypes';
import EventEdit from "./pages/EventEdit/EventEdit.jsx";
import EventCreate from "./pages/EventCreate/EventCreate.jsx";
import NewUsers from "./pages/NewUsers/NewUsers.jsx";
import Place from "./pages/Place/Place.jsx";

import {Suspense, lazy, useEffect} from 'react';
const routes = [
    {
        path:'/',
        element:lazy(()=>import('./pages/Category/Category'))
    },
    {
        path:'*',
        element:lazy(()=>import('./pages/Category/Category'))
    },
    {
        path:'/places',
        element:lazy(()=>import('./pages/Places/Places'))
    },
    {
        path:'/place/edit/:id',
        element:lazy(()=>import('./pages/Place/Place'))
    },
    {
        path:'/users',
        element:lazy(()=>import('./pages/NewUsers/NewUsers'))
    },
    {
        path:'/ratings',
        element:lazy(()=>import('./pages/Ratings/Ratings'))
    },
    {
        path:'/event/ratings',
        element:lazy(()=>import('./pages/EventRatings/EventRatings'))
    },
    {
        path:'/mailing',
        element:lazy(()=>import('./pages/Mailing/Mailing'))
    },
    {
        path:'/advertisement',
        element:lazy(()=>import('./pages/Advertisements/CategoryAdvertisement'))
    },
    {
        path:'/event',
        element:lazy(()=>import('./pages/Events/Events'))
    },
    {
        path:'/event/edit/:id',
        element:lazy(()=>import('./pages/EventEdit/EventEdit'))
    },
    {
        path:'/eventtypes',
        element:lazy(()=>import('./pages/EventTypes/EventTypes'))
    },
    {
        path:'/event/create',
        element:lazy(()=>import('./pages/EventCreate/EventCreate'))
    }
]
function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route element={<AuthRequire/>}>

                    {/*<Route element={<Category/>} path={'/category'}/>*/}
                    {/*<Route element={<Places/>} path={'/places'}/>*/}
                    {/*<Route element={<Users/>} path={'/users0'}/>*/}
                    {/*<Route element={<NewUsers/>} path={'/users'}/>*/}
                    {/*<Route element={<Ratings/>} path={'/ratings'}/>*/}
                    {/*<Route element={<Mailing/>} path={'/mailing'}/>*/}
                    {/*<Route element={<Advertisement/>} path={'/advertisement'}/>*/}
                    {/*<Route element={<Events/>} path={'/event'}/>*/}
                    {/*<Route element={<EventEdit/>} path={'/event/edit/:id'}/>*/}
                    {/*<Route element={<Place/>} path={'/place/edit/:id'}/>*/}
                    {/*<Route element={<EventTypes/>} path={'/eventtypes'}/>*/}
                    {/*<Route element={<EventCreate/>} path={'/event/create'}/>*/}
					{/*<Route element={<Category/>} path={'*'}/>*/}
                    {
                        routes.map(el=>{
                            const Element = el.element
                            const path = el.path
                            return <Route key={path} path={path} element={
                                <Suspense fallback={<></>}><Element/></Suspense>

                            }/>
                        })
                    }
                </Route>

            </Route>
            <Route element={<Login/>} path={'/login'}/>
        </Routes>
    )
}

export default App
