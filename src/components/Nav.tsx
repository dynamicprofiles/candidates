import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Users} from "../models/users";
import axios from "axios";

const Nav = (props: {user: Users | null}) => {
    const logout = async () => {
        await axios.post("logout")
        window.location.reload();
    }
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
                    <div><a className="navbar-brand" href="/main">Hubble</a>
                    </div>
                    <div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    </div>
                    <div className="collapse topnav-right py-0 navbar-collapse justify-content-end" id="navbarCollapse">


                        <form className="d-flex">

                            <Link className="btn btn-sm btn-outline-success me-2" to={"/profiles"}>
                                Profiles
                            </Link>

                            <a className="btn btn-sm btn-outline-success me-2" target="_blank" href={ RECRUITER_URL } >
                                As Recruiters
                            </a>

                            <Link className="btn btn-sm btn-outline-success me-2" to={"/login"} replace={true}  onClick={logout}>
                                Log Out
                            </Link>

                        </form>
                    </div>
                </div>
            </nav>
            </header>
        </div>
    );
};

export default Nav;