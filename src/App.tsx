import React from 'react';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './App.scss';
import Dash from './Pages/Dash/Dash';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dash />
  },

]);

const App = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
