import React, {useEffect, useState} from 'react';
import Nav from "./Nav";
import Footer from "../pages/Footer";
import axios from "axios";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {Users} from "../models/users";
import NavNoLogin from "./NavNoLogin";

const LayoutNoLogin = (props: any) => {
    const [redirect, setRedirect] = useState<any>(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(()=>{
        (
            async ()=>{
                try {
                    const {data} = await axios.get('userinfo');
                    setUser(data)
                    setRedirect(true)
                }catch (e) {
                    setRedirect(false)
                }
            }
        )()
    },[])
    if (redirect) {

        return <Navigate to={"/main"} replace/>
    }

    return (
        <div>
            <NavNoLogin />

            <main>
                {props.children}
            </main>

            <Footer/>
        </div>
    );
};

export default LayoutNoLogin;