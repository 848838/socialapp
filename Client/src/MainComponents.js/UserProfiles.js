import axios from 'axios';
import React, { Profiler, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Search from './Search';
import defaultImage from '../Assets/default.webp'; // Path to your default image
import moment from 'moment';

function UserProfiles() {
  const { name } = useParams(); // Get userId from URL
  const { userId } = useParams(); // Get userId from URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    // Fetch images from the server
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem('authtoken');

        const response = await axios.get(`http://localhost:5000/Profile/${userId}/images`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);

        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [userId])
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/Profile/${userId}`)
        setProfile(res.data);
        console.log(res.data);

        setLoading(false);


      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [name]);

  if (loading) return <div style={{color:'white'}}>Loading...</div>;
  if (!profile) return <div style={{color:'white'}}>User not found</div>;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>

      <div>

        <div style={{ border: '1px solid grey', margin: 'auto', marginTop: 100, height: '100%', width: 300, borderRadius: 10, padding: 30 , background:'white' }}>
          <div style={{ display: 'flex', border: '1px solid grey', width: 100, height: 100, borderRadius: 100, justifyContent: 'center', margin: 'auto', marginTop: 30, }}>
<div className='profile-image-container'>


            <img style={{ overflow: 'hidden', height: '100%', width: '100%', borderRadius: 100 }}
            
            onClick={openModal} 
            
            src={profile.profileImage}
            
            className="profile-image" 
            
            />
            </div>


          </div>

          {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img src={profile.profileImage} alt={`${profile.username}'s profile`} style={{borderRadius:200, width:200, height:200 , objectFit:'inherit'}}/>
          </div>
        </div>
      )}
          <h5 style={{ textAlign: 'center', marginTop: 10, color: "grey" }}>
            {profile.email}
          </h5>
          <h1 style={{ textAlign: 'center', marginTop: -19, color: 'black' }}>
            {profile.name}
          </h1>

        </div>
   

        {
        
        images.length  > 0 ? (
        <>
        
          <div style={{ display: "flex", gap: 10, marginTop: 100, flexWrap: 'wrap', marginLeft:100,  margin:20}}>
          {images.map((image) => (
            <div key={image._id} style={{ border: '1px solid grey', height: '100%', width: 300, backgroundColor: 'white', borderRadius: 10}}>
              <div style={{ display: 'flex', margin: 'auto' }}>
                <img
                  style={{ width: 40, height: 40, borderRadius: 100, margin: 19, marginLeft: 20 }}
                  src={image.profileImage || defaultImage}
                  alt="Profile"


                />
                <Link to={`/Profile/${image.userId}`} style={{ cursor: 'pointer', margin: 'auto', display: 'flex', fontWeight: 'bold', textDecoration: 'none', color: "black" }}>
                  <h3 style={{ color: 'black' }}>{image.userName}
                    
            
                </h3>
                </Link>
    
                <p style={{ color: 'grey', margin: 'auto', fontWeight: '500', marginLeft: 10, fontSize: 13 }}>{moment(image.createdAt).fromNow()}</p>
              </div>
              <img
                style={{ display: 'flex', margin: 'auto', borderRadius: 1, marginTop: -10, height: 200, width:"100%" }}
                src={image.imageUrl}
                alt="Post"
              />
              <p style={{ color: 'black', margin: 'auto', fontWeight: '500', marginLeft: 0, marginTop: 10, padding: 20 }}>
                <span style={{ fontWeight: 'bold' }}>{image.userName}</span> - {image.description}
              </p>



            </div>
          ))}

          </div>
            </>  
        ) : (<h1 style={{ color: 'grey', display:'flex',justifyContent:'center', marginTop:100 }}>There's No Post</h1>)


      }
          
        </div>
    
    </>
  )
}

export default UserProfiles