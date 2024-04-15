import React, {  useEffect,useState } from 'react';
import {useNavigate} from "react-router-dom";
import BannerImage from "../assets/images/hero-banner.png"
import Navbar from '../components/navbar';

const HomePage = () => {
    const [authToken, setAuthToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the token exists in localStorage
        const authenticatedToken = localStorage.getItem("auth_token");
        if (authenticatedToken) setAuthToken(authenticatedToken);
        
      }, []);

    return (
        <>
            <Navbar authToken = {authToken}/>
            <section className="section hero" id="home" aria-label="hero">
                <div className="container flex justify-center items-center mx-auto my-8">
                    <div className="hero-content mr-8 ml-4">
                        <p className="hero-subtitle text-xl text-gray-600 mb-4">Rosemary and Jared Group</p>
                        <h1 className="h1 hero-title text-3xl md:text-5xl font-bold text-gray-900 mb-4">The power of Personalized Marketing</h1>
                        <p className="hero-text text-lg text-gray-800 mb-8">
                            Established in 2017 in the heart of California, USA, we have been on a mission to redefine the way businesses connect with their audiences globally.
                        </p>
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Start Working</button>
                        {/* You can add a button here if needed */}
                    </div>
                    <figure className="hero-banner">
                        <img src={BannerImage} width="720" height="673" alt="hero banner" className="w-100" />
                    </figure>
                </div>
            </section>
            <footer className="bg-gray-800 text-white text-center py-4">
                <p>&copy; {new Date().getFullYear()} R and J Group. All rights reserved.</p>
            </footer>
        </>
    );
};

export default HomePage;
