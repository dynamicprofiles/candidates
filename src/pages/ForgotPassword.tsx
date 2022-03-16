import React, {SyntheticEvent, useState} from 'react';
import LayoutNoLogin from "../components/LayoutNoLogin";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";

function ForgotPassword(props: any) {

    const [errormessage, setErrormessage] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [redirect, setRedirect] = useState(false)

    const forgotThePassword = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('register',{
            email
        }).then((res)=>{
            if (res.data.type=="error") {
                setErrormessage(res.data.message)
                setTimeout(()=>{
                    setRedirect(true)
                },3000)
            } else {

                setErrormessage("You are sent an email please check!")
            }
        }).catch((res)=>{
            setErrormessage(res.data.message)
            setTimeout(()=>{
                setRedirect(true)
            },3000)
        });
    }

    if (redirect) {
        return <Navigate to={"/login"} />
    }
    return (
        <LayoutNoLogin>
            <main className="form-signin position-absolute top-50 start-50 translate-middle">

                { errormessage &&
                    <h5 className="error text-danger"> { errormessage } </h5> }


                <form onSubmit={forgotThePassword}>
                    <h1 className="h3 mb-3 fw-normal">Realize Your Potential!</h1>


                    <div className="form-floating">
                        <input type="text" className="form-control" id="email"
                               onChange={e => setEmail(e.target.value)}
                               placeholder="Email"/>
                        <label htmlFor="email">Email Id</label>
                    </div>


                    <button className="w-100 btn btn-lg btn-primary" type="submit">SetPassword</button>
                </form>
            </main>

        </LayoutNoLogin>
    );
}

export default ForgotPassword;