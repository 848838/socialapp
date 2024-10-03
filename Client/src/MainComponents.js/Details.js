import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// /Profile/:Shorts
function Details() {

  const { ShortsId } = useParams(); // Get userId from URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/Details/${ShortsId}`)
        setProfile(res.data);
        console.log(res.data);

        setLoading(false);


      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [ShortsId]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>User not found</div>;

  return (
    <div><h1 style={{color:'white'}}>{profile.name}</h1></div>
  )
}

export default Details