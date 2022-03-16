import React, {Component, SyntheticEvent} from 'react';
import axios from "axios";
import Layout from "../components/Layout";
import {Profile} from "../models/Profile";
import {Experience} from "../models/Experience";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import exp from "constants";
import { Link } from 'react-router-dom';
import {Education} from "../models/Education";


class Profiles extends Component {

    profiles : Profile[] = []
    experiences : Experience[] = []
    educations : Education[] = []
    state = {
        redirect : false,
        id: 0,
        name: '',
        heading: '',
        description : '',
        email_id: '',
        contact_number: '',
        website: '',
        active: true,
        errorMessage: '',
        openModal : false,
        message : '',
        openModalEditProfile : false,

        openModalAddExperience : false,
        currentlyEditProfileID : 0,
        experiences : this.experiences,

        openModalAddEducation: false,
        educations: this.educations
    }


    componentDidMount() {
        // code to run on component mount
        axios.get("profiles")
            .then(res => {
                this.profiles = res.data;
                this.forceUpdate()
            })

    }


    submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('profiles',{
            name : this.state.name,
            heading : this.state.heading,
            active : this.state.active,
            description: this.state.description,
            email_id: this.state.email_id,
            contact_number: this.state.contact_number,
            website: this.state.website
        }).then(res=>{
            console.log(res)

            if (res.data.type == "error") {
                this.setState({errorMessage: res.data.message});
                this.setState({name: ''})
            } else {
                this.setState({message: "Added New Profile Successfully!"})
                this.onCloseModal()
            }
            this.forceUpdate()

        })

    }
    openModel = (e: SyntheticEvent) => {
        e.preventDefault()
        this.setState({openModal: true})
    }

    onCloseModal = () => {
        this.setState({openModal: false})
        this.forceUpdate()
        window.location.reload();
    }

    removeProfile = async (profileId: Number) => {
        console.log(profileId)
        await axios.delete('profiles/'+profileId).then(res=>{
            if (res.data.type == "error") {
                this.setState({errorMessage: res.data.message});
                setTimeout(() => {
                    this.setState({errorMessage: ''});
                }, 2000);
            } else {
                window.location.reload();
            }
        })
    }

    editProfileOpen = async (profileId: Number) => {
        console.log(profileId)
        this.setState({openModalEditProfile: true})

        await axios.get('profiles/'+profileId).then(res=>{
            if (res.data.type == "error") {
                this.setState({errorMessage: res.data.message});
                setTimeout(() => {
                    this.setState({errorMessage: ''});
                }, 2000);
            } else {
                this.setState({name: res.data.name})
                this.setState({heading: res.data.heading})
                this.setState({description: res.data.description})
                this.setState({email_id: res.data.email_id})
                this.setState({contact_number: res.data.contact_number})
                this.setState({website: res.data.website})

                this.setState({id: profileId})
            }
        })
    }

    editProfileSave = async (e: SyntheticEvent, profileId: Number) => {
        e.preventDefault()
        console.log(profileId)
        await axios.put('profiles/'+profileId,{
            ID: profileId,
            name: this.state.name,
            heading : this.state.heading,
            description: this.state.description,
            email_id: this.state.email_id,
            contact_number: this.state.contact_number,
            website: this.state.website,
        }).then(res=>{
            if (res.data.type == "error") {
                this.setState({errorMessage: res.data.message});
                setTimeout(() => {
                    this.setState({errorMessage: ''});
                }, 2000);
            } else {
                window.location.reload();
            }
        })
    }

    addEmptyExperience = async (profile_id: number) => {
        const exp : Experience = {
            ID : 0,
            organization_name : '',
            role: '',
            description : '',
            profile_id : profile_id,
            end_date : '',
            start_date: '',
            active : true,
            created_at: ''

        }
        this.setState({experiences : [...this.state.experiences, exp]})
        //this.setState({experiences : [...(this.state.experiences ?? []),this.experience]})
    }
    //addEmptyEducation
    addEmptyEducation = async (profile_id: number) => {
        const edu : Education = {
            ID : 0,
            school: '',
            field_of_study: '',
            description: '',
            currently_studying: false,
            grade: '',
            end_date : '',
            start_date: '',
            profile_id: profile_id

        }
        this.setState({educations : [...this.state.educations, edu]})
        //this.setState({experiences : [...(this.state.experiences ?? []),this.experience]})
    }
    deleteExperience = async (e: SyntheticEvent,profile_id: number, experience_id: Number) => {
        e.preventDefault()
        let remainingExperiences: Experience[] = []

        this.state.experiences.map((ex:Experience)=>{

            if (ex.ID == experience_id) {
                console.log("Deleted ", ex.ID)
                axios.delete("profiles/"+profile_id + "/experiences/"+ex.ID)
                    .then((res)=>{
                        this.setState({message: "Deleted Experience Successfully!"})
                        setTimeout(() => {
                            this.setState({message: ''});
                        }, 2000);

                    })
            } else {
                remainingExperiences.push(ex)

            }
        })
        //console.log(remainingExperiences)
        this.setState({experiences : [...remainingExperiences]})
        //this.setState({experiences : [...this.state.experiences, exp]})

        //this.setState({experiences : [...(this.state.experiences ?? []),this.experience]})
    }
    //deleteEducation
    deleteEducation = async (e: SyntheticEvent,profile_id: number, education_id: Number) => {
        e.preventDefault()
        let remainingEducations: Education[] = []

        this.state.educations.map((edu:Education)=>{

            if (edu.ID == education_id) {
                console.log("Deleted ", edu.ID)
                axios.delete("profiles/"+profile_id + "/educations/"+edu.ID)
                    .then((res)=>{
                        this.setState({message: "Deleted Experience Successfully!"})
                        setTimeout(() => {
                            this.setState({message: ''});
                        }, 2000);

                    })
            } else {
                remainingEducations.push(edu)

            }
        })
        //console.log(remainingExperiences)
        this.setState({educations : [...remainingEducations]})
        //this.setState({experiences : [...this.state.experiences, exp]})

        //this.setState({experiences : [...(this.state.experiences ?? []),this.experience]})
    }


    getExperiences = async (e: SyntheticEvent, profileId: Number) => {
        e.preventDefault()
        console.log(profileId)
        await axios.get('profiles/'+profileId+'/experiences').then(res=>{
            if (res.data.type == "error") {
                this.setState({errorMessage: res.data.message});
                setTimeout(() => {
                    this.setState({errorMessage: ''});
                }, 2000);
            } else {

                this.setState({currentlyEditProfileID: profileId})
                //this.setState({experiences: res.data})
                //this.experiences = [...res.data]

                this.setState({experiences : [...(this.state.experiences ?? []),...res.data]})
                this.setState({openModalAddExperience : true})
            }
        })
    }

    getEducations = async (e: SyntheticEvent, profileId: Number) => {
        e.preventDefault()
        console.log(profileId)
        await axios.get('profiles/'+profileId+'/educations').then(res=>{
            if (res.data.type == "error") {
                this.setState({errorMessage: res.data.message});
                setTimeout(() => {
                    this.setState({errorMessage: ''});
                }, 2000);
            } else {

                this.setState({currentlyEditProfileID: profileId})
                //this.setState({experiences: res.data})
                //this.experiences = [...res.data]

                this.setState({educations : [...(this.state.educations ?? []),...res.data]})
                this.setState({openModalAddEducation : true})
            }
        })
    }


    saveExperiences = (e: SyntheticEvent, profileId: Number) => {
        e.preventDefault()
        console.log(profileId)
        console.log(this.state.experiences)

        this.state.experiences.map( experience=>{
            if (experience.ID === 0) {
            axios.post('profiles/'+profileId+'/experiences',{
                description : experience.description,
                organization_name: experience.organization_name,
                role: experience.role,
                start_date: experience.start_date,
                end_date: experience.end_date,
                profile_id : experience.profile_id,
            }).then(
                res=>{
                    if (res.data.type == "error") {
                        this.setState({errorMessage: res.data.message});
                        setTimeout(() => {
                            this.setState({errorMessage: ''});
                        }, 2000);
                    } else {
                        this.setState({message: "Modified Profile Successfully!"})
                    }
                }
            )
        } else {
                axios.put('profiles/'+profileId+'/experiences/'+experience.ID,{
                    description : experience.description,
                    organization_name: experience.organization_name,
                    role: experience.role,
                    start_date: experience.start_date,
                    end_date: experience.end_date,
                    profile_id : experience.profile_id,
                }).then(
                    res=>{
                        if (res.data.type == "error") {
                            this.setState({errorMessage: res.data.message});
                            setTimeout(() => {
                                this.setState({errorMessage: ''});
                            }, 2000);
                        } else {
                            this.setState({message: "Modified Profile Successfully!"})
                        }
                    }
                )
            }

        })
        window.location.reload();
    }


    saveEducations = (e: SyntheticEvent, profileId: Number) => {
        e.preventDefault()
        console.log(profileId)
        console.log(this.state.educations)

        this.state.educations.map( education=>{
            if (education.ID === 0) {
                axios.post('profiles/'+profileId+'/educations',{
                    school : education.school,
                    description : education.description,
                    field_of_study: education.field_of_study,
                    grade: education.grade,
                    currently_studying: education.currently_studying,
                    start_date: education.start_date,
                    end_date: education.end_date,
                    profile_id : education.profile_id,

                }).then(
                    res=>{
                        if (res.data.type == "error") {
                            this.setState({errorMessage: res.data.message});
                            setTimeout(() => {
                                this.setState({errorMessage: ''});
                            }, 2000);
                        } else {
                            this.setState({message: "Added New Education Successfully!"})
                        }
                    }
                )
            } else {
                axios.put('profiles/'+profileId+'/educations/'+education.ID,{
                    school : education.school,
                    description : education.description,
                    field_of_study: education.field_of_study,
                    grade: education.grade,
                    currently_studying: education.currently_studying,
                    start_date: education.start_date,
                    end_date: education.end_date,
                    profile_id : education.profile_id,
                }).then(
                    res=>{
                        if (res.data.type == "error") {
                            this.setState({errorMessage: res.data.message});
                            setTimeout(() => {
                                this.setState({errorMessage: ''});
                            }, 2000);
                        } else {
                            this.setState({message: "Modified Education Successfully!"})
                        }
                    }
                )
            }

        })
        window.location.reload();
    }


    render() {
        return (
            <Layout>
                <div>

                    <div className="row">

                        { this.state.message &&
                            <h5 className="error text-danger"> { this.state.message } </h5> }
                        { this.state.errorMessage &&
                            <h5 className="error text-danger"> { this.state.errorMessage } </h5> }
                        <div className="col-md-5 mb-4 d-flex justify-content-center">
                            <button type="button" className="btn btn-primary"  onClick={this.openModel}>Add New Profile</button>
                        </div>

                        <div className="col-xs-1 col-sm-2 col-md-5 col-lg-8 col-xl-10 mb-2 d-flex justify-content-center">
                            <div className="col-md-8">
                                {this.profiles.length > 0 ?
                                    <h2>
                                        Your Profiles!
                                    </h2>
                                : <h2>
                                       You do not have any profile Yet!!!
                                    </h2>
                                }
                            </div>
                        </div>
                    </div>



                    <div className="container">
                        <div className="row">

                            {this.profiles.map(profile=>{

                                return (
                                    <div className="col-lg-3 col-md-4 col-sm-6 mb-3 mr-0 d-flex align-items-stretch" key={profile.ID}>
                                        <div className="card mr-0" >

                                            <DropdownButton
                                                title=""
                                                id="dropdown-menu-align-right"
                                            >
                                                <Dropdown.Item eventKey="option-1">
                                                    <a onClick={() => this.removeProfile(profile.ID)}  className="btn btn-primary">REMOVE{profile.active}</a>
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="option-2">
                                                    <a onClick={() => this.editProfileOpen(profile.ID)}  className="btn btn-primary">EDIT{profile.active}</a>
                                                </Dropdown.Item>




                                                <Dropdown.Item eventKey="option-3">Settings</Dropdown.Item>

                                            </DropdownButton>



                                            <div className="card-body">


                                                <h5 className="card-title">{profile.name}</h5>

                                                <Link to={`/profile/${profile.ID}`} target="_blank">
                                                    FULL PROFILE
                                                </Link>


                                                <p className="card-text">{profile.heading}</p>
                                                <div className="btn-toolbar">

                                                    <a onClick={(e) => this.getExperiences(e,profile.ID)}  className="btn btn-primary mr-2 mb-2">Add/Remove Experience{profile.active}</a>
                                                    <a onClick={(e) => this.getEducations(e,profile.ID)}  className="btn btn-primary mr-2 mb-2">Add/Remove Education{profile.active}</a>

                                                </div>


                                            </div>


                                        </div>
                                    </div>
                                )

                            })}

                        </div>

                    </div>



                    <div   className="modal fade"  id="staticBackdrop" aria-labelledby="exampleModalLabel"

                           aria-hidden="true">

                    <div className="modal-dialog">
                        <div className="modal-content">

                    <Modal open={this.state.openModal} onClose={this.onCloseModal} classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                    }}>

                        <div className="modal-header">
                            <div className="row">
                                <div>
                                <h5 className="modal-title" id="exampleModalLabel">Add New Profile Form</h5>
                                </div>
                                <div>
                            { this.state.errorMessage &&
                                <h5 className="error text-danger"> { this.state.errorMessage } </h5> }
                                </div>
                            </div>
                        </div>

                        <form onSubmit={this.submit} >
                            <div className="mb-3">
                                <label className="form-label">Profile Name</label>
                                <input type="text" className="form-control" id="profilename" name="profilename"

                                       onChange={e => {this.setState({name: e.target.value});this.setState({errorMessage :false})}}
                                       placeholder="Profile Name"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Profile Heading</label>
                                <input type="text" className="form-control" id="profileheading" name="profileheading"
                                       onChange={e => {this.setState({heading: e.target.value})}}
                                       placeholder="Profile Heading"/>
                            </div>


                            <div className="mb-3">
                                <label className="form-label">Profile Description</label>
                                <input type="text" className="form-control" id="profiledescription" name="profiledescription"
                                       onChange={e => {this.setState({description: e.target.value})}}
                                       placeholder="Profile Description"/>
                            </div>


                            <div className="mb-3">
                                <label className="form-label">Email Id</label>
                                <input type="text" className="form-control" id="email" name="email"
                                       value = {this.state.email_id}
                                       onChange={e => {this.setState({email_id: e.target.value})}}
                                       placeholder="Email id for this profile"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input type="text" className="form-control" id="contact_number" name="contact_number"
                                       value = {this.state.contact_number}
                                       onChange={e => {this.setState({contact_number: e.target.value})}}
                                       placeholder="Phone number for this profile"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Personal Website</label>
                                <input type="text" className="form-control" id="website" name="website"
                                       value = {this.state.website}
                                       onChange={e => {this.setState({website: e.target.value})}}
                                       placeholder="Personal Website"/>
                            </div>

                            <div className="modal-footer d-block">
                                <button type="submit" value={"submit"} className="btn btn-warning float-end">Submit</button>
                            </div>
                        </form>
                    </Modal>
                        </div>
                    </div>

                    </div>






                    <div   className="modal fade"  aria-labelledby="exampleModalLabel"

                           aria-hidden="true">

                        <div className="modal-dialog">
                            <div className="modal-content">

                                <Modal open={this.state.openModalEditProfile} onClose={this.onCloseModal}
                                       classNames={{
                                           overlay: 'customOverlay',
                                           modal: 'customModal',
                                       }}>

                                    <div className="modal-header">
                                        <div className="row">
                                            <div>
                                                <h5 className="modal-title" id="exampleModalLabel">Edit Profile Form</h5>
                                            </div>
                                            <div>
                                                { this.state.errorMessage &&
                                                    <h5 className="error text-danger"> { this.state.errorMessage } </h5> }
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={(e)=> this.editProfileSave(e,this.state.id)}  >
                                        <div className="mb-3">
                                            <label className="form-label">Profile Name</label>
                                            <input type="text" className="form-control" id="profilename" name="profilename"
                                                    value = {this.state.name}
                                                   onChange={e => {this.setState({name: e.target.value});this.setState({errorMessage :false})}}
                                                   placeholder="Profile Name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Profile Heading</label>
                                            <input type="text" className="form-control" id="profileheading" name="profileheading"
                                                   value = {this.state.heading}
                                                   onChange={e => {this.setState({heading: e.target.value})}}
                                                   placeholder="Profile Heading"/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Profile Description</label>
                                            <input type="text" className="form-control" id="profiledescription" name="profiledescription"
                                                   value = {this.state.description}
                                                   onChange={e => {this.setState({description: e.target.value})}}
                                                   placeholder="Profile Description"/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Email Id</label>
                                            <input type="text" className="form-control" id="email" name="email"
                                                   value = {this.state.email_id}
                                                   onChange={e => {this.setState({email_id: e.target.value})}}
                                                   placeholder="Email id for this profile"/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Phone Number</label>
                                            <input type="text" className="form-control" id="contact_number" name="contact_number"
                                                   value = {this.state.contact_number}
                                                   onChange={e => {this.setState({contact_number: e.target.value})}}
                                                   placeholder="Phone number for this profile"/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Personal Website</label>
                                            <input type="text" className="form-control" id="website" name="website"
                                                   value = {this.state.website}
                                                   onChange={e => {this.setState({website: e.target.value})}}
                                                   placeholder="Personal Website"/>
                                        </div>

                                        <div className="modal-footer d-block">
                                            <button type="submit" value={"submit"} className="btn btn-warning float-end">Save</button>
                                        </div>
                                    </form>
                                </Modal>
                            </div>
                        </div>

                    </div>
















                    <div   className="modal fade"  aria-labelledby="exampleModalLabel"
                           aria-hidden="true">

                        <div className="modal-dialog">
                            <div className="modal-content">

                                <Modal open={this.state.openModalAddExperience} onClose={this.onCloseModal}
                                       classNames={{
                                           overlay: 'customOverlay',
                                           modal: 'customModal',
                                       }}>
                                    <div className="modal-header">

                                        <div className="row">
                                            <h4>Editing Profile Id: {this.state.currentlyEditProfileID}</h4>

                                            <div>
                                                { this.state.errorMessage &&
                                                    <h5 className="error text-danger"> { this.state.errorMessage } </h5> }
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={(e)=> this.saveExperiences(e,this.state.currentlyEditProfileID)}  >

                                        {this.state.experiences.map( (ex, index)=> {


                                                return (
                                                <div key={ex.ID} >


                                                    <a href={"#experience"+index} className="btn btn-light" data-bs-toggle="collapse"
                                                       aria-expanded="false" aria-controls={"experience"+index}>
                                                        Experience - {index+1}
                                                    </a>


                                                    <div className="collapse" id={"experience"+index}>
                                                        <div className="border-top my-1"></div>



                                                        <div className="mb-3">
                                                            <label className="form-label">Company/Org Name</label>
                                                            <input type="text" className="form-control" id="company" name="company"
                                                                   value = {ex.organization_name}
                                                                   onChange={e => {ex.organization_name =  e.target.value; this.setState({errorMessage :false})}}
                                                                   placeholder="Company Name"/>
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="form-label">Role/Designation</label>
                                                            <input type="text" className="form-control" id="role" name="role"
                                                                   value = {ex.role}
                                                                   onChange={e => {ex.role =  e.target.value; this.setState({errorMessage :false})}}
                                                                   placeholder="Your Role"/>
                                                        </div>
                                                        <label className="form-label">Job Description</label>
                                                    <textarea rows={5} className="form-control" id="description" name="description"
                                                           value = {ex.description}
                                                           onChange={e => {ex.description = e.target.value;this.setState({errorMessage :false})}}
                                                           placeholder="Detailed Description"/>






                                                    <div className="mb-3">
                                                        <label className="form-label">Start Date</label>
                                                        <input type="date" className="form-control" id="start_date" name="start_date"
                                                               value = {ex.start_date}
                                                               min="1955-01-01"
                                                               onChange={e => {ex.start_date =  e.target.value; this.setState({errorMessage :false})}}
                                                               placeholder="Start Date"/>
                                                    </div>


                                                    <div className="mb-3">
                                                        <label className="form-label">End Date</label>
                                                        <input type="date" className="form-control" id="end_date" name="end_date"
                                                               value = {ex.end_date}
                                                               min="1955-01-01"
                                                               onChange={e => {ex.end_date =  e.target.value; this.setState({errorMessage :false})}}
                                                               placeholder="End Date"/>
                                                    </div>
                                                    <div className="border-top my-1"></div>

                                                    <button
                                                        onClick={(e:SyntheticEvent) => this.deleteExperience(e,this.state.currentlyEditProfileID, ex.ID)}
                                                    ><i className="glyphicon glyphicon-plus-sign"> - DELETE This Experience</i></button>

                                                    </div>
                                                </div>


                                            )
                                        }
                                        )
                                        }
                                        <a
                                            onClick={() => this.addEmptyExperience(this.state.currentlyEditProfileID)}
                                        ><i className="glyphicon glyphicon-plus-sign">+Add Experience</i></a>

                                        <div className="modal-footer d-block">
                                            <button type="submit" value={"submit"} className="btn btn-warning float-end">Save</button>
                                        </div>



                                    </form>
                                </Modal>
                            </div>
                        </div>

                    </div>









                    <div   className="modal fade"  aria-labelledby="exampleModalLabel"
                           aria-hidden="true">

                        <div className="modal-dialog">
                            <div className="modal-content">

                                <Modal open={this.state.openModalAddEducation} onClose={this.onCloseModal}
                                       classNames={{
                                           overlay: 'customOverlay',
                                           modal: 'customModal',
                                       }}>
                                    <div className="modal-header">

                                        <div className="row">
                                            <h4>Editing Education Profile Id: {this.state.currentlyEditProfileID}</h4>

                                            <div>
                                                { this.state.errorMessage &&
                                                    <h5 className="error text-danger"> { this.state.errorMessage } </h5> }
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={(e)=> this.saveEducations(e,this.state.currentlyEditProfileID)}  >

                                        {this.state.educations.map( (ed, index)=> {


                                                return (
                                                    <div key={ed.ID}>


                                                        <a href={"#education"+index} className="btn btn-light" data-bs-toggle="collapse"
                                                           aria-expanded="false" aria-controls={"education"+index}>
                                                            Education - {index+1}
                                                        </a>


                                                        <div className="collapse" id={"education"+index}>
                                                            <div className="border-top my-1"></div>



                                                            <div className="mb-3">
                                                                <label className="form-label">School/College Name</label>
                                                                <input type="text" className="form-control" id="school" name="school"
                                                                       value = {ed.school}
                                                                       onChange={e => {ed.school =  e.target.value; this.setState({errorMessage :false})}}
                                                                       placeholder="School Name"/>
                                                            </div>

                                                            <div className="mb-3">
                                                                <label className="form-label">Field Of Study</label>
                                                                <input type="text" className="form-control" id="field" name="field"
                                                                       value = {ed.field_of_study}
                                                                       onChange={e => {ed.field_of_study =  e.target.value; this.setState({errorMessage :false})}}
                                                                       placeholder="Field Of Study"/>
                                                            </div>
                                                            <label className="form-label">Course Description</label>
                                                            <textarea rows={5} className="form-control" id="description" name="description"
                                                                      value = {ed.description}
                                                                      onChange={e => {ed.description = e.target.value;this.setState({errorMessage :false})}}
                                                                      placeholder="Detailed Description"/>



                                                            <label className="form-label">Marks/CGPA/Grade</label>
                                                            <input className="form-control" id="grade" name="grade"
                                                                      value = {ed.grade}
                                                                      onChange={e => {ed.grade = e.target.value;this.setState({errorMessage :false})}}
                                                                      placeholder="Grade"/>


                                                            <div className="mb-3">
                                                                <label className="form-label">Start Date</label>
                                                                <input type="date" className="form-control" id="start_date" name="start_date"
                                                                       value = {ed.start_date}
                                                                       min="1955-01-01"
                                                                       onChange={e => {ed.start_date =  e.target.value; this.setState({errorMessage :false})}}
                                                                       placeholder="Start Date"/>
                                                            </div>


                                                            <div className="mb-3">
                                                                <label className="form-label">End Date</label>
                                                                <input type="date" className="form-control" id="end_date" name="end_date"
                                                                       value = {ed.end_date}
                                                                       min="1955-01-01"
                                                                       onChange={e => {ed.end_date =  e.target.value; this.setState({errorMessage :false})}}
                                                                       placeholder="End Date"/>
                                                            </div>
                                                            <div className="border-top my-1"></div>

                                                            <button
                                                                onClick={(e:SyntheticEvent) => this.deleteEducation(e,this.state.currentlyEditProfileID, ed.ID)}
                                                            ><i className="glyphicon glyphicon-plus-sign"> - DELETE This Education</i></button>

                                                        </div>
                                                    </div>


                                                )
                                            }
                                        )
                                        }
                                        <a
                                            onClick={() => this.addEmptyEducation(this.state.currentlyEditProfileID)}
                                        ><i className="glyphicon glyphicon-plus-sign">+Add Education</i></a>

                                        <div className="modal-footer d-block">
                                            <button type="submit" value={"submit"} className="btn btn-warning float-end">Save</button>
                                        </div>



                                    </form>
                                </Modal>
                            </div>
                        </div>

                    </div>



                </div>
            </Layout>
        );
    }
}

export default Profiles;