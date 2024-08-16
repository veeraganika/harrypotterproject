// import React from 'react'

// const Spells = () => {
//   return (
//     <div>
//       Spells page
//     </div>
//   )
// }

// export default Spells
import React, { useState, useEffect } from 'react';
// import'./Spells.css'

const Spells = () => {
  const [spells, setSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSpells();
  }, []);

  const fetchSpells = async () => {
    try {
      const response = await fetch('https://potterapi-fedeperin.vercel.app/en/spells');
      const data = await response.json();
      setSpells(data);
      setFilteredSpells(data); 
    } catch (error) {
      console.error('Error fetching spells:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterSpells(event.target.value);
  };

  const filterSpells = (query) => {
    if (!query) {
      setFilteredSpells(spells);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = spells.filter((spell) =>
      spell.spell.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredSpells(filteredData);
  };

  return (
    <div className="books-container ">

    <input
        placeholder="Search spell  Name"
        className="searchInput"
        value={searchTerm}
            onChange={handleSearch}
          />
      <ul className="spells-list ">
        {filteredSpells.map((spell) => (
          <li key={spell._id}>
            <h3>{spell.spell}</h3>
            <p>{spell.use}</p>
            <p>{spell.index}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Spells;