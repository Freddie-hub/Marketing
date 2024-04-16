import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

function ContactSection() {
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
      <section
        className="section contact bg-white-2"
        id="contact"
        aria-label="contact"
      >
        <div className="container">
          <h2 className="h2 section-title text-center text-3xl font-bold mt-7">
            Connect With Us
          </h2>

          <form
            action=""
            className="contact-form bg-white-1 p-20 rounded-radius-2 mb-30 shadow-shadow-1"
          >
            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                aria-label="name"
                placeholder="Your name*"
                required
                className="input-field bg-white-2 text-eerie-black text-fs-5 p-15 rounded-radius-2 outline-none mb-15"
              />

              <input
                type="email"
                name="email_address"
                aria-label="email"
                placeholder="Email address*"
                required
                className="input-field"
              />
            </div>

            <div className="input-wrapper">
              <input
                type="text"
                name="subject"
                aria-label="subject"
                placeholder="Subject"
                className="input-field"
              />

              <input
                type="number"
                name="phone"
                aria-label="phone"
                placeholder="Phone number"
                className="input-field"
              />
            </div>

            <textarea
              name="message"
              aria-label="message"
              placeholder="Your message...*"
              required
              className="input-field"
            ></textarea>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="terms_and_policy"
                id="terms"
                required
                className="checkbox"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>

          <ul className="contact-list">
            <li className="contact-item">
              <div className="contact-card">
                <div className="card-icon">
                  <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                </div>

                <div className="card-content">
                  <h3 className="h3 card-title">Mail Here</h3>

                  <a href="mailto:hello@luaz.com" className="card-link">
                    hello@luaz.com
                  </a>
                  <a href="mailto:info@luaz.com" className="card-link">
                    info@luaz.com
                  </a>
                </div>
              </div>
            </li>

            <li className="contact-item">
              <div className="contact-card">
                <div className="card-icon">
                  <ion-icon name="map-outline" aria-hidden="true"></ion-icon>
                </div>
              </div>
            </li>

            <li className="contact-item">
              <div className="contact-card">
                <div className="card-icon">
                  <ion-icon
                    name="headset-outline"
                    aria-hidden="true"
                  ></ion-icon>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default ContactSection;
