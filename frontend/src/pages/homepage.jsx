import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/images/hero-banner.png";
import Navbar from "../components/navbar";

const HomePage = () => {
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState({});
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("auth_token");
    window.location.reload();
  };

  useEffect(() => {
    const authenticatedToken = localStorage.getItem("auth_token");
    if (authenticatedToken) setAuthToken(authenticatedToken);
    // if (!authenticatedToken) navigate("/login");
    setShowContent(true);
    // if (authenticatedToken) handleFetchUser();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 180 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 overflow-hidden"
    >
      <Navbar authToken={authToken} handleLogOut={handleLogOut} />
      <AnimatePresence>
        {showContent && (
          <motion.div key="container" className="container mx-auto px-4 py-8">
            <section className="section hero">
              <div className="flex justify-center items-center my-8">
                <div className="hero-content mr-8 ml-4">
                  <p className="hero-subtitle text-xl text-gray-600 mb-4">
                    {user.firstName
                      ? `Welcome, ${user.firstName}`
                      : "Rosemary and Jared Group"}
                  </p>
                  <h1 className="h1 hero-title text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                    The power of Personalized Marketing
                  </h1>
                  <p className="hero-text text-lg text-gray-800 mb-8">
                    Established in 2017 in the heart of California, USA, we have
                    been on a mission to redefine the way businesses connect
                    with their audiences globally.
                  </p>
                  {/* <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                    Start Working
                  </button> */}
                  {/* You can add a button here if needed */}
                </div>
                <figure className="hero-banner">
                  <img
                    src={BannerImage}
                    width="720"
                    height="673"
                    alt="hero banner"
                    className="w-100"
                  />
                </figure>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="bg-gray-800 text-white text-center py-4 absolute bottom-0 w-full">
        <p>
          &copy; {new Date().getFullYear()} R and J Group. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
};

export default HomePage;
