// src/App.js

import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/homepage';
import ProjectsPage from './pages/projectpage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/projects',
    element: <ProjectsPage />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
