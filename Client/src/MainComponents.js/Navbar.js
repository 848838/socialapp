import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png'
import Login from '../auth/Login';
import axios from 'axios';
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useNavigate()
    const [currentUser, setCurrentUser] = useState([]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem('authtoken');
        navigation('/login')

        // Additional logout logic here (e.g., redirect to login page)
    };


    const fetchUser = async () => {
        const token = localStorage.getItem('authtoken');
        try {
            const response = await axios.post('http://localhost:5000/userdata', { token });
            setCurrentUser(response.data.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <nav className="navbar">
            <div  className="navbar-container">
                <div className="navbar-logo">
                    <h1>Logo</h1>
                </div>
                <div  className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/About">About</a></li>

                        {
                            !localStorage.getItem('authtoken') ? (<></>) : (
                                <li><a href="/Profile"><img style={{ width: 25, borderRadius: 100, height: 25 }} src={currentUser.profileImage} /></a></li>

                            )
                        }
                        <li>
                            {localStorage.getItem("authtoken") ? (<Link onClick={handleLogout} className="navbar-logos">
                                <h1 className='text-navbar' ></h1> Logout
                            </Link>) :
                                <Link to="/login" className="navbar-logos">
                                    <h1 className='text-navbar' ></h1> LogIn
                                </Link>
                            }</li>
                    </ul>
                </div>
                <div className="navbar-hamburger" onClick={toggleMenu}>
                    <div className={`line ${isOpen ? 'rotate1' : ''}`}></div>
                    <div className={`line ${isOpen ? 'hide' : ''}`}></div>
                    <div className={`line ${isOpen ? 'rotate2' : ''}`}></div>
                </div>
            </div>
        </nav>
    )
}

// <li className="nav-item">



export default Navbar