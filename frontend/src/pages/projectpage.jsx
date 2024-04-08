// src/components/ProjectsPage.js

import React from 'react';
import project1Image from '../assets/images/project-1.jpg';
import project2Image from '../assets/images/project-2.jpg';
import project3Image from '../assets/images/project-3.jpg';
import project4Image from '../assets/images/project-4.jpg';
import project5Image from '../assets/images/project-5.jpg';
import project6Image from '../assets/images/project-6.jpg';

const ProjectsPage = () => {
    return (
        <section className="section project" id="project" aria-label="project">
            <div className="container">
                <h2 className="h2 section-title">Our Recent Projects</h2>
                <p className="section-text"></p>
                <ul className="grid-list">
                    <li className="">
                        <div className="project-card relative rounded-lg overflow-hidden">
                            <figure className="card-banner img-holder" style={{ '--width': '510', '--height': '700' }}>
                                <img src={project1Image} width="510" height="700" loading="lazy" alt="Designing a better cinema experience" className="img-cover" />
                            </figure>
                            <div className="card-content">
                                <p className="text-lavender-gray text-base leading-tight">SEO Optimization</p>
                                <div className="absolute bottom-0 left-0 right-0 p-5 bg-white z-10 transition duration-200"/>
                                <h3 className="text-white my-3 mx-4">
                                    <a href="#" className="text-white my-3 mx-4">Designing a better cinema experience</a>
                                </h3>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 transition duration-200 group-hover:opacity-80 focus-within:opacity-80"></div>
                        </div>      
                        <div className="project-card relative rounded-lg overflow-hidden">
                            <figure className="card-banner img-holder" style={{ '--width': '510', '--height': '700' }}>
                                <img src={project2Image} width="510" height="700" loading="lazy" alt="Designing a better cinema experience" className="img-cover" />
                            </figure>
                            <div className="card-content">
                                <p className="card-subtitle">SEO Optimization</p>
                                <h3 className="h3">
                                    <a href="#" className="card-title">Designing a better cinema experience</a>
                                </h3>
                            </div>
                        </div>
                        <div className="project-card relative rounded-lg overflow-hidden">
                            <figure className="card-banner img-holder" style={{ '--width': '510', '--height': '700' }}>
                                <img src={project3Image} width="510" height="700" loading="lazy" alt="Designing a better cinema experience" className="img-cover" />
                            </figure>
                            <div className="card-content">
                                <p className="card-subtitle">SEO Optimization</p>
                                <h3 className="h3">
                                    <a href="#" className="card-title">Designing a better cinema experience</a>
                                </h3>
                            </div>
                        </div>
                        <div className="project-card relative rounded-lg overflow-hidden">
                            <figure className="card-banner img-holder" style={{ '--width': '510', '--height': '700' }}>
                                <img src={project4Image} width="510" height="700" loading="lazy" alt="Designing a better cinema experience" className="img-cover" />
                            </figure>
                            <div className="card-content">
                                <p className="card-subtitle">SEO Optimization</p>
                                <h3 className="h3">
                                    <a href="#" className="card-title">Designing a better cinema experience</a>
                                </h3>
                            </div>
                        </div>
                        <div className="project-card relative rounded-lg overflow-hidden">
                            <figure className="card-banner img-holder" style={{ '--width': '510', '--height': '700' }}>
                                <img src={project5Image} width="510" height="700" loading="lazy" alt="Designing a better cinema experience" className="img-cover" />
                            </figure>
                            <div className="card-content">
                                <p className="card-subtitle">SEO Optimization</p>
                                <h3 className="h3">
                                    <a href="#" className="card-title">Designing a better cinema experience</a>
                                </h3>
                            </div>
                        </div>
                        <div className="project-card relative rounded-lg overflow-hidden">
                            <figure className="card-banner img-holder" style={{ '--width': '510', '--height': '700' }}>
                                <img src={project6Image} width="510" height="700" loading="lazy" alt="Designing a better cinema experience" className="img-cover" />
                            </figure>
                            <div className="card-content">
                                <p className="card-subtitle">SEO Optimization</p>
                                <h3 className="h3">
                                    <a href="#" className="card-title">Designing a better cinema experience</a>
                                </h3>
                            </div>
                        </div>
                    </li>
                    {/* Add more project items with similar structure */}
                </ul>
            </div>
        </section>
    );
};

export default ProjectsPage;
