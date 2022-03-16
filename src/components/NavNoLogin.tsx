import React from 'react';
import { Link } from 'react-router-dom';
import {Users} from "../models/users";
import axios from "axios";
import Login from "../pages/Login";
import Register from "../pages/Register";

const NavNoLogin = () => {

    let RECRUITER_URL
    const RECRUITER_PORT = process.env.REACT_APP_RECRUITER_PORT || "9000";
    const RECRUITER_HOST = process.env.REACT_APP_RECRUITER_HOST || "localhost";
    const RECRUITER_PROTOCOL = process.env.REACT_APP_RECRUITER_PROTOCOL || "http";

    RECRUITER_URL= RECRUITER_PROTOCOL+"://"+RECRUITER_HOST+":"+ RECRUITER_PORT

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Hubble</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    </div>

                    <div className="collapse topnav-right py-0 navbar-collapse justify-content-end" id="navbarCollapse">


                        <form className="d-flex">


                            <a className="btn btn-sm btn-outline-success me-2" target="_blank" href={ RECRUITER_URL } >
                                As Recruiters
                            </a>
                            <Link className="btn btn-sm btn-outline-success me-2" to={"/register"} replace={true}  >
                                Register
                            </Link>
                            <Link className="btn btn-sm btn-outline-success me-2" to={"/login"} replace={true}  >
                                Login
                            </Link>

                        </form>
                    </div>

                </nav>
            </header>
        </div>
    );
};

export default NavNoLogin;