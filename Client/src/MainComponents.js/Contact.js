import React, { useState } from 'react'
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
function Contact() {

    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Subject, setSubject] = useState('');




    const sendMessage = async (e) => {
        try {

            e.preventDefault()
            const response = await axios.post('http://localhost:5000/messagestoserver', {

                email: email,
                text: text,
                name: name,
                Mobile: Mobile,
                Subject: Subject,

            });
            if (response) {
                alert("Message Sent")
                setTimeout(() => {
                    toast("Our team will contact you soon")
                }, 1000);


            } else if (response) {
                toast("Inavlid data")
            }
            setText(''); // Clear the input field after sending the message
            setEmail(''); // Clear the input field after sending the message
            setName(''); // Clear the input field after sending the message
            setMobile(''); // Clear the input field after sending the message
            setSubject(''); // Clear the input field after sending the message

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const nadame = (e) => {
        const value = e.target.value;
        // Allow only alphabetic characters
        const regex = /^[a-zA-Z]*$/;
        if (regex.test(value)) {
            setName(value);
        }
    };
    return (
        <div style={{ backgroundImage: `url(https://i.ibb.co/kVnxfK9/udpae.jpg)` }}>
            <div style={{ marginTop: 0 }} >
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <h1 className='our_mission' style={{}}>LET'S </h1>

                    <p className='we_are3997'>We'd love to hear from you! Whether you have a question, need a consultation, or want to discuss a potential project, feel free to reach out to our team</p>


                </div>

                <div style={{ marginTop: -80 }}>

                    <h1 className='our_vision'  >CONNECT </h1>

                </div>

                <p style={{ marginTop: 10 }} className='we_are4'>Our mission is to deliver high-quality, creative, and strategic digital solutions that help our clients achieve their business goals.</p>



            </div>

            <h1 style={{ color: 'white', fontWeight: '200', fontSize: 50, textAlign: 'center', marginTop: 50 }}> WRITE A MESSAGE</h1>
            <form onClick={sendMessage}>
            <div style={{ marginTop: 100 }} className='form_fill'>
                <div className='input_fill_up'>
                    <input value={name} onChange={(e)=>setName(e.target.value)}  className='input_contact' placeholder='Name' style={{}}></input>

                    <input value={email} onChange={(e)=>setEmail(e.target.value)}  className='input_contact' placeholder='E-mail'></input>



                </div>

            </div>
            <div style={{ marginTop: 70 }} className='form_fill'>
                <div className='input_fill_up'>
                    <input value={Mobile} onChange={(e)=>setMobile(e.target.value)} className='input_contact' placeholder='Phone Number' ></input>
                    <input value={Subject} onChange={(e)=>setSubject(e.target.value)}  className='input_contact' placeholder='Subject' ></input>



                </div>

            </div>
            <div style={{ marginTop: 70 }} className='form_fill'>
                <div className='input_fill_up'>
                    <input value={text} onChange={(e)=>setText(e.target.value)}  className='input_contact' placeholder='Your Message' ></input>




                </div>

            </div>
            <div style={{ display: 'flex', marginTop: 100 }}>

                <button  type='sumbit' className='Send_message' style={{}}>Send Message
                    <i style={{ float: 'right' }} id='buttonHoverss' className="bi bi-chevron-right"></i>

                </button>
            </div>
            </form>



            <div className='or_statement'>
                <h1 style={{ color: 'white', textAlign: 'center', marginTop: 100, fontSize: 60, }}>OR</h1>
                <h1 style={{ color: 'white', textAlign: 'center', fontSize: 60, fontWeight: '200' }}> CONNECT WITH US</h1>
            </div>
            <div className='with_email' style={{}}>
                <div>
                    <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20 }}>        E-mail</h3>
                    <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20, marginTop: -20 }}>thepixelforgestudio.com</h3>
                    <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20 }}>Phone No</h3>
                    <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20, marginTop: -20 }}>+91 8147057109</h3>
                    <div className='pc_none' style={{}}>
                        <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20 }}>                Instagram</h3>
                        <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20, marginTop: -20 }}>pixelforge_studios</h3>
                        <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20 }}>LinkedIn</h3>
                        <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20, marginTop: -20 }}>


                            Pixelforge-studios
                        </h3>
                    </div>
                </div>
                <div className='Mobile_none' style={{}}>
                    <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20 }}>                Instagram</h3>
                    <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20, marginTop: -20 }}>pixelforge_studios</h3>
                    <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20 }}>LinkedIn</h3>
                    <h3 style={{ color: 'white', fontWeight: '200', fontSize: 20, marginTop: -20 }}>


                        Pixelforge-studios
                    </h3>
                </div>
            </div>
            <div style={{ marginTop: -400 }}>

                <Footer />
            </div>
        </div>
    )
}

export default Contact