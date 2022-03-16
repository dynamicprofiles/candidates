import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import axios, {AxiosError} from "axios";
import FunctionalChild1 from "./FunctionalChild1";
import {Profile} from "../models/Profile";
import {Experience} from "../models/Experience";
import NotFoundPage from "./NotFoundPage";
import {Education} from "../models/Education";
import EducationChild from './EducationChild';


function FunctionalComponentResume(props:any) {
    let {profile_id} = useParams()


    let p : Profile = {
        ID : 0,
        name: '',
        heading: '',
        description: '',

        active: true,
        created_at : '',

        visibility: "private",
        randomUnique: '',
        email_id: '',
        contact_number: '',
        website : ''
    }
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState()

    const [profile, setProfile] = useState<Profile>(p)

    const [experiences, setExperiences] = useState<Experience[]>()

    const [educations, setEducations] = useState<Education[]>()





    useEffect(() => {
        // Update the document title using the browser API
        axios.get('profiles/'+profile_id+'/experiences').then( (res)=> {
            setExperiences(res.data)

        })
            .catch((reason: AxiosError) => {
                if (reason.response!.status > 400 && reason.response!.status <500) {
                    // Handle 400
                    navigate("/login")
                } else {
                    // Handle else
                }
                console.log(reason.message)
            })
    },[]);

    useEffect(() => {
        // Update the document title using the browser API
        axios.get('profiles/'+profile_id+'/educations').then( (res)=> {
            setEducations(res.data)

        })
            .catch((reason: AxiosError) => {
                if (reason.response!.status > 400 && reason.response!.status <500) {
                    // Handle 400
                    navigate("/login")
                } else {
                    // Handle else
                }
                console.log(reason.message)
            })
    },[]);


    useEffect(() => {
        // Update the document title using the browser API
        axios.get('profiles/'+profile_id).then( (res)=> {
            setProfile(res.data)

        })
    },[]);

    useEffect(() => {
        // Update the document title using the browser API
        axios.get('profiles/'+profile_id).then( (res)=> {
            if (res.data.type == "error") {
                if (isNaN(Number(profile_id))) {
                    console.log(profile_id)
                    // Update the document title using the browser API
                    axios.get('profile/'+profile_id+"/resume").then( (res2)=> {
                        if (res2.data.type == "error") {
                            //setErrorMessage(res.data.message);
                            //navigate("/404")
                            console.log(res2.data)
                        }
                        console.log("ASDASD", res2.data.resume)
                        return(<div>Welcome</div>)
                    })
                } else {
                    console.log("IS NAN")
                    setErrorMessage(res.data.message);
                    //navigate("/404")
                }
            }
            setProfile(res.data)
            if (profile.ID == 0) {
                return (<div>You do not own this!</div>)
            }
        })
    },[]);

    const makePublic = async (profileId: any) => {
        console.log(profileId)

        await axios.put('profile/'+profileId+"/url").then(res=> {
            if (res.data.type == "error") {
                setErrorMessage(res.data.message);
            } else{
                console.log(res.data)
                navigate("/public/profile/"+res.data.details)
                //window.location.reload();
            }
        })
    }

    const changeURL= async (profileId: any) => {
        console.log(profileId)

        await axios.put('profile/'+profileId+"/url").then(res=> {
            if (res.data.type == "error") {
                setErrorMessage(res.data.message);
            } else{
                console.log(res.data)
                navigate("/public/profile/"+res.data.details)
                //window.location.reload();
            }
        })
    }

    if (!experiences) {
        return (<div>Loading Experiences...</div>) ;
    }
    if (!educations) {
        return (<div>Loading Educations...</div>) ;
    }

    return (
    <div className="resume container-fluid">
        <header className="bg-primary bg-gradient text-white py-1">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 text-left text-md-center mb-3">
                        { errorMessage &&
                            <h5 className="error text-danger"> { errorMessage } </h5> }

                    </div>
                    <div className="col-md-4">
                        <h2>{profile.name}</h2>
                        <h5>{profile.heading}</h5>

                        <p className="border-top pt-3">{profile.description}</p>
                    </div>
                    <div className="col-md-2">
                        <div className="text-right">
                            <button type="button" onClick={()=>{makePublic(profile_id)}} className="btn btn-light">Make it public</button>
                        </div>
                    </div>

                    {profile.randomUnique != "" &&
                        <div className="col-md-2">
                            <input type="text" className="form-control" id="publicurl" name="publicurl"
                                   value={"http://localhost:3001/public/profile/" + profile.randomUnique}
                                   placeholder="Public URL"/>


                        <button data-toggle="tooltip" title="Old URL if shared will not work"
                        onClick={changeURL}
                        type="button" className="btn btn-danger tt blinker">Change URL</button>
                        </div>
                    }

                </div>

            </div>
        </header>
        <nav className="bg-dark text-white-50 mb-5">
            <div className="container">
                <div className="row p-3">
                    {profile.email_id ?
                        <div className="col-md pb-2 pb-md-0">
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-envelope"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                            </svg>
                            <a href="#" className="text-white ml-2">{profile.email_id}</a>
                        </div>
                    : null
                    }
                    {profile.website ?
                        <div className="col-md text-md-center pb-2 pb-md-0">
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-globe"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4H2.255a7.025 7.025 0 0 1 3.072-2.472 6.7 6.7 0 0 0-.597.933c-.247.464-.462.98-.64 1.539zm-.582 3.5h-2.49c.062-.89.291-1.733.656-2.5H3.82a13.652 13.652 0 0 0-.312 2.5zM4.847 5H7.5v2.5H4.51A12.5 12.5 0 0 1 4.846 5zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5H7.5V11H4.847a12.5 12.5 0 0 1-.338-2.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12H7.5v2.923c-.67-.204-1.335-.82-1.887-1.855A7.97 7.97 0 0 1 5.145 12zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11H1.674a6.958 6.958 0 0 1-.656-2.5h2.49c.03.877.138 1.718.312 2.5zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12h2.355a7.967 7.967 0 0 1-.468 1.068c-.552 1.035-1.218 1.65-1.887 1.855V12zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5h-2.49A13.65 13.65 0 0 0 12.18 5h2.146c.365.767.594 1.61.656 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4H8.5V1.077c.67.204 1.335.82 1.887 1.855.173.324.33.682.468 1.068z"/>
                            </svg>
                            <a href="#" className="text-white ml-2">{profile.website}</a>
                        </div>
                    : null
                    }
                    {profile.contact_number ?
                        <div className="col-md text-md-right">
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-telephone-fill"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/>
                            </svg>
                            <a href="#" className="text-white ml-2">{profile.contact_number}</a>
                        </div>
                    : null }
                </div>
            </div>
        </nav>

        <main className="container">
            {
                experiences.length>0 ?
                    <div className="row">
                        <div className="col-md mb-5">
                            <h2 className="mb-5">Work Experience</h2>

                            <ul>
                            {experiences.map( (experience,i) => (
                                <div key={i}>
                                    <FunctionalChild1  experience={experience}/>

                                </div>
                            ))}
                            </ul>


                        </div>
                        <div className="col-md mb-5">
                            <h2 className="mb-5">Education</h2>
                            <ul>

                                {educations.map( (education,i) => (
                                    <div key={i}>
                                        <EducationChild  education={education}/>

                                    </div>
                                ))}

                            </ul>
                        </div>
                    </div>
                : null
            }

            <div className="row">

                <div className="col-md">
                    <h2 className="mb-5">Recent Work</h2>
                    <div className="row">
                        <div className="col-md mb-3">
                            <a href="#">
                                <img className="img-fluid img-thumbnail" src="screenshot.png"/>
                            </a>
                        </div>
                        <div className="col-md mb-3">
                            <a href="#">
                                <img className="img-fluid img-thumbnail" src="screenshot.png"/>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md mb-3">
                            <a href="#">
                                <img className="img-fluid img-thumbnail" src="screenshot.png"/>
                            </a>
                        </div>
                        <div className="col-md mb-3">
                            <a href="#">
                                <img className="img-fluid img-thumbnail" src="screenshot.png"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer className="bg-dark text-white-50 text-center mt-5 p-3">
            &copy; 2020 Laura Collins - <a href="#" className="text-white-50">GitHub</a> | <a href="#"
                                                                                              className="text-white-50">LinkedIn</a> | <a
            href="#" className="text-white-50">Twitter</a>
        </footer>
    </div>

    );
}

export default FunctionalComponentResume;