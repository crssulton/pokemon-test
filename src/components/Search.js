import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PokemonContext from "../context/PokemonContext"

function Search(props) {
  const {getPokemonByName, getPokemonList} = useContext(PokemonContext)
  const [txtSearch, setSearch] = useState('')
  const handleSearch = (text) => {
    text = (Number(text) || text).toString()
    setSearch(text)
    if(text !== ""){
      getPokemonByName(text, true);
    } else {
      getPokemonList(26, 1);
    }
  }

  return (
    <div className="search-nav">
      <div className="search"> 
        <input type="text" aria-label="Search" onChange={(e) => handleSearch(e.target.value)}/>
        <FontAwesomeIcon 
          onClick={() => handleSearch(txtSearch)}
          className="icon"
          icon={faSearch}
        />
      </div>
    </div>
  );
}

export default Search;
