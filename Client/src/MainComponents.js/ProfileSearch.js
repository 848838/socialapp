import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import defaultImage from '../Assets/default.webp'; // Path to your default image

function ProfileSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false); // Track whether a search has been made
    const navigate = useNavigate();


    const handleSearch = async () => {
        setSearched(true); // Indicate that a search has been made
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/Profile/Search`, {
                params: { query }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleUserClick = (name) => {
        navigate(`/Profile/${name}`); // Navigate to the clicked user's profile
    };

    return (
        <div style={{  backgroundColor: 'rgb(13,17,23)' }}>
            <div style={{display:'flex',margin:'auto'}}>
                
            <input style={{ border: '1px solid rgb(61,68,77)', margin: 'auto', marginTop: 30, padding: 10, borderRadius: 10, fontWeight: 'bold', color: 'white', fontSize: 20, width: '50%',backgroundColor: 'rgb(13,17,23)'}}
                type="text"
                placeholder="Search User..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setSearched(false); // Reset search state when typing
                }}
                />
            <button style={{ backgroundColor:'rgb(38,44,54)', border: '1px solid grey', margin: 'auto', marginTop:30, padding: 10, borderRadius: 10, fontWeight: 'bold', color: 'white', fontSize: 20,marginLeft:-200 }} onClick={handleSearch}>Search</button>
                </div>

            <div>
                <div className='image-flow-container'>
                    {!searched ? (
                        <p ></p>
                    ) : results.length > 0 ? (
                        <ul>
                            {results.map((city, index) => (
                                <div style={{ display: 'flex', border: '1px solid rgb(61,68,77)', height: 100, width: '40vh', marginTop: 30, backgroundColor: 'rgb(13,17,23)', borderRadius: 10, margin: 'auto', }}>


                                    {
                                        city ? (
                                            <img style={{ display: 'flex', height: 50, width: 50, borderRadius: 100, margin: 'auto' }} src={city.profileImage ? city.profileImage : defaultImage} />

                                        ) : (
                                            (<img style={{ height: 50, width: 50, borderRadius: 100, margin: 'auto' }} src={defaultImage} />)
                                        )
                                    }
                                    <div style={{ display: 'flex', margin: 'auto' }}>



                                    </div>
                                    <div key={city._id} onClick={() => handleUserClick(city._id)} style={{ cursor: 'pointer', margin: ' auto', display: 'flex' }}>


                                        <h3 style={{ color: 'white', display: 'flex', gap: 30, margin: 'auto' }}>{city.name}</h3>


                                    </div>

                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ fontSize: 30, fontWeight: 'bold', color: 'grey' }}>No Username Found</p>
                    )}




                </div>
            </div>
        </div>
    )
}

export default ProfileSearch