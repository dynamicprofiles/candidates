import React from 'react';
import Carousel from "../components/Carousel";
import Layout from "../components/Layout";

const Main = () => {


    return (
        <Layout>
        <div>
            <Carousel/>

            <div className="container marketing">


                <div className="row">
                    <div className="col-lg-4">
                        <svg className="bd-placeholder-img rounded-circle" width="140" height="140"
                             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Create Multiple Profiles</title>
                            <rect width="100%" height="100%" fill="#777"/>
                            <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                        </svg>

                        <h2>Profiles</h2>
                        <p>Create multiple profiles and explore the unexplored!</p>
                        <p><a className="btn btn-secondary" href="/register">Try it Out! &raquo;</a></p>
                    </div>

                    <div className="col-lg-4">
                        <svg className="bd-placeholder-img rounded-circle" width="140" height="140"
                             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Add Experience</title>
                            <rect width="100%" height="100%" fill="#777"/>
                            <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                        </svg>

                        <h2>Experience</h2>
                        <p>Add relavant experience to your profile as per your marketability</p>
                        <p><a className="btn btn-secondary" href="/register">Try it Out! &raquo;</a></p>
                    </div>

                    <div className="col-lg-4">
                        <svg className="bd-placeholder-img rounded-circle" width="140" height="140"
                             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Make it Public</title>
                            <rect width="100%" height="100%" fill="#777"/>
                            <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                        </svg>

                        <h2>Publish</h2>
                        <p>Let everyone know about your new profile, your details will be hidden
                            You can change URL anytime.</p>
                        <p><a className="btn btn-secondary" href="/register">Try it Out! &raquo;</a></p>
                    </div>

                </div>


                <hr className="featurette-divider"/>

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It’ll blow your mind.</span>
                        </h2>
                        <p className="lead">Some great placeholder content for the first featurette here. Imagine some exciting
                            prose here.</p>
                    </div>
                    <div className="col-md-5">
                        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
                             height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#eee"/>
                            <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                        </svg>

                    </div>
                </div>

                <hr className="featurette-divider"/>

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">Oh yeah, it’s that good. <span className="text-muted">See for yourself.</span>
                        </h2>
                        <p className="lead">Another featurette? Of course. More placeholder content here to give you an idea
                            of how this layout would work with some actual real-world content in place.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                             width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                             aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#eee"/>
                            <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                        </svg>

                    </div>
                </div>

                <hr className="featurette-divider"/>

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">And lastly, this one. <span
                            className="text-muted">Checkmate.</span></h2>
                        <p className="lead">And yes, this is the last block of representative placeholder content. Again,
                            not really intended to be actually read, simply here to give you a better view of what this would
                            look like with some actual content. Your content.</p>
                    </div>
                    <div className="col-md-5">
                        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                             width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                             aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#eee"/>
                            <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                        </svg>

                    </div>
                </div>

                <hr className="featurette-divider"/>




            </div>
        </div>
        </Layout>
    );
};

export default Main;