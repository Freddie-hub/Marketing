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
    const authenticatedToken = localStorage.getItem("auth_token");
    if (authenticatedToken) setAuthToken(authenticatedToken);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 overflow-hidden"
    >
      <Navbar authToken={authToken} handleLogOut={handleLogOut} />
      <section className="section service top-0" id="service" aria-label="service bg-white">
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-6 ">
            Services We Provide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service cards */}
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-beige shadow-lg rounded-lg overflow-hidden flex flex-col justify-center items-center"
              >
                <div className={`p-6 text-center rounded-full mx-auto ${service.bgColor}`}>
                  <div className="text-white text-2xl mb-2 flex justify-center items-center h-full">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-2 text-center">{service.title}</h3>
                <p className="text-gray-800 text-center">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} R and J Group. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}

export default Service;

const services = [
  {
    title: "SEO Optimization",
    description: "Enhance website visibility and traffic through strategic keyword research, on-page optimization, and technical improvements, boosting search engine rankings effectively.",
    icon: <BotMessageSquare size={50} />,
    bgColor: "bg-blue-500"
  },
  {
    title: "Digital Marketing",
    description: "Harness the power of online channels to reach and engage your audience effectively, leveraging diverse strategies such as PPC, social media, and content marketing.",
    icon: <MonitorDot size={50} />,
    bgColor: "bg-green-500"
  },
  {
    title: "Market Research",
    description: "Gain insights into market trends, consumer behavior, and competitor strategies through thorough analysis, empowering informed decision-making and effective marketing strategies.",
    icon: <Lightbulb size={50} />,
    bgColor: "bg-yellow-500"
  },
  {
    title: "Keyword Targeting",
    description: "Strategically select and optimize keywords to improve search engine rankings, enhance visibility, and attract qualified traffic to your website or digital content.",
    icon: <Megaphone size={50} />,
    bgColor: "bg-red-500"
  },
  {
    title: "Email Marketing",
    description: "Engage audiences with personalized, automated email campaigns, nurturing leads and driving conversions through targeted content delivery and strategic engagement workflows.",
    icon: <MailPlus size={50} />,
    bgColor: "bg-purple-500"
  },
  {
    title: "Marketing & Reporting",
    description: "Track and analyze key metrics and performance indicators across marketing campaigns, providing valuable insights and facilitating data-driven decision-making for continuous optimization and improvement.",
    icon: <BadgeDollarSign size={50} />,
    bgColor: "bg-pink-500"
  },
];
