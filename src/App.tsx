import React, {SyntheticEvent} from 'react';
import logo from './logo.svg';
import './App.css';
import Carousel from "./components/Carousel";
import {Route,Routes} from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import Register from "./pages/Register";
import Profiles from "./pages/Profiles";
import CompleteProfile from "../DELETED/CompleteProfile";
import FunctionalComponentResume from "./pages/FunctionalComponentResume";
import NotFoundPage from "./pages/NotFoundPage";
import FunctionalComponentPublicResume from "./pages/FunctionalComponentPublicResume";
import Commonmain from "./pages/Commonmain";
import SetPassword from "./pages/SetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Status from "./pages/Status";
import Recruiter from "./pages/Recruiter";

function App() {



  return (
    <div className="App">


        <Routes>
          <Route path={"/login"} element={<Login />}/>
          <Route path={"/status"} element={<Status />}/>
            <Route path={"/register"} element={<Register />}/>
            <Route path="/public/setpassword/:random_unique" element={<SetPassword />} />
          <Route path="/public/forgotpassword" element={<ForgotPassword />} />


            //Changed from element={Main}
            <Route path={"/"} element={<Commonmain />}/>
            <Route path={"/main"} element={<Main />}/>
            <Route path={"/profiles"} element={<Profiles />}/>
            <Route path={"/404"} element={<NotFoundPage/>} />
            <Route   path="/profile/:profile_id"  element={<FunctionalComponentResume />}/>

          <Route   path="/public/profile/:random_unique"  element={<FunctionalComponentPublicResume />}/>


        </Routes>


    </div>
  );
}

export default App;
