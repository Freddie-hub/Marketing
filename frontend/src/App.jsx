// src/App.js

import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/homepage';
import ProjectsPage from './pages/projectpage';
import Service from './pages/servicepage';
import AboutSection from './pages/about';
import ContactSection from './pages/contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/projects',
    element: <ProjectsPage />
  },
  {
    path: '/services',
    element: <Service />
  },
  {
    path: '/about-us',
    element: < AboutSection/>
  },
  {
    path: '/contact',
    element: < ContactSection/>
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
