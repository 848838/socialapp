import React, { useState } from 'react'
import axios from 'axios'

import { Navigate, useNavigate, useNavigation } from 'react-router-dom';

import { toast } from 'react-toastify';


function SignUp() {
    const navigation = useNavigate()
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setimage] = useState('')

    const handleRegister = (e) => {
        e.preventDefault()
        const user = {
            name: name,
            email: email,
            password: password,
            profileImage: image
        }
        if (user) {
            setTimeout(() => {

                navigation('/Login')
                toast('Registered Sucessfully')

            }, 1000);
        }

   
        axios.post("http://localhost:5000/register", user).then((response) => {

            localStorage.setItem("authtoken", response.data.token);

            navigation("/"); // Navigate to the home page on successful login
            toast('Sign sucessfull!')
            setname("");
            setemail("");
            setPassword("");
            setimage("");

        }).catch((error) => {
            console.log("registration failed", error)
        });
    }
    return (
        <div style={{ margin: 'auto', marginTop: 100 }} className="login-container">

            <h3 style={{ marginBottom: 60, textAlign: 'center' }}>

                <span style={{ fontSize: 40, color: 'rgb(40, 44, 51)', fontWeight: '660' }}>SignUP </span>

            </h3>
            <div style={{ display: 'flex', }}>
            </div>

            <form onSubmit={handleRegister} className="login-form">
                <div className="input-group">
                    <input value={email} onChange={(e) => setemail(e.target.value)} type="text" id="username" required />
                    <label style={{}} htmlFor="username">Enter Your Email </label>

                </div>
                <div className="input-group">
                    <input value={name} onChange={(e) => setname(e.target.value)} required />
                    <label htmlFor="password">Enter Your Name</label>
                </div>
                <div className="input-group">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" required />
                    <label htmlFor="password"> Create a Password</label>
                </div>

                {/* <div style={{marginLeft:'auto'}}>
        <Link style={{listStyle:'none', textDecoration:'none'}}>create a account ?</Link>

        </div> */}
                <div >
                    <button style={{ width: 250, display: 'flex', justifyContent: 'center', margin: 'auto', borderRadius: 6, padding: 10, backgroundColor: 'rgb(25,212,131)', fontSize: 20, fontWeight: "bolder" }} type="submit">Get Started</button>

                </div>
                <div style={{ border: '1px solid grey ', marginTop: 30, opacity: '30%' }}></div>
                <div style={{ display: 'flex', gap: 10, margin: 'auto', marginTop: 50, flexWrap: 'wrap' }}>

                    <img style={{ width: 40, height: 25, }} src='https://www.witness.org/wp-content/uploads/2018/11/kisspng-computer-icons-logo-clip-art-instagram-logo-5acbcae532b034.7535309115233051892076.png' />
                    <h6 style={{ marginTop: 1 }}><a style={{ textDecoration: 'none', color: 'black' }} href='https://www.instagram.com/triphive_adventures?igsh=MWR1aDRjNDhpY20waw=='>TripHive Adventures
                    </a></h6>



                </div>



            </form>

        </div>
    )
}

export default SignUp