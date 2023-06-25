import './App.css'
import {Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
import Category from "./pages/Category/Category.jsx";
import Places from "./pages/Places/Places.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route element={<Category/>} path={'/category'}/>
                <Route element={<Places/>} path={'/places'}/>
                <Route element={<Category/>} path={'*'}/>
            </Route>
        </Routes>
    )
}

export default App
