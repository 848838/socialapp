import logo from './logo.svg';
import './App.css';

import { createBrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';

import Main from './components/Main';
import About from './MainComponents.js/About';
import Services from './MainComponents.js/Services';
import Protfolio from './MainComponents.js/Protfolio';
import Contact from './MainComponents.js/Contact';
import Navbar from './MainComponents.js/Navbar';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar/><Main /></>
    },
    {
      path: '/About',
      element: <> <Navbar/><About /></>
    },
    {
      path: '/Services',
      element: <><Navbar/><Services /></>
    },
    {
      path: '/Protfolio',
      element: <><Navbar/><Protfolio /></>
    },
    {
      path: '/Contact',
      element: <><Navbar/><Contact /></>
    },





  ])
  return (

    <>

      <RouterProvider router={router} />

    </>
  );
}

export default App;
