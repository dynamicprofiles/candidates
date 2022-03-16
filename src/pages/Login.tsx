import React, {SyntheticEvent, useState} from 'react';
import '../Login.css';
import axios from "axios";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {configure} from "@testing-library/react";
import LayoutNoLogin from "../components/LayoutNoLogin";
import Commonmain from "./Commonmain";

const Login = () => {
    const [email, setEmail] = useState<any | null>()
    const [password, setPassword] = useState<any | null>()
    const [redirect, setRedirect] = useState<boolean>(false)
    const [errormessage, setErrormessage] = useState<string>('')
    const [newRedirect, setNewRedirect] = useState<string>('')
    const location = useLocation()
    const navigate = useNavigate()

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault()
        await axios.post("login",{
            email , password
        }).then((res)=>{
            if (res.data.type=="error") {
                if (res.data?.redirect) {
                    console.log("Redirecting...")
                    setNewRedirect(res.data.redirect)
                } else {
                    console.log(res.data.message)
                    setErrormessage(res.data.message)
                    setTimeout(() => {
                        setErrormessage('')
                    }, 2000);
                    setRedirect(false)
                }
            } else {
                setRedirect(true)
                setErrormessage('')
            }
            console.log(res.data)
        }).catch((error)=>{
            setErrormessage(error)
            console.log(error)
            setRedirect(false)
        })
    }

    if (newRedirect!=="") {
        return <Navigate to={newRedirect} replace={true}/>
    }

    if (redirect) {
        return <Navigate to={"/profiles"} replace={true}/>
    }


    return (
        <LayoutNoLogin>
            <main className="form-signin position-absolute top-50 start-50 translate-middle">

                <form onSubmit={submit}>

                    { errormessage &&
                        <h5 className="error text-danger"> { errormessage } </h5> }

                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput"
                                   onChange={e => setEmail(e.target.value)}
                                   placeholder="name@example.com"/>
                                <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword"
                                   onChange={e => setPassword(e.target.value)}
                                   placeholder="Password"/>
                                <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

                    <Link to={"/public/forgotpassword"} replace={true} className="nav-item nav-link" >
                        Forgot Password
                    </Link>

                </form>
            </main>

        </LayoutNoLogin>
    );
};

export default Login;