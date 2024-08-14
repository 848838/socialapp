import React from 'react'
import bg from '../Assets/text bg.jpg'
import asset from '../Assets/inkpx-curved-text.png'
import Footer from './Footer'

function About() {
    return (
        <div style={{ backgroundImage: `url(https://media.istockphoto.com/id/1273852653/photo/old-scratched-film-strip-grunge-texture-background.jpg?s=612x612&w=0&k=20&c=OTzQ4ThsRnvLhAnia1iwcE997l-XHrAlfkTZDBrLcZA=)` }} >
            <div className='About_heading'>

                <h1 style={{ marginTop: 100 }} className='about_header'>
                    ABOUT <span style={{ color: "rgb(181,115,76)" }}>US</span>


                </h1>

            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', width: "80%" }} className='circle_para'>

                <p style={{}} className='para_about'>Welcome to Pixel Forge Studio! We're a fresh and dynamic design and digital marketing agency based in the vibrant city of Bangalore. Our passion is helping businesses of all sizes boost their online presence with creative web design, eye-catching branding, and smart digital marketing strategies. At Pixel Forge Studio, we're all about turning your ideas into stunning and effective digital experiences.



                </p>
                <img className='rotation_circle' src={asset} />



            </div>
            <img className='rotation_circle2' src={asset} />





            {/* our vision */}

            <div style={{ marginTop: 50 }} >
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <h1 className='our_mission' style={{}}>OUR </h1>

                    <p className='we_are3'>Our mission is to deliver high-quality, creative, and strategic digital solutions that help our clients achieve their business goals.</p>


                </div>
                <p style={{ marginTop: -10, marginLeft: 180, width: '20%' }} className='we_are3'>We aim to be a leading creative agency, transforming ideas into impactful digital experiences and setting new standards for excellence.</p>

                <div style={{ marginTop: -140 }}>

                    <h1 className='our_vision'  >VISION </h1>

                </div>

                <p  style={{ marginTop:10 }} className='we_are4'>Our mission is to deliver high-quality, creative, and strategic digital solutions that help our clients achieve their business goals.</p>
                <p style={{ marginTop:10 }} className='we_are4'>We aim to be a leading creative agency, transforming ideas into impactful digital experiences and setting new standards for excellence.</p>




            </div>


            <div>

            </div>
            {/* near footer area */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                <img style={{ height: '45vh', width: '100%', opacity: '40%', borderRadius: 20 }} src={bg} className='responsive-image' />
                <div className='bottom_text'><h1>READY TO ELIVATE YOUR <span style={{ color: 'rgb(181,115,76)' }}>BRAND</span></h1>
                    <p className='para_footer_near'>Pixel Forage is here to bring your ideas to life , Pixel by Pixel . Contact us for exceptional web design, creative branding , and strategic marketing . Let's  create someting incredible!</p>
                    <button className='Button_contact_mes'>Connect With Us
                        <i id='buttonHoverss' className="bi bi-chevron-right"></i>

                    </button>
                </div>


            </div>
            <div style={{ marginTop: -100 }}>
                <Footer />
            </div>
        </div>
    )
}

export default About