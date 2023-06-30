import './App.css'
import {Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
import Category from "./pages/Category/Category.jsx";
import Places from "./pages/Places/Places.jsx";
import Users from "./pages/Users.jsx";
import AuthRequire from "./components/AuthRequire.jsx";
import Login from "./pages/Login.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route element={<AuthRequire/>}>

                    <Route element={<Category/>} path={'/category'}/>
                    <Route element={<Places/>} path={'/places'}/>
                    <Route element={<Users/>} path={'/users'}/>
                    <Route element={<Category/>} path={'*'}/>
                </Route>

            </Route>
            <Route element={<Login/>} path={'/login'}/>
        </Routes>
    )
}

export default App
