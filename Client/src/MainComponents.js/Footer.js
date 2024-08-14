import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'

function Footer() {
    return (
        <footer style={{ marginTop: 490, padding: 30 }} className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <img  style={{width:'100%', marginTop:-39}} src={logo} />
                </div>
            
                <div className="footer-column">
                    <h3 style={{ fontWeight: '700' }} >Content </h3>
                    <div style={{ gap: 10, marginTop: 10, margin: 10 }}>
                        <li style={{ fontWeight: 'bold', marginTop: 10 }}>Home</li>
                        <li style={{ fontWeight: 'bold', marginTop: 10 }}>About</li>
                        <li style={{ fontWeight: 'bold', marginTop: 10 }}>Services</li>
                        <li style={{ fontWeight: 'bold', marginTop: 10 }}>Protfolio</li>
                        <li style={{ fontWeight: 'bold', marginTop: 10 }}>Kasol</li>
                    </div>

                </div>
         
                <div className="footer-column">
                    <h3 style={{ fontWeight: '700' }} >Content </h3>
                    <div style={{ gap: 10, marginTop: 10, margin: 10 }}>
                        <a style={{ textDecoration: 'none', listStyle: 'none', color: 'white', fontWeight: 'bold', marginTop: 10 }} href='https://www.instagram.com/pixel.forge_studios?igsh=MTM4Z253Y204azl2aQ==' ><li>Instagram</li> </a>
                        <a style={{ textDecoration: 'none', listStyle: 'none', color: 'white', fontWeight: 'bold', marginTop: 10 }} href='https://www.linkedin.com/in/pixel-forgestudios-b227352ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' ><li>linkedin</li></a>
                        <a style={{ textDecoration: 'none', listStyle: 'none', color: 'white', fontWeight: 'bold', marginTop: 10 }} href='https://www.facebook.com/share/fnULYJAxc7VrDeae/?mibextid=qi2Omg' ><li>Facebook</li></a>

                    </div>

                </div>



                <div className="footer-column">

                    <h3 style={{ fontWeight: '700' }}>Contact</h3>
                    <div style={{ gap: 10, marginTop: 10, margin: 10 }}>
                        <li style={{ fontWeight: 'bold', marginTop: 10 }}>+91 8147057109</li>
                        <li style={{ fontWeight: 'bold', marginTop: 10 }}>Contact@pixelforgestudio.com</li>

                    </div>


                </div>
            </div>

        </footer>
    )
}

export default Footer