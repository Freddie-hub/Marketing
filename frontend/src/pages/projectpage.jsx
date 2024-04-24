import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import project1Image from "../assets/images/project-1.jpg";
import project2Image from "../assets/images/project-2.jpg";
import project3Image from "../assets/images/project-3.jpg";
import project4Image from "../assets/images/project-4.jpg";
import project5Image from "../assets/images/project-5.jpg";
import project6Image from "../assets/images/project-6.jpg";
import Navbar from "../components/navbar";

const ProjectsPage = () => {
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
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 overflow-hidden relative"
    >
      <Navbar authToken={authToken} handleLogOut={handleLogOut} />
      <section className="section project" id="project" aria-label="project">
        <div className="container">
          <h2 className="text-center text-3xl font-bold mt-7">
            Our Recent Projects
          </h2>
          <p className="section-text"></p>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 ml-4 mr-4 mb-20">
            {/* Project 1 */}
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder relative">
                  <img
                    src={project1Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between items-center text-center z-10">
                    <div className="absolute top-10 left-0 right-0 mt-3">
                      <p className="text-lavender-gray text-base leading-tight">
                        SEO Optimization
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-blue">
                          Designing a better cinema experience
                        </a>
                      </h3>
                    </div>
                  </div>
                  <div className="image-overlay absolute inset-0 bg-blue opacity-50"></div>
                </figure>
              </div>
            </li>

            {/* Project 2 */}
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder relative">
                  <img
                    src={project2Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between items-center text-center z-10">
                    <div className="absolute top-10 left-0 right-0 mt-3">
                      <p className="text-lavender-gray text-base leading-tight">
                        SEO Optimization
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-blue">
                          Designing a better cinema experience
                        </a>
                      </h3>
                    </div>
                  </div>
                  <div className="image-overlay absolute inset-0 bg-blue opacity-50"></div>
                </figure>
              </div>
            </li>

            {/* Project 3 */}
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder relative">
                  <img
                    src={project3Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between items-center text-center z-10">
                    <div className="absolute top-10 left-0 right-0 mt-3">
                      <p className="text-lavender-gray text-base leading-tight">
                        SEO Optimization
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-blue">
                          Designing a better cinema experience
                        </a>
                      </h3>
                    </div>
                  </div>
                  <div className="image-overlay absolute inset-0 bg-blue opacity-50"></div>
                </figure>
              </div>
            </li>

            {/* Project 4 */}
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder relative">
                  <img
                    src={project4Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between items-center text-center z-10">
                    <div className="absolute top-10 left-0 right-0 mt-3">
                      <p className="text-lavender-gray text-base leading-tight">
                        SEO Optimization
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-blue">
                          Designing a better cinema experience
                        </a>
                      </h3>
                    </div>
                  </div>
                  <div className="image-overlay absolute inset-0 bg-blue opacity-50"></div>
                </figure>
              </div>
            </li>

            {/* Project 5 */}
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder relative">
                  <img
                    src={project5Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between items-center text-center z-10">
                    <div className="absolute top-10 left-0 right-0 mt-3">
                      <p className="text-lavender-gray text-base leading-tight">
                        SEO Optimization
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-blue">
                          Designing a better cinema experience
                        </a>
                      </h3>
                    </div>
                  </div>
                  <div className="image-overlay absolute inset-0 bg-blue opacity-50"></div>
                </figure>
              </div>
            </li>

            {/* Project 6 */}
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder relative">
                  <img
                    src={project6Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between items-center text-center z-10">
                    <div className="absolute top-10 left-0 right-0 mt-3">
                      <p className="text-lavender-gray text-base leading-tight">
                        SEO Optimization
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-blue">
                          Designing a better cinema experience
                        </a>
                      </h3>
                    </div>
                  </div>
                  <div className="image-overlay absolute inset-0 bg-blue opacity-50"></div>
                </figure>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <footer className="bg-gray-800 mt-4 text-white text-center py-4 absolute bottom-0 w-full">
        <p>
          &copy; {new Date().getFullYear()} R and J Group. All rights
          reserved.
        </p>
      </footer>
    </motion.div>
  );
};

export default ProjectsPage;
