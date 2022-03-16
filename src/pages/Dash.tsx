import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Navigate} from "react-router-dom";
import Layout from "../components/Layout";

const Dash = () => {
    const [redirect, setRedirect] = useState(false);


    useEffect(()=>{
        (
            async ()=>{
                try {
                    const response = await axios.get('userinfo');
                    console.log(response.data)
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
        <Layout>

            <div>
                Users
            </div>
        </Layout>
    );
};

export default Dash;