import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from "./component/Base.tsx";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import About from "./pages/About.tsx";
import Service from "./pages/Service.tsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/user-routes/Dashboard.tsx";
import PrivateRoute from "./component/PrivateRoute.tsx";
import ProfileInfo from "./pages/user-routes/ProfileInfo.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import Hero from "./pages/Hero.tsx";
import UpdateBlog from "./component/UpdateBlog.tsx";


function App() {

    return (
        <BrowserRouter>
            <ToastContainer position={'bottom-center'}/>
            <Routes>
                <Route path="/" element={<Hero/>} />
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/signup"} element={<Signup/>}/>
                <Route path={"/about"} element={<About/>}/>
                <Route path={"/services"} element={<Service/>}/>
                <Route path={"/post/:postId"} element={<BlogPage/>}/>
                <Route path={"/user"} element={<PrivateRoute/>}>
                    <Route path={"dashboard"} element={<Dashboard/>}/>
                    <Route path={"profile"} element={<ProfileInfo/>}/>
                    <Route path={"update-blog/:postId"} element={<UpdateBlog/>}/>
                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App