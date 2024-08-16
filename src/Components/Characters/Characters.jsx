
import React, { useState, useEffect } from 'react';
import './Characters.css'

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://potterapi-fedeperin.vercel.app/en/characters');
      const data = await response.json();
      setCharacters(data);
      setFilteredCharacters(data); 
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterCharacters(event.target.value);
  };

  const filterCharacters = (query) => {
    if (!query) {
      setFilteredCharacters(characters);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = characters.filter((character) =>
      character.fullName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCharacters(filteredData);
  };

  return (
    
    
      <div className="books-container ">
  
  <input
      placeholder="Search Character  Name Here"
      className="searchInput"
      value={searchTerm}
          onChange={handleSearch}
        />
    
      <ul className="characters-list d-flex flex-wrap justify-content-center">
        {filteredCharacters.map((character) => (
          <li key={character._id}>
            <h3>{character.fullName}</h3>
            <p> {character.nickname}</p>
           
            <img src= {character.image}/>
            <p>{character.birthdate}</p>
            
            <p> </p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Characters;
