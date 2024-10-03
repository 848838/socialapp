import React, { useEffect, useState } from 'react';
import axios from 'axios';
import defaultImage from '../Assets/default.webp'; // Path to your default image
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

function Protfolio() {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedPost, setUploadedPost] = useState([]);
  const [preview, setPreview] = useState('');
  const [previewProfile, setPreviewProfile] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showUploadpreviewProfileButton, setShowUploadpreviewProfileButton] = useState(false);
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('authtoken');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewProfile(URL.createObjectURL(event.target.files[0]));

    console.log('Selected file:', event.target.files[0]);
    setShowUploadpreviewProfileButton(true); // Show upload button when file is selected
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setShowUploadButton(true); // Show upload button when file is selected
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    try {
      const token = localStorage.getItem('authtoken');
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setUploadStatus(toast('Image uploaded successfully'));
      setUploadedPost(response.data);
      setShowUploadButton(false); // Hide button after successful upload
      navigate('/'); // Navigate to Home page

    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Error uploading image');
    }
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

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('authtoken');

      const response = await axios.post(`http://localhost:5000/like/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the images state with the new like data
      setUploadedPost((prevImages) =>
        prevImages.map((post) =>
          post._id === postId
            ? { ...post, likeCount: response.data.likeCount, userHasLiked: response.data.userHasLiked }
            : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem('authtoken');
        const response = await axios.get('http://localhost:5000/ProfileImages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUploadedPost(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedFile);
    console.log('FormData:', formData);

    try {
      const response = await axios.post('http://localhost:5000/ProfileUpdate-image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      setCurrentUser((prev) => ({ ...prev, profileImage: response.data.profileImageUrl }));
      alert('Profile image updated successfully.');
      setShowUploadpreviewProfileButton(false); // Hide button after successful upload
    } catch (error) {
      console.error('Error updating profile image:', error);
      alert('Error updating profile image');
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast("Deleted Post");
      setUploadedPost(uploadedPost.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  useEffect(() => {
    console.log('Current User:', currentUser); // Check the entire currentUser object
  }, [currentUser]);
  const profileImageUrl = currentUser.profileImage ? `${currentUser.profileImage}?t=${Date.now()}` : defaultImage;
  console.log(profileImageUrl);

  const toggleMenu = (postId) => {
    setIsMenuOpen((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };
  return (
    <>
      <h1 style={{ color: 'white' }}>{uploadStatus}</h1>

      <div style={{border: '1px solid rgb(61,68,77)', backgroundColor: 'rgb(21,27,35)', margin: 'auto', marginTop: 100, height: '100%', width: 300, borderRadius: 10, padding: 30 }}>

        <form style={{ display: 'none' }} onSubmit={handleSubmit}>
          <input id="fileInput" type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>



        <form onSubmit={handleSubmit}>


          <div style={{ display: 'flex', width: 100, height: 100, borderRadius: 100, justifyContent: 'center', margin: 'auto', marginTop: 30 }}>
            {previewProfile && <img src={previewProfile} alt="Preview" width="100" style={{}} />}

            <img
              style={{ overflow: 'hidden', height: '100%', width: '100%', borderRadius: 100 }}
              src={profileImageUrl}
              alt="Profile"
              onClick={triggerFileInput}

            />

            {showUploadpreviewProfileButton && <button type="submit">Upload</button>} {/* Conditionally render the upload button */}

          </div>
        </form>

        <h5 style={{ textAlign: 'center', marginTop: 10, color: 'grey' }}>
          {currentUser && currentUser.email}
        </h5>
        <h1 style={{ textAlign: 'center', marginTop: -19, color: 'white' }}>
          {currentUser && currentUser.name}
        </h1>

        <div style={{ display: 'flex', margin: 'auto', justifyContent: 'center', width: 300 }}>
          <div>
            <input
              style={{ display: 'none' }}
              type="file"
              id="file-upload"
              onChange={handleImageChange}
            />
            <label htmlFor="file-upload" className="custom-file-upload">
              {uploadedPost.length > 0 ? 'Share your photo' : 'Share your first photo'}
            </label>

            <textarea
              style={{ display: 'flex', padding: 10, borderRadius: 10, margin: 'auto', marginTop: 10, width: '100%', border: 'none' }}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Type something..."
              required
            />
            {preview && <img src={preview} alt="Preview" width="100" style={{ display: 'flex', margin: 'auto', marginTop: 10, borderRadius: 10 }} />}
            {image && (
              <button className="button_upload" onClick={handleUpload}>Upload Image</button>
            )}
          </div>
        </div>
      </div>

      {uploadedPost.length > 0 ? (
        <>
          <h1 style={{ color: 'white', marginLeft: 10, marginTop: 100, display: 'flex', justifyContent: 'center' }}>Your posts</h1>

          <div style={{ marginTop: 70,}} className='image-flow-container'>
            {uploadedPost.map((image) => (
              <div key={image._id} style={{ border: '1px solid rgb(61,68,77)', height: '100%', width: 300, backgroundColor: 'rgb(21,27,35)', borderRadius: 10 }}>


                <div style={{ display: 'flex', margin: 'auto' }}>

                  <img
                    style={{ width: 40, height: 40, borderRadius: 100, margin: 19, marginLeft: 20 }}
                    src={image.profileImage || defaultImage}
                    alt="Profile"
                  />
                  <Link to={`/Profile/${image.userId}`} style={{ cursor: 'pointer', margin: 'auto', display: 'flex', fontWeight: 'bold', textDecoration: 'none', color: "black" }}>
                    <h3 style={{ color: 'white' }}>{image.userName}



                    </h3>
                  </Link>



                  <p style={{ color: 'grey', margin: 'auto', fontWeight: '500', marginLeft: 10, fontSize: 13 }}>{moment(image.createdAt).fromNow()}</p>
                  <div className="ellipsis-menu-container">
                    {/* 3 Dots Button */}
                    <div className="ellipsis-btn" onClick={() => toggleMenu(image._id)}>
                      &#x22EE; {/* This is the HTML code for the vertical 3 dots */}
                    </div>

                    {/* Menu options, visible when isMenuOpen is true */}
                    {isMenuOpen[image._id] && (
                      <div className="menu-options">
                        <ul>
                          <button style={{border:'none' ,fontWeight:"bold", background:'none', cursor:'pointer'}} onClick={() => handleDelete(image._id)}>Delete Post</button>


                        </ul>
                      </div>
                    )}
                  </div>

                </div>
                <img
                  style={{ display: 'flex', margin: 'auto', borderRadius: 1, marginTop: -10, height: 200 }}
                  src={image.imageUrl}
                  alt="Post"
                />
                <p style={{ color: 'black', margin: 'auto', fontWeight: '500', marginLeft: 0, marginTop: 10, padding: 20 }}>
                  <span style={{ fontWeight: 'bold', color:'white' }}>{image.userName}</span> - {image.description}
                </p>
                <div style={{ display: 'flex', margin: 20, marginLeft: 20, gap: 19, cursor: 'pointer' }}>


                  {image.userHasLiked ?

                    <i id='liked' onClick={() => handleLike(image._id)} class="bi bi-heart-fill"></i>

                    : <i id='unliked' onClick={() => handleLike(image._id)} class="bi bi-heart"></i>}

                  <p style={{ fontWeight: 'bold', color:'white'}}>{image.likeCount} likes</p>
                </div>

              </div>
            ))}


          </div>
        </>
      ) : (
        <h1 style={{ color: 'grey', display: 'flex', justifyContent: 'center', marginTop: 100 }}>No Post</h1>
      )}
    </>
  );
}

export default Protfolio;
