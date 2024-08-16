
import React, { useState, useEffect } from 'react';
import './Houses.css';
const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await fetch('https://potterapi-fedeperin.vercel.app/en/houses');
      const data = await response.json();
      setHouses(data);
      setFilteredHouses(data); 
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterHouses(event.target.value);
  };

  const filterHouses = (query) => {
    if (!query) {
      setFilteredHouses(houses);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = houses.filter((house) =>
      house.founder.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredHouses(filteredData);
  };

  return (
    <div className="books-container display-flex flex-wrap ">

    <input
        placeholder="Search  Founder Name Here"
        className="searchInput"
        value={searchTerm}
            onChange={handleSearch}
          />
      <ul className="houses-list display-flex  mt-5 flex-wrap">
        {filteredHouses.map((house) => (
          <li key={house._id}>
            <h3>Founder: {house.founder}</h3><br/>
             <p>index:{house.index}</p>
            <p>emoji:{house.emoji}</p>
            <p> animal:{house.animal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Houses;
