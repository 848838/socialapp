import axios from 'axios';
import React, { useEffect, useState } from 'react'


function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false); // Track whether a search has been made

  const [items, setItems] = useState([]);
  const handleSearch = async () => {
    setSearched(true); // Indicate that a search has been made
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/search`, {
        params: { query }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Shorts');
        setItems(response.data);


      } catch (error) {
        console.error('Error fetching data', error);


      }
    };

    fetchData();
  }, []);
  return (
    <div style={{backgroundColor:'black'}}>
      <input style={{border:'1px solid grey', margin:'auto', display:'flex', marginTop:30, padding:10, borderRadius:10 , fontWeight:'bold', color:'black', fontSize:20, width:500}}
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSearched(false); // Reset search state when typing
        }}
      />
      <button  style={{border:'1px solid grey', margin:'auto', display:'flex', marginTop:10, padding:10, borderRadius:10 , fontWeight:'bold', color:'black', fontSize:20,}} onClick={handleSearch}>Search</button>

      <div>
        <div className='image-flow-container'>
          {!searched ? (
            <p ></p>
          ) : results.length > 0 ? (
            <ul>
              {results.map((city, index) => (
                <div style={{ border: '1px solid grey', height: 300, width: 300 }}>


                  <img className='image-flow-container img' src={city.Short_url} />


                  <div style={{ display: 'flex', gap: 100 }}>



                    <h3 style={{ marginLeft: 30, marginTop: 20 }}>{city.name} </h3>
                    <div style={{ display: 'flex', height: 20, marginTop: 26, marginLeft: 10, gap: 15 }}>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-clipboard-fill"></i>
                    </div>

                  </div>

                </div>
              ))}
            </ul>
          ) : (
            <p style={{fontSize:30, fontWeight:'bold', color:'grey'}}>No cities found</p>
          )}




        </div>
      </div>
    </div>
  )
}

export default Search

