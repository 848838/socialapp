import React from 'react'
import bg from '../Assets/text bg.jpg'
import img1 from '../Assets/Rectangle 34.png'
import img2 from '../Assets/Rectangle 32.png'
import img3 from '../Assets/Rectangle 33.png'
import img4 from '../Assets/Rectangle 36.png'
import img7 from '../Assets/Rectangle 35.png'
import img6 from '../Assets/Texturelabs_Film_185XL.jpg'
import Footer from './Footer'



function Services() {
    return (
        <div className='img_bg' style={{ backgroundImage: `url(https://i.ibb.co/kVnxfK9/udpae.jpg)`}}>
            <div style={{ marginTop: 0 }} >
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <h1 className='our_mission' style={{}}><span className='ou'>O</span>UR </h1>

                    <p className='we_are3'>Our mission is to deliver high-quality, creative, and strategic digital solutions that help our clients achieve their business goals.</p>


                </div>

                <div style={{ marginTop: -80 }}>

                    <h1 className='our_vision'  >SERVICES </h1>

                </div>

                <p style={{ marginTop: 10 }} className='we_are4'>Our mission is to deliver high-quality, creative, and strategic digital solutions that help our clients achieve their business goals.</p>




            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', }}>
                <div className='Butto_services12'>
                    <div>
                        <img className='image-with-shadow' src={img2} />
                    </div>
                    <div >
                        <p style={{ color: 'white', marginTop: 50, width: '60%', marginLeft: 30 }}>SEARCHING ENGINE OPTIMIZATION</p>
                        <h4 className='button_services_h44'>SEO</h4>
                        <h6 style={{ color: 'white', fontSize: 17, marginTop: -90, marginLeft: 30, fontWeight: "100", width: '80%' }}>Boost your visibility with our expert SEO services. We optimize your website’s content, structure, and keywords to enhance its search engine ranking and attract organic traffic. Our data-driven strategies help your business stand out in search results and reach potential customers effectively.</h6>
                        <a style={{ textDecoration: 'none', cursor: 'pointer' }} href='/Contact'>  <button className='connect_services'>Connect With Us
                            <i id='buttonHoverss' className="bi bi-chevron-right"></i>

                        </button></a>
                    </div>

                </div>

                <div className='MainHeading_box'></div>

                <div className='Butto_services1'>
                    <div>
                        <img className='image-with-shadow' src={img3} />
                    </div>
                    <div >
                        <p style={{ color: 'white', marginTop: 50, width: '60%', marginLeft: 30, }}>MARKETING AND MANAGEMENT</p>
                        <h4 className='button_services_h46' style={{}}>SOCIAL AD</h4>
                        <h6 className='servicespadd' style={{  }}>Elevate your online presence with strategic social media management. We handle everything from content creation and curation to community engagement and analytics. Our approach ensures that your brand's voice is consistent, your audience is engaged, and your social media efforts drive meaningful results.</h6>
                        <a style={{ textDecoration: 'none', cursor: 'pointer' }} href='/Contact'>  <button className='connect_services'>Connect With Us
                            <i id='buttonHoverss' className="bi bi-chevron-right"></i>

                        </button></a>
                    </div>
                    <div className='MainHeading_box'></div>
                </div>




                <div className='Butto_services_data'>
                    <div>
                        <img className='image-with-shadow' src={img1} />
                    </div>
                    <div >
                        <p style={{ color: 'white', marginTop: 50, width: '100%', marginLeft: 20 }}>DESIGN & DEV</p>
                        <h4 style={{ color: 'white', fontSize: 49, marginTop: -10, width: '60%', marginLeft: 10 }}>UI/UX</h4>
                        <h6 style={{ color: 'white', fontSize: 17, marginTop: -60, marginLeft: 10, fontWeight: "200" }}>Elevate your digital presence with our expert UI/UX design services. We blend functionality with aesthetic appeal to create user-friendly and visually engaging interfaces. Our designs focus on delivering seamless, enjoyable experiences that keep users coming back.</h6>
                        <a style={{ textDecoration: 'none', cursor: 'pointer' }} href='/Contact'>  <button className='connect_services'>Connect With Us
                            <i id='buttonHoverss' className="bi bi-chevron-right"></i>

                        </button></a>
                    </div>
                </div>
                <div className='Butto_services_data'>
                    <div>
                        <img className='image-with-shadow' src={img7} />
                    </div>
                    <div >
                        <p style={{ color: 'white', marginTop: 50, width: '100%', marginLeft: 20 }}>GRAPHICS DESIGNINING</p>
                        <h4 className='button_services_h46'>GRAPHICS</h4>
                        <h6 className='arot_services'   >Bring your vision to life with our dynamic graphic design solutions. From eye-catching logos and branding materials to compelling marketing collateral and social media graphics, our team uses creativity and precision to produce visuals that captivate and communicate effectively.</h6>

                        <a style={{ textDecoration: 'none', cursor: 'pointer' }} href='/Contact'>  <button className='connect_services'>Connect With Us
                            <i id='buttonHoverss' className="bi bi-chevron-right"></i>

                        </button></a>
                    </div>
                </div>
                <div className='Butto_services_data'>
                    <div>
                        <img className='image-with-shadow' src={img4} />
                    </div>
                    <div >
                        <p style={{ color: 'white', marginTop: 50, width: '100%', marginLeft: 20 }}>BRAND DESIGNINING</p>
                        <h4 className='button_services_h46'>BRAND</h4>
                        <h6 className='arot_services' >Build a strong and memorable identity with our branding services. We craft unique and cohesive brand strategies that define your voice, style, and message. From logo design to brand guidelines, we ensure your brand stands out and resonates with your audience across all platforms.</h6>

                        <a style={{ textDecoration: 'none', cursor: 'pointer' }} href='/Contact'>  <button className='connect_services'>Connect With Us
                            <i id='buttonHoverss' className="bi bi-chevron-right"></i>

                        </button></a>
                    </div>
                </div>
        
            </div>

            {/* designs */}

            <div style={{ marginTop: 60, width: '80%', margin: 'auto', padding: 30 }}>
                <div style={{ border: '1px solid white' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ color: 'white', fontSize: 40, marginTop: 10 }}>PRODUCT PHOTOSHOOT</h1>
                    <i style={{ color: 'white', fontSize: 60, marginTop: -10 }} class="bi bi-arrow-right-short"></i>
                </div>

                <div style={{ border: '1px solid white', marginTop: 14 }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ color: 'white', fontSize: 40, marginTop: 10 }}>CONTENT MARKETING</h1>
                    <i style={{ color: 'white', fontSize: 60, marginTop: -10 }} class="bi bi-arrow-right-short"></i>
                </div>
                <div style={{ border: '1px solid white', marginTop: 14 }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ color: 'white', fontSize: 40, marginTop: 10 }}>APPRAEL DESIGN</h1>
                    <i style={{ color: 'white', fontSize: 60, marginTop: -10 }} class="bi bi-arrow-right-short"></i>
                </div>
                <div style={{ border: '1px solid white', marginTop: 14 }}></div>



            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img style={{ height: '45vh', width: '100%', opacity: '40%', borderRadius: 20 }} src={bg} className='responsive-image' />
                <div className='bottom_text'><h1>READY TO ELIVATE YOUR <span style={{ color: 'rgb(181,115,76)' }}>BRAND</span></h1>
                    <p className='para_footer_near'>Pixel Forage is here to bring your ideas to life , Pixel by Pixel . Contact us for exceptional web design, creative branding , and strategic marketing . Let's  create someting incredible!</p>
                    <a style={{ textDecoration: "none" }} href='/Contact'>  <button className='Button_contact_mes'>Connect With Us
                        <i id='buttonHoverss' className="bi bi-chevron-right"></i>

                    </button></a>
                </div>


            </div>

            <div style={{ marginTop: -460 }}>
                <Footer />
            </div>
        </div>
    )
}

export default Services