import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png'
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img style={{width:200}} src={logo}/>
                </Link>
                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <div className='bg_navbar'>
                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={toggleMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/services" className="nav-links" onClick={toggleMenu}>
                            Services
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-links" onClick={toggleMenu}>
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Protfolio" className="nav-links" onClick={toggleMenu}>
                            Protfolio
                        </Link>
                    </li>
                    
                </ul>
                </div>
                <Link to="/contact" className="navbar-logos">
                   <h1 className='text-navbar' ></h1> Contact
                </Link>
        
            </div>
        </nav>
    )
}

export default Navbar