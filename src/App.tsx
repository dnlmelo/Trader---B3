import React from 'react';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import logo from './logo.svg';
import './App.scss';
import Dash from './Pages/Dash/Dash';
import { Provider } from 'react-redux';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dash />
  },

]);

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

export default App;
