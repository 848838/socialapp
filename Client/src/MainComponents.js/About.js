import React, { useEffect, useId, useState } from 'react'
import bg from '../Assets/text bg.jpg'
import asset from '../Assets/inkpx-curved-text.png'
import Footer from './Footer'
import axios from 'axios';
import defaultImage from '../Assets/default.webp'; // Path to your default image
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import ProfileSearch from './ProfileSearch';

function About() {
    const [uploadedPost, setUploadedPost] = useState([])

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [sortedUsers, setSortedUsers] = useState([]);

    useEffect(() => {
        // Function to fetch signed-in users
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/all-user-data'); // Fetch all users from the backend
                setUsers(res.data.data);
                setLoading(false);
                const sorted = [...res].sort((a, b) => a.name.localeCompare(b.name));
                setSortedUsers(sorted);
            } catch (err) {
                console.error('Error fetching users:', err);
                setLoading(false);
            }
        };

        fetchUsers(); // Fetch users on component mount
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    const handleUserClick = (userId) => {
        navigate(`/Profile/${userId}`); // Navigate to the clicked user's profile
    };

    const isNewUser = (index) => {
        // Assume the first few users in the sorted list are the newest
        const NEW_USER_THRESHOLD = 10; // Example threshold for "new" users
        return index < NEW_USER_THRESHOLD;
    };
    ;
    return (
        <>
            <ProfileSearch />
            <h1 style={{ color: 'white', marginTop: 100, marginLeft: 30 }}> Friend Suggestions</h1>

            <div style={{display:'flex', flexWrap:'wrap'}} className="image-flow-container">
                {users.map((user, index) => (

                    <div style={{ display: 'flex', border: '1px solid rgb(61,68,77)', height: 100, width: '30 %', marginTop: 10, backgroundColor: 'rgb(13,17,23)', borderRadius: 10, flexWrap:'wrap' }}>


                        {
                            users ? (
                                <img style={{ display: 'flex', height: 50, width: 50, borderRadius: 100, margin: 'auto' }} src={user.profileImage ? user.profileImage : defaultImage} />

                            ) : (
                                (<img style={{ height: 50, width: 50, borderRadius: 100, margin: 'auto' }} src={defaultImage} />)
                            )
                        }
                        <div style={{ display: 'flex', margin: 'auto' }}>



                        </div>

                        <div key={user._id} onClick={() => handleUserClick(user._id)} style={{ cursor: 'pointer', margin: ' auto', display: 'flex', fontWeight: 'bold' }}>
                            <h3 style={{ color: 'white' }}>{user.name}</h3>
                            {isNewUser(index) && <span style={{ color: 'red', marginLeft: 30 }}> (New User)</span>}
                        </div>

                    </div>

                ))}
            </div>

        </>
    )
}

export default About



