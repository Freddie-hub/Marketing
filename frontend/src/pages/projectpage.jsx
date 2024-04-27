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
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold mt-7 text-black">
            Our Recent Projects
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 mb-20">
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
                      <p className="text-lavender-gray text-white font-bold text-2xl leading-tight">
                        Personalized E-commerce Campaigns
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-white font-bold text-2xl">
                          Customized promotions for online shoppers, ensuring tailored offers based on preferences and purchase history for enhanced conversion and satisfaction.
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
                      <p className="text-lavender-gray text-white font-bold text-2xl leading-tight">
                        Global Brand Expansion
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-white font-bold text-2xl">
                          Market analysis and localization strategies for seamless international entry, driving sustained growth and recognition across diverse markets.
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
                      <p className="text-lavender-gray text-white font-bold text-2xl leading-tight">
                        AI-driven Customer Segmentation
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-white font-bold text-2xl">
                          Advanced algorithms for precise customer demographics, enabling hyper-targeted strategies to maximize engagement, conversion, and loyalty.
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
                      <p className="text-lavender-gray text-white font-bold text-2xl leading-tight">
                        Search Engine Optimization (SEO)
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-white font-bold text-2xl">
                          Elevating online visibility through strategic keyword optimization, content enhancement, and technical improvements, driving organic traffic and boosting website rankings effectively.
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
                      <p className="text-lavender-gray text-white font-bold text-2xl leading-tight">
                        Pay-Per-Click Advertising (PPC)
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-white font-bold text-2xl">
                          Implementing targeted ad campaigns to maximize ROI, leveraging precise audience targeting, compelling ad copy, and strategic bidding strategies for optimal results and conversion rates.
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
                    className="object-cover w-full h-800"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between items-center text-center z-10">
                    <div className="absolute top-10 left-0 right-0 mt-3">
                      <p className="text-lavender-gray text-white font-bold text-2xl leading-tight">
                        Email Marketing Automation
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-3">
                      <h3 className="text-blue">
                        <a href="#" className="text-white font-bold text-2xl">
                          Deploying automated email campaigns for personalized customer interactions, nurturing leads, and driving conversions through tailored content delivery and strategic engagement workflows.
                        </a>
                      </h3>
                    </div>
                  </div>
                  <div className="image-overlay absolute inset-0 bg-blue opacity-50"></div>
                </figure>
              </div>
            </li>
            {/* Add more projects here */}
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
