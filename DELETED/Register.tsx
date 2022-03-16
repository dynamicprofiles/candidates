import React, {Component, SyntheticEvent} from 'react';
import axios from "axios";

import { Navigate } from 'react-router-dom';
import LayoutNoLogin from "../components/LayoutNoLogin";



class Register extends Component {
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    confirmPassword = '';
    state = {
        redirect : false
    }
    submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('register',{
            first_name: this.firstName,
            last_name: this.lastName,
            email : this.email,
            password : this.password,
            password_confirm : this.confirmPassword,
        });
        this.setState({
            redirect: true
        })
    }
    render() {
        if (this.state.redirect) {
            return <Navigate to={"/login"} />
        }
        return (
            <LayoutNoLogin>
                <main className="form-signin">
                    <form onSubmit={this.submit}>
                        <h1 className="h3 mb-3 fw-normal">Register Here</h1>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="firstname" onChange={e=> this.firstName= e.target.value}
                                   placeholder="FirstName"/>
                            <label htmlFor="firstname">First Name</label>
                        </div>


                        <div className="form-floating">
                            <input type="text" className="form-control" id="lastname" onChange={e=> this.lastName= e.target.value}
                                   placeholder="LastName"/>
                            <label htmlFor="lastname">Last Name</label>
                        </div>



                        <div className="form-floating">
                            <input type="email" className="form-control" id="email" onChange={e=> this.email= e.target.value}
                                   placeholder="name@example.com"/>
                            <label htmlFor="email">Email address</label>
                        </div>

                        <div className="form-floating">
                            <input type="password" className="form-control" id="password" onChange={e=> this.password= e.target.value}
                                   placeholder="Password"/>
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="form-floating">
                            <input type="password" className="form-control" id="confirmPassword" onChange={e=> this.confirmPassword= e.target.value}
                                   placeholder="Confirm Password"/>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                    </form>
                </main>

            </LayoutNoLogin>
        );
    }
}

export default Register;


