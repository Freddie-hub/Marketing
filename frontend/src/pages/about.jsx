import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import aboutImage from "../assets/images/about.jpeg";

const AboutSection = () => {
  const [authToken, setAuthToken] = useState("");
  const handleLogOut = () => {
    localStorage.removeItem("auth_token");
    window.location.reload();
  };

  useEffect(() => {
    const authenticatedToken = localStorage.getItem("auth_token");
    if (authenticatedToken) setAuthToken(authenticatedToken);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 180 }}
      transition={{duration: 1}}
      className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 overflow-hidden"
    >
      <Navbar authToken={authToken} handleLogOut={handleLogOut} />
      <section className="flex flex-wrap items-center justify-center p-8">
        <div className="w-full lg:w-1/2">
          <div className="lg:mx-8 mb-8 lg:mb-0">
            <div className="">
              <img src={aboutImage} alt="About Banner" className="rounded-lg z-0" />
              {/* <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4">
              </button> */}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="lg:mx-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About Us
            </h2>
            <p className="text-lg text-gray-700 mb-6">
            Rosemary and Jared Group, founded in 2017, pioneers personalized marketing, forging deep connections between brands and consumers through innovation and strategic excellence.            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Who We Are</h3>
            <p className="text-lg text-gray-700 mb-6">
            Rosemary and Jared Group, established in 2017, is a trailblazing force in personalized marketing, dedicated to reshaping brand-consumer relationships through innovation and strategic prowess.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Success</h3>
            <ul className="list-disc ml-6">
              <li className="text-lg text-gray-700 mb-2">
              Innovative Approach: Pioneering personalized marketing strategies that resonate deeply with audiences, driving engagement and loyalty.
              </li>
              <li className="text-lg text-gray-700 mb-2">
              Client-Centric Philosophy: Prioritizing client success through transparent communication, collaboration, and tailored solutions.
              </li>
              <li className="text-lg text-gray-700 mb-2">
              Delivering measurable outcomes across diverse industries, from startups to established enterprises, through our personalized marketing expertise.
              </li>
            </ul>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-lg text-gray-700 mb-6">
            Pioneering personalized marketing, we strive to redefine brand-consumer connections through innovative strategies and authentic experiences that drive engagement and loyalty.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>
          &copy; {new Date().getFullYear()} R and J Group. All rights
          reserved.
        </p>
      </footer>
    </motion.div>
  );
};

export default AboutSection;
