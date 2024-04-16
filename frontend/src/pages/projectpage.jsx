import React, { useEffect,useState } from "react";
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
    // setAuthToken("");
    window.location.reload();
  };
  useEffect(() => {
    // Check if the token exists in localStorage
    const authenticatedToken = localStorage.getItem("auth_token");
    if (authenticatedToken) setAuthToken(authenticatedToken);
  }, []);

  return (
    <div>
      <Navbar authToken={authToken} handleLogOut={handleLogOut} />
      <section className="section project" id="project" aria-label="project">
        <div className="container">
          <h2 className="text-center text-3xl font-bold mt-7">
            Our Recent Projects
          </h2>
          <p className="section-text"></p>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 ml-4 mr-4 mb-10">
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder">
                  <img
                    src={project1Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-content">
                  <p className="text-lavender-gray text-base leading-tight">
                    SEO Optimization
                  </p>
                  <h3 className="text-black">
                    <a href="#" className="text-black">
                      Designing a better cinema experience
                    </a>
                  </h3>
                </div>
              </div>
            </li>
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder">
                  <img
                    src={project2Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-content">
                  <p className="text-lavender-gray text-base leading-tight">
                    SEO Optimization
                  </p>
                  <h3 className="text-black">
                    <a href="#" className="text-black">
                      Designing a better cinema experience
                    </a>
                  </h3>
                </div>
              </div>
            </li>
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder">
                  <img
                    src={project3Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-content">
                  <p className="text-lavender-gray text-base leading-tight">
                    SEO Optimization
                  </p>
                  <h3 className="text-black">
                    <a href="#" className="text-black">
                      Designing a better cinema experience
                    </a>
                  </h3>
                </div>
              </div>
            </li>
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder">
                  <img
                    src={project4Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-content">
                  <p className="text-lavender-gray text-base leading-tight">
                    SEO Optimization
                  </p>
                  <h3 className="text-black">
                    <a href="#" className="text-black">
                      Designing a better cinema experience
                    </a>
                  </h3>
                </div>
              </div>
            </li>
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder">
                  <img
                    src={project5Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-content">
                  <p className="text-lavender-gray text-base leading-tight">
                    SEO Optimization
                  </p>
                  <h3 className="text-black">
                    <a href="#" className="text-black">
                      Designing a better cinema experience
                    </a>
                  </h3>
                </div>
              </div>
            </li>
            <li>
              <div className="project-card relative rounded-lg overflow-hidden">
                <figure className="card-banner img-holder">
                  <img
                    src={project6Image}
                    loading="lazy"
                    alt="Designing a better cinema experience"
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-content">
                  <p className="text-lavender-gray text-base leading-tight">
                    SEO Optimization
                  </p>
                  <h3 className="text-black">
                    <a href="#" className="text-black">
                      Designing a better cinema experience
                    </a>
                  </h3>
                </div>
              </div>
            </li>
            {/* Add more project cards here */}
          </ul>
          <footer className="bg-gray-800 text-white text-center py-4">
            <p>
              &copy; {new Date().getFullYear()} R and J Group. All rights
              reserved.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
