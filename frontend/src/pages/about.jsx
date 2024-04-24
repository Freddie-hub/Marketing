import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import aboutImage from "../assets/images/about-banner.jpg";

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
      transition={{duration: 2}}
      className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 overflow-hidden"
    >
      <Navbar authToken={authToken} handleLogOut={handleLogOut} />
      <section className="flex flex-wrap items-center justify-center p-8">
        <div className="w-full lg:w-1/2">
          <div className="lg:mx-8 mb-8 lg:mb-0">
            <div className="relative">
              <img src={aboutImage} alt="About Banner" className="rounded-lg" />
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              sagittis egestas ante, sed viverra nunc tincidunt nec.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Who We Are</h3>
            <p className="text-lg text-gray-700 mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Success</h3>
            <ul className="list-disc ml-6">
              <li className="text-lg text-gray-700 mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
              <li className="text-lg text-gray-700 mb-2">
                It is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout.
              </li>
              <li className="text-lg text-gray-700 mb-2">
                Contrary to popular belief, Lorem Ipsum is not simply random text.
                It has roots in a piece of classical Latin literature.
              </li>
            </ul>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-lg text-gray-700 mb-6">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in.
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
