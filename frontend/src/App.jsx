import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import ProjectsPage from "./pages/projectpage";
import Service from "./pages/servicepage";
import AboutSection from "./pages/about";
import ContactSection from "./pages/contact";
import Credentials from "./pages/login";
import UploadPage from "./pages/upload";
import PasswordReset from "./pages/PasswordReset";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token/:email",
    element: <PasswordReset />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/services",
    element: <Service />,
  },
  {
    path: "/about-us",
    element: <AboutSection />,
  },
  {
    path: "/contact",
    element: <ContactSection />,
  },
  {
    path: "/login",
    element: <Credentials />,
  },
  {
    path: "/upload",
    element: <UploadPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
