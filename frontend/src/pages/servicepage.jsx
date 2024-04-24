import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, BotMessageSquare, MonitorDot, Megaphone, MailPlus, BadgeDollarSign } from "lucide-react";
import Navbar from "../components/navbar";

function Service() {
  const [authToken, setAuthToken] = useState("");

  const handleLogOut = () => {
    localStorage.removeItem("auth_token");
    window.location.reload();
  };

  useEffect(() => {
    // Check if the token exists in localStorage
    const authenticatedToken = localStorage.getItem("auth_token");
    if (authenticatedToken) setAuthToken(authenticatedToken);
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
      <section
        className="section service"
        id="service"
        aria-label="service bg-white"
      >
        <div className="container">
          <h2 className="h2 section-title text-center text-3xl font-bold mt-7">
            Services We Provide
          </h2>

          <p className="section-text text-center mt-5 ml-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.
          </p>

          <ul className="grid-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 ml-4 mr-4 mb-10 bg-gray">
            {/*service card 1*/}
            <li className="bg-gray-200 bg-opacity-50">
              <div className="service-card p-20 md:p-15 border border-platinum rounded-lg text-center shadow transition duration-300 service-card group hover:-translate-y-3 focus-within:-translate-y-3">
                <div
                  className="card-icon p-3 text-white text-25 max-w-max mx-auto p-18 rounded-full"
                  style={{ backgroundColor: "#13c4a1" }}
                >
                  <BotMessageSquare size={50}/>
                </div>
                <h3 className="h3">
                  <a href="#" className="card-title card-title my-20 mx-8">
                    SEO Optimization
                  </a>
                </h3>
                <p className="card-text text-base md:text-lg lg:text-xl">
                  Sed ut perspiciatis unde omnis iste natus error sit tatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae.
                </p>
              </div>
            </li>

            {/*service card 2*/}
            <li className="bg-gray-200 bg-opacity-50">
              <div className="service-card bg-white p-20 md:p-15 border border-platinum rounded-lg text-center shadow transition duration-300 service-card group hover:-translate-y-3 focus-within:-translate-y-3">
                <div
                  className="card-icon p-3 text-white text-25 max-w-max mx-auto p-18 rounded-full"
                  style={{ backgroundColor: "#6610f2" }}
                >
                  <MonitorDot size={50}/>
                </div>
                <h3 className="h3">
                  <a href="#" className="card-title card-title my-20 mx-8">
                    Digital Marketing
                  </a>
                </h3>
                <p className="card-text text-base md:text-lg lg:text-xl">
                  Sed ut perspiciatis unde omnis iste natus error sit tatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae.
                </p>
              </div>
            </li>

            {/*service card 3*/}
            <li className="bg-gray-200 bg-opacity-50">
              <div className="service-card bg-white p-20 md:p-15 border border-platinum rounded-lg text-center shadow transition duration-300 service-card group hover:-translate-y-3 focus-within:-translate-y-3">
                <div
                  className="card-icon p-3 text-white text-25 max-w-max mx-auto p-18 rounded-full"
                  style={{ backgroundColor: "#ffb700" }}
                >
                  <Lightbulb size={50} />
                </div>
                <h3 className="h3">
                  <a href="#" className="card-title card-title my-20 mx-8">
                    Market Research
                  </a>
                </h3>
                <p className="card-text text-base md:text-lg lg:text-xl">
                  Sed ut perspiciatis unde omnis iste natus error sit tatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae.
                </p>
              </div>
            </li>

            {/*service card 4*/}
            <li className="bg-gray-200 bg-opacity-50">
              <div className="service-card bg-white p-20 md:p-15 border border-platinum rounded-lg text-center shadow transition duration-300 service-card group hover:-translate-y-3 focus-within:-translate-y-3">
                <div
                  className="card-icon p-3 text-white text-25 max-w-max mx-auto p-18 rounded-full"
                  style={{ backgroundColor: "#fc3549" }}
                >
                  <Megaphone size={50}/>
                </div>
                <h3 className="h3">
                  <a href="#" className="card-title card-title my-20 mx-8">
                    Keyword Targeting
                  </a>
                </h3>
                <p className="card-text text-base md:text-lg lg:text-xl">
                  Sed ut perspiciatis unde omnis iste natus error sit tatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae.
                </p>
              </div>
            </li>

            {/*service card 5*/}
            <li className="bg-gray-200 bg-opacity-50">
              <div className="service-card bg-white p-20 md:p-15 border border-platinum rounded-lg text-center shadow transition duration-300 service-card group hover:-translate-y-3 focus-within:-translate-y-3">
                <div
                  className="card-icon p-3 text-white text-25 max-w-max mx-auto p-18 rounded-full"
                  style={{ backgroundColor: "#00d280" }}
                >
                  <MailPlus size={50}/>
                </div>
                <h3 className="h3">
                  <a href="#" className="card-title card-title my-20 mx-8">
                    Email Marketing
                  </a>
                </h3>
                <p className="card-text text-base md:text-lg lg:text-xl">
                  Sed ut perspiciatis unde omnis iste natus error sit tatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae.
                </p>
              </div>
            </li>

            {/*service card 6*/}
            <li className="bg-gray-200 bg-opacity-50">
              <div className="service-card bg-white p-20 md:p-15 border border-platinum rounded-lg text-center shadow transition duration-300 service-card group hover:-translate-y-3 focus-within:-translate-y-3">
                <div
                  className="card-icon p-3 text-white text-25 max-w-max mx-auto p-18 rounded-full"
                  style={{ backgroundColor: "#ff612f" }}
                >
                  <BadgeDollarSign size={50}/>
                </div>
                <h3 className="h3">
                  <a href="#" className="card-title card-title my-20 mx-8">
                    Marketing & Reporting
                  </a>
                </h3>
                <p className="card-text text-base md:text-lg lg:text-xl">
                  Sed ut perspiciatis unde omnis iste natus error sit tatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae.
                </p>
              </div>
            </li>
            {/* Add other service cards similarly */}
          </ul>
        </div>
      </section>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>
          &copy; {new Date().getFullYear()} R and J Group. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
}

export default Service;
