import React from 'react';

const Carousel = () => {
    return (
        <div>
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"
                            aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                             aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <rect width="100%" height="100%" fill="#777"/>
                        </svg>

                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>Discover your Market with multiple profiles.</h1>
                                <p>Learn new technologies where you see skills and profile most in demand.</p>
                                <p><a className="btn btn-lg btn-primary" href="/register">Try it Out!</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                             aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <rect width="100%" height="100%" fill="#777"/>
                        </svg>

                        <div className="container">
                            <div className="carousel-caption">
                                <h1>Full Control</h1>
                                <p>You have full control to share/unshare/be hidden/annonymous and still discover market</p>
                                <p><a className="btn btn-lg btn-primary" href="/register">Try it Out!</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                             aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <rect width="100%" height="100%" fill="#777"/>
                        </svg>

                        <div className="container">
                            <div className="carousel-caption text-end">
                                <h1>No tracking</h1>
                                <p>No one can track you!</p>
                                <p><a className="btn btn-lg btn-primary" href="/register">Try it Out!</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    );
};

export default Carousel;