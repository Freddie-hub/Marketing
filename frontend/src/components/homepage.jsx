// src/components/HomePage.js

import React from 'react';

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
                            <a href="/about" className="text-white">About Us</a>
                        </li>
                        <li className="mr-4">
                            <a href="/projects" className="text-white">Projects</a>
                        </li>
                        <li className="mr-4">
                            <a href="/faqs" className="text-white">FAQs</a>
                        </li>
                        <li className="mr-4">
                            <a href="/how-it-works" className="text-white">How it Works</a>
                        </li>
                        <li className="mr-4">
                            <a href="/contact-us" className="text-white">Contact Us</a>
                        </li>
                        <li>
                            <a href="/services" className="text-white">Services</a>
                        </li>
                    </ul>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Working</button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-4">Welcome to R and J Group</h1>
                <p className="text-lg mb-4">We are a leading organization dedicated to providing top-notch services in various domains.</p>
                <p className="text-lg mb-4">Explore our website to learn more about our projects, services, and how we work.</p>
                <p className="text-lg">Ready to start your project with us? Click the button below!</p>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                <div className="container mx-auto">
                    <p>&copy; 2024 R and J Group. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
