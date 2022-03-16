import React, {useEffect, useState} from 'react';
import Nav from "./Nav";
import Footer from "../pages/Footer";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {Users} from "../models/users";

const Layout = (props: any) => {
    const [redirect, setRedirect] = useState<any>(false);
    const [user, setUser] = useState<any>(null);


    useEffect(()=>{
        (
            async ()=>{
                try {
                    const {data} = await axios.get('userinfo');
                    setUser(data)
                }catch (e) {
                    setRedirect(true)
                }

            }
        )()
    },[])

    if (redirect) {
        return <Navigate to={"/login"} />
    }


    return (
        <div>
            <Nav user={user}/>

            <main>
                {props.children}
            </main>

            <Footer/>
        </div>
    );
};

export default Layout;