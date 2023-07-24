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
import CategoryAdvertisement from "./pages/CategoryAdvertisement/CategoryAdvertisement.jsx";
import EventTypes from './pages/EventTypes/EventTypes';
import EventEdit from "./pages/EventEdit/EventEdit.jsx";
import EventCreate from "./pages/EventCreate/EventCreate.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route element={<AuthRequire/>}>

                    <Route element={<Category/>} path={'/category'}/>
                    <Route element={<Places/>} path={'/places'}/>
                    <Route element={<Users/>} path={'/users'}/>
                    <Route element={<Ratings/>} path={'/ratings'}/>
                    <Route element={<Mailing/>} path={'/mailing'}/>
                    <Route element={<CategoryAdvertisement/>} path={'/categoryadvertisement'}/>
                    <Route element={<Events/>} path={'/event'}/>
                    <Route element={<EventEdit/>} path={'/event/edit/:id'}/>
                    <Route element={<EventTypes/>} path={'/eventtypes'}/>
                    <Route element={<EventCreate/>} path={'/event/create'}/>
					<Route element={<Category/>} path={'*'}/>
                </Route>

            </Route>
            <Route element={<Login/>} path={'/login'}/>
        </Routes>
    )
}

export default App
