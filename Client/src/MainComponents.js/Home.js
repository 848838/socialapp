import React from 'react'
import bg from '../Assets/new texure.jpg'
import rect from '../Assets/Rectangle 5.png'
import Footer from './Footer'
function Home() {
    return (
        <>
        <div className="image-container">
        <img src={bg} alt="Background" className="responsive-image" />
        <div className="overlay">
           <div style={{ display: 'flex',  marginTop:10}}>

          <h1 className='we_are' style={{ }}>WE ARE </h1>
          <p style={{}}  className='we_are3'>Turinig Your Brand Online Dreams into Reality With Social Media Magic  SEO , and Stunning Web Design</p>


        </div>

        <h1 className='we_are2'  >CREATIVE <span className='Agency_color'>AGENCY</span> </h1>

        <p  className='we_are4'>Turinig Your Brand Online Dreams into Reality With Social Media Magic  SEO , and Stunning Web Design</p>
 
           <button className='Button_contact_me'>Connect With Us
           <i id='buttonHover' className="bi bi-chevron-right"></i>

           </button>

        </div>
        
    </div> 
    {/* about section at home */}
    <div style={{marginTop:-4 , backgroundColor:'rgb(33, 33, 33)',height:'100%'}} >
    <div className="container">
            <div className="container-box">
             <img className='img_about' src={rect}/>
                
            </div>
            <div className="container-box">
                <h2 className='About_us_font'>ABOUT<span style={{color:'rgb(181,115,76)'}}>US</span></h2>
                <p className='About_us_para'>Pixel Forage Studio , is dedicated to crafting exceptional web design and digital solutions. As a fresher and dynamic team , we blend creativity with surgery to bring your vision to life . Let's build something extraordinary together.</p>
            </div>
        </div>
    </div> 
    <div style={{marginTop:-4 , backgroundColor:'rgb(26,26,26)',height:'100%'}} >
    <div style={{}} >
    <div style={{ display: 'flex', justifyContent:'center'}}>

<h1 className='we_are25' style={{ }}>OUR </h1>
<button className='about_buttoncopy'>
    Get in Touch
    <i className="bi bi-chevron-right"></i>

    </button>
<p  className='we_are3'>Turinig Your Brand Online Dreams into Reality With Social Media Magic  SEO , and Stunning Web Design</p>


</div>

<div style={{margin:'auto',}}>
<button className1='about_button'>
    Get in Touch
    <i className="bi bi-chevron-right"></i>

    </button>
        <h1 className='we_are23'  >SERVICES </h1>
</div>

        <p  className='we_are4'>Turinig Your Brand Online Dreams into Reality With Social Media Magic  SEO , and Stunning Web Design</p>
 

        </div>  
        <div style={{marginTop:60 , width:'80%', margin:'auto',padding:30}}>
            <div style={{border:'1px solid white' }}></div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h1 style={{color:'white', fontSize:60 , marginTop:10}}>UI/UX DESIGNS</h1>
                <i style={{color:'white', fontSize:90, marginTop:-10}} class="bi bi-arrow-right-short"></i>
            </div>

            <div style={{border:'1px solid white', marginTop:14 }}></div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h1 style={{color:'white', fontSize:60 , marginTop:10}}>UI/UX DESIGNS</h1>
                <i style={{color:'white', fontSize:90, marginTop:-10}} class="bi bi-arrow-right-short"></i>
            </div>
            <div style={{border:'1px solid white' , marginTop:14 }}></div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h1 style={{color:'white', fontSize:60 , marginTop:10}}>UI/UX DESIGNS</h1>
                <i style={{color:'white', fontSize:90, marginTop:-10}} class="bi bi-arrow-right-short"></i>
            </div>
            <div style={{border:'1px solid white', marginTop:14  }}></div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h1 style={{color:'white', fontSize:60 , marginTop:10}}>UI/UX DESIGNS</h1>
                <i style={{color:'white', fontSize:90, marginTop:-10}} class="bi bi-arrow-right-short"></i>
            </div>
            <div style={{border:'1px solid white', marginTop:14  }}></div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h1 style={{color:'white', fontSize:60 , marginTop:10}}>UI/UX DESIGNS</h1>
                <i style={{color:'white', fontSize:90, marginTop:-10}} class="bi bi-arrow-right-short"></i>
            </div>
            <div style={{border:'1px solid white', marginTop:14  }}></div>
        </div>






        {/* OUR work section */}
        <div style={{backgroundColor:"rgb(33,33,33) ", height:'40vh'}} >
    <div style={{ display: 'flex', justifyContent:'center'}}>

<h1 className='we_are25' style={{ }}>OUR </h1>
<p  className='we_are3'>Turinig Your Brand Online Dreams into Reality With Social Media Magic  SEO , and Stunning Web Design</p>


</div>

<div style={{margin:'auto',}}>

        <h1 className='we_are235'  >WORKS </h1>
</div>

        <p  className='we_are4'>Turinig Your Brand Online Dreams into Reality With Social Media Magic  SEO , and Stunning Web Design</p>
 

        </div>  



        {/* soon to be updated */}
        <div style={{backgroundColor:"rgb(54,54,54) " , height:'90vh' }} >
    <div style={{ display: 'flex', justifyContent:'center'}}>

<h1 className='we_are256' style={{ }}>SOON TO BE</h1>


</div>

<div style={{margin:'auto',}}>

        <h1 className='we_are2356'  >UPDATED </h1>
</div>

 

        </div>  

{/* near footer area */}
<div style={{ display:'flex', justifyContent:'center'}}>
    <img style={{height:'45vh', width:'90%', opacity:'40%', borderRadius:20}} src={bg} className='responsive-image'/>
<div className='bottom_text'><h1>READY TO ELIVATE YOUR <span style={{color:'rgb(181,115,76)'}}>BRAND</span></h1>
<p className='para_footer_near'>Pixel Forage is here to bring your ideas to life , Pixel by Pixel . Contact us for exceptional web design, creative branding , and strategic marketing . Let's  create someting incredible!</p>
                        <button className='Button_contact_mes'>Connect With Us
                            <i id='buttonHoverss' className="bi bi-chevron-right"></i>

                        </button>
</div>


</div>


        <Footer/>

    </div> 
    </>

    )
}

export default Home







    //     <div className="background-container">
    //     <div className="overlay">
    


    // 
    //     </div>

    // </div>