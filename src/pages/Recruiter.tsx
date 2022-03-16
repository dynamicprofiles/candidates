import React, {useEffect} from 'react';
import {useNavigate, Navigate} from "react-router-dom";

function Recruiter(props:any) {
    const RECRUITER_PORT = process.env.REACT_APP_RECRUITER_PORT || "9000";
    /*const navigate = useNavigate()

    useEffect( ()=>{

        navigate("http://localhost:"+ RECRUITER_PORT , {replace: true})
    })
    */

    return (
        <div>
        <div>Redirecting...</div>
            <Navigate to={"http://localhost:"+ RECRUITER_PORT} replace={true}/>
            {window.location.replace("http://agrosys.in")}

        </div>
    );
}

export default Recruiter;