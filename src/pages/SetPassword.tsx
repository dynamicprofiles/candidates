import React, {SyntheticEvent, useState} from 'react';
import LayoutNoLogin from "../components/LayoutNoLogin";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";

function SetPassword(props: any) {

    const {random_unique} = useParams()
    console.log(random_unique)

    const [password, setPassword] = useState('')
    const [password_confirm, setPassword_confirm] = useState('')
    const [redirect, setRedirect] = useState<boolean>(false)
    const [errormessage, setErrormessage] = useState<string>('')

    const setThePassword = async (e:SyntheticEvent) => {
        //public/setpassword/email/:RandomUnique
        e.preventDefault()
        if (password!== password_confirm) {
            setErrormessage("Password Does not Match!")

        } else {
            await axios.post("public/setpassword/email/" +random_unique, {
                password, password_confirm
            }).then((res) => {
                if (res.data.type == "error") {
                    setErrormessage(res.data.messaege + " " + res.data.details)
                    setTimeout(() => {
                        setErrormessage('')
                    }, 2000);
                    setRedirect(false)
                } else {
                    setRedirect(true)
                    setErrormessage(res.data.message)
                }
                console.log(res.data)
            }).catch((error) => {
                console.log("In catch block!")
                console.log(error)
                setErrormessage(error)

                setRedirect(false)
            })
        }
    }
    if (redirect) {
        return <Navigate to={"/login"} />
    }
    return (
        <LayoutNoLogin>
            <main className="form-signin position-absolute top-50 start-50 translate-middle">

                { errormessage &&
                    <h5 className="error text-danger"> { errormessage } </h5> }


                <form onSubmit={setThePassword}>
                    <h1 className="h3 mb-3 fw-normal">Let's Set Your Password!</h1>


                    <div className="form-floating">
                        <input type="password" className="form-control" id="password"
                               onChange={e => setPassword(e.target.value)}
                               placeholder="Password"/>
                        <label htmlFor="password">Password</label>
                    </div>


                    <div className="form-floating">
                        <input type="password" className="form-control" id="repeatpassword"
                               onChange={e => setPassword_confirm(e.target.value)}
                               placeholder="Repeat Password"/>
                        <label htmlFor="repeatpassword">Repeat Password</label>
                    </div>


                    <button className="w-100 btn btn-lg btn-primary" type="submit">SetPassword</button>
                </form>
            </main>

        </LayoutNoLogin>
    );
}

export default SetPassword;