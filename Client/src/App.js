import logo from './logo.svg';
import './App.css';

import { createBrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';

import Main from './components/Main';
import About from './MainComponents.js/About';
import Protfolio from './MainComponents.js/Protfolio';
import Contact from './MainComponents.js/Contact';
import Navbar from './MainComponents.js/Navbar';

import Search from './MainComponents.js/Search';
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import Details from './MainComponents.js/Details';
import UserProfiles from './MainComponents.js/UserProfiles';
import { ToastContainer } from 'react-toastify';

function App() {
  const [progress, setProgress] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><Main /></>
    },

    {
      path: '/About',
      element: <> <Navbar /><About /></>
    },
 
    {
      path: '/Profile',
      element: <><Navbar /><Protfolio /></>
    },
    {
      path: '/Contact',
      element: <><Navbar /><Contact /></>
    },

    {
      path: '/Search',
      element: <><Navbar /><Search /></>
    },
    {
      path: '/login',
      element: <><Navbar /><Login /></>
    },
    {
      path: '/Signup',
      element: <><Navbar /><SignUp /></>
    },
    {
      path: '/Details/:ShortsId',
      element: <><Navbar /><Details /></>
    },
    {
      path: '/Profile/:userId',
      element: <><Navbar /><UserProfiles /></>
    },





  ])
  return (

    <>
            <ToastContainer />

      <RouterProvider router={router} />



    </>
  );
}

export default App;
