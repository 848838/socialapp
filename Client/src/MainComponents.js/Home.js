import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import defaultImage from '../Assets/default.webp'; // Path to your default image
import moment from 'moment';
import Skeleton from '../Skeleton';
import io from 'socket.io-client';
import { Modal } from '@mui/material'; // Import MUI Modal

function Home({ userId }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comments, setComments] = useState([]);

  const token = localStorage.getItem('authtoken');
  const navigate = useNavigate();

  // Fetch the images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/images', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };
    fetchImages();
  }, [token]);
  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:5000/like/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImages((prevImages) =>
        prevImages.map((post) =>
          post._id === postId ? { ...post, likeCount: response.data.likeCount, userHasLiked: response.data.userHasLiked } : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  // Function to handle comment icon click
  const handleCommentClick = async (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);  // Open the modal when comment icon is clicked

    // Fetch comments for the selected image/post
    const fetchedComments = await fetchComments(image._id);
    setComments(fetchedComments);
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:5000/post/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInput((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:5000/post/${postId}/comments`, {
        commentText: commentInput[postId] || '',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update comments with the new one
      setComments((prev) => [...prev, response.data]);

      // Clear comment input field
      setCommentInput((prev) => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);  // Close the modal
    setSelectedImage(null);  // Clear selected image
  };
  const handleUserClick = (userId) => {
    navigate(`/Profile/${userId}`); // Navigate to the clicked user's profile
};

  if (loading) {
    return (
      <div style={{ marginTop: 100 }} className='image-flow-container'>
        {Array.from({ length: 100 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>

      {
        !localStorage.getItem('authtoken') ? (<h1 style={{ color: 'white' }}>Login please to view posts </h1>) : (
          <h1 style={{ color: 'white' }}>explore</h1>

        )
      }
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 70, backgroundColor: 'rgb(13,17,23)' }} >
        {images.map((image) => (
          <div key={image._id} style={{ border: '1px solid rgb(61,68,77)', height: '100%', width: 300, backgroundColor: 'rgb(21,27,35)', borderRadius: 10, margin: 'auto', marginTop: 100 }}>
            <div style={{ display: 'flex', margin: 'auto' }}>
              <img
                style={{ width: 40, height: 40, borderRadius: 100, margin: 19, marginLeft: 20 }}
                src={image.profileImage || defaultImage}
                alt="Profile"
              />
              <div onClick={() => navigate(`/Profile/${image.userId}`)} style={{ cursor: 'pointer', margin: 'auto', fontWeight: 'bold', color: "black" }}>
                <h4  style={{ color: 'white' }}>{image.userName}</h4>
              </div>
              <p style={{ color: 'grey', margin: 'auto', fontWeight: '500', marginLeft: 10, fontSize: 13 }}>
                {moment(image.createdAt).fromNow()}
              </p>
            </div>
            <img
              style={{ cursor: 'pointer', margin: 'auto', height: 200, width: '100%' }}
              src={image.imageUrl}
              onClick={() => setSelectedImage(image)} // Set image in modal
              alt="Post"
            />
            <div style={{ display: 'flex', margin: 20, marginLeft: 20, gap: 19, cursor: 'pointer' }}>
              {image.userHasLiked ?
                <i id='liked' onClick={() => handleLike(image._id)} className="bi bi-heart-fill"></i>
                : <i id='unliked' onClick={() => handleLike(image._id)} className="bi bi-heart"></i>}
              <p style={{ fontWeight: 'bold', color:'white'}}>{image.likeCount} likes</p>
              <i 
                className="bi bi-chat"
                style={{ fontSize: 28, marginTop: -10 ,color:'white' }}
                onClick={() => handleCommentClick(image)} // Open comment modal
              ></i>
            </div>
          </div>
        ))}
      </div>


      {/* Modal to display comments */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'black',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '400px',
          }}
        >
          {selectedImage && (
            <>
              <h2>Comments for {selectedImage.userName}'s post</h2>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {comments.map((comment) => (
                  <div key={comment._id} style={{ display: 'flex', marginBottom: '30px' }}>
                    <img
                      src={comment.userId?.profileImage || defaultImage}
                      alt="Profile"
                      style={{ width: 30, height: 30, borderRadius: '50%' }}
                    />
                    <span tyle={{ fontWeight: 'bold', marginLeft: 10 }}>
                      {comment.userId?.name || 'Anonymous'}
                    </span>    :
                    <p style={{ display: 'flex', marginLeft: 10 }}>{comment.commentText}</p>
                  </div>
                ))}

              </div>
              <input
                type="text"
                value={commentInput[selectedImage._id] || ''}
                onChange={(e) => handleCommentInputChange(selectedImage._id, e.target.value)}
                placeholder="Add a comment..."
                style={{ width: '100%', padding: '10px', borderRadius: '5px', marginTop: '10px', marginLeft: -10 , backgroundColor: 'rgb(21,27,35)', color:'white' }}
              />
              <button
                onClick={() => handleCommentSubmit(selectedImage._id)}
                style={{ cursor: 'pointer', marginTop: '10px', padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px' }}
              >
                Comment
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Home;
