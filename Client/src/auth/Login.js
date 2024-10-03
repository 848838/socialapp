import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigate()

    useEffect(() => {
        const checkloginstatus = () => {
            
            const token = localStorage.getItem("authtoken")
            try {

                if (token) {
                    navigation("/")


                }

            } catch (error) {
                console.log(error);
            }
        }

        checkloginstatus()
    }, [])




    const loginhandel = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        
        axios.post("http://localhost:5000/login", user)
            .then((response) => {
                localStorage.setItem("authtoken", response.data.token);
                navigation("/"); // Navigate to the home page on successful login
                toast('Sign sucessfull!')
            })
            .catch((error) => {
                console.log("Login failed", error);
                toast.error("Login failed. Please check your credentials.");
            });
    };
    
    return (
        <>

            <div style={{ margin: 'auto', marginTop: 100 }} className="login-container">

                <h3 style={{ marginBottom: 60, textAlign: 'center' }}>

                    <span style={{ fontSize: 40, color: 'rgb(37,61,82)', fontWeight: "700" }}>LogIn </span>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, gap: 10 }}>
                        <h6>Don't have Account ?</h6>
                        <Link to='/Signup' style={{ display: 'flex', justifyContent: 'center', fontSize: 15, marginTop: 26 }}> Create a Account</Link>


                    </div>
                </h3>
                <div style={{ display: 'flex', }}>
                </div>

                <form onSubmit={loginhandel} className="login-form">
                    <div className="input-group">
                        <input value={email} onChange={(e) => setemail(e.target.value)} type="text" id="username" required />
                        <label style={{}} htmlFor="username">Username</label>

                    </div>
                    <div className="input-group">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" required />
                        <label htmlFor="password">Password</label>
                    </div>

                    <div >
                        <button style={{ width: 250, display: 'flex', justifyContent: 'center', margin: 'auto', borderRadius: 6, padding: 10, backgroundColor: 'rgb(25,212,131)', fontSize: 20, fontWeight: "bolder", color: 'white' }} type="submit">Login</button>

                    </div>


                </form>

            </div>


        </>
    )
}

export default Login