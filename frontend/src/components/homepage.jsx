// src/components/HomePage.js

import React from 'react';
import BannerImage from "../assets/images/hero-banner.png"

const HomePage = () => {
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/" className="text-white font-bold text-lg">R and J Group</a>
                    <ul className="flex">
                        <li className="mr-4">
                            <a href="/" className="text-white">Home</a>
                        </li>
                        
                        <li className="mr-4">
                            <a href="/projects" className="text-white">Projects</a>
                        </li>
                        <li className="mr-4">
                            <a href="/services" className="text-white">Services</a>
                        </li>

                        <li className="mr-4">
                            <a href="/about" className="text-white">About Us</a>
                        </li>
                        
                        <li className="mr-4">
                            <a href="/how-it-works" className="text-white">How it Works</a>
                        </li>
                        <li className="mr-4">
                            <a href="/faqs" className="text-white">FAQs</a>
                        </li>
                        <li className="mr-4">
                            <a href="/contact-us" className="text-white">Contact Us</a>
                        </li>
                        
                    </ul>
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Start Working</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="section hero" id="home" aria-label="hero">
                <div className="container flex justify-center items-center mx-auto my-8">
                    <div className="hero-content mr-8 ml-4">
                        <p className="hero-subtitle text-xl text-gray-600 mb-4">Rosemary and Jared Group</p>
                        <h1 className="h1 hero-title text-3xl md:text-5xl font-bold text-gray-900 mb-4">The power of Personalized Marketing</h1>
                        <p className="hero-text text-lg text-gray-800 mb-8">
                            Established in 2017 in the heart of California, USA, we have been on a mission to redefine the way businesses connect with their audiences globally.
                        </p>
                        {/* You can add a button here if needed */}
                    </div>
                    <figure className="hero-banner">
                        <img src={BannerImage} width="720" height="673" alt="hero banner" className="w-100" />
                    </figure>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
