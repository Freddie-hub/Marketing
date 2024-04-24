import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion for animations
import Navbar from "../components/navbar";
import whatsappIcon from "../assets/images/whatsapp.jpeg";
import facebookIcon from "../assets/images/facebook.jpeg";

function ContactSection() {
  const [authToken, setAuthToken] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showContainer, setShowContainer] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("auth_token");
    window.location.reload();
  };

  useEffect(() => {
    const authenticatedToken = localStorage.getItem("auth_token");
    if (authenticatedToken) setAuthToken(authenticatedToken);
    setShowContainer(true); // Show container after component mount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Further logic to handle form submission can be added here
  };

  return (
    <AnimatePresence>
      {showContainer && (
        <motion.div
          initial={{ opacity: 0, rotateY: -180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 180 }}
          transition={{ duration: 1 }}
          key="container"
        >
          <Navbar authToken={authToken} handleLogOut={handleLogOut} />
          <section
            className="section contact bg-gradient-to-r from-purple-200 to-blue-200"
            id="contact"
            aria-label="contact"
          >
            <div className="container mx-auto px-4 py-4">
              <h2 className="text-center text-4xl font-bold text-gray-800 mb-4">
                Connect With Us
              </h2>

              <form
                className="max-w-lg mx-auto bg-white p-8 mt-4 rounded-lg shadow-lg"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <input
                    type="text"
                    name="name"
                    aria-label="name"
                    placeholder="Your name*"
                    required
                    className="input-field rounded-lg p-4 border border-gray-300"
                  />

                  <input
                    type="email"
                    name="email_address"
                    aria-label="email"
                    placeholder="Email address*"
                    required
                    className="input-field rounded-lg p-4 border border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    name="subject"
                    aria-label="subject"
                    placeholder="Subject"
                    required
                    className="input-field rounded-lg p-4 border border-gray-300"
                  />

                  <input
                    type="number"
                    name="phone"
                    aria-label="phone"
                    placeholder="Phone number"
                    required
                    className="input-field rounded-lg p-4 border border-gray-300"
                  />
                </div>

                <textarea
                  name="message"
                  aria-label="message"
                  placeholder="Your message...*"
                  required
                  className="input-field rounded-lg w-full p-4 border border-gray-300"
                />

                <button
                  type="submit"
                  className="btn btn-primary mt-4 w-full py-4 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300"
                >
                  {submitted ? "Submitted" : "Send Message"}
                </button>
              </form>

              <div className="flex justify-center mt-8">
                <div className="mr-6">
                  <a href="https://whatsapp.com/channel/0029VaMIf1eFSAt7jSslp70w">
                    <img
                      src={whatsappIcon}
                      alt="WhatsApp"
                      className="w-12 h-12"
                    />
                  </a>
                  <a
                    href="https://whatsapp.com/channel/0029VaMIf1eFSAt7jSslp70w"
                    className="text-blue-500 hover:text-purple-700"
                  >
                    Join Our Whatsapp Channel
                  </a>
                </div>
                <div>
                  <a href="https://www.facebook.com/share/p/JV1nr57Ns7PchsAV/?mibextid=oFDknk">
                    <img
                      src={facebookIcon}
                      alt="Facebook"
                      className="w-12 h-12"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/share/p/JV1nr57Ns7PchsAV/?mibextid=oFDknk"
                    className="text-blue-500 hover:text-purple-700"
                  >
                    Connect with us on Facebook
                  </a>
                </div>
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
      )}
    </AnimatePresence>
  );
}

export default ContactSection;
