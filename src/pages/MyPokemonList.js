import React, { useContext, useEffect, useState } from "react";
import loadable from "@loadable/component";
import PokemonContext from "../context/PokemonContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const CardPokemon = loadable(() => import("../components/CardPokemon"));
const DataEmpty = loadable(() => import("../components/DataEmpty"));

function MyPokemonList(props) {
  const {myPokemon} = useContext(PokemonContext)
  const [pokemon, setPokemon] = useState(myPokemon)
  const [txtSearch, setSearch] = useState('')

  useEffect(() => {
    setPokemon(myPokemon)
  }, [myPokemon])
  
  const handleSearch = (text) => {
    setSearch(text)
    let pokemon = []
    if(text !== ""){
      pokemon = myPokemon.filter(items => {return items.newName.includes(text)})
    } else {
      pokemon = myPokemon
    }
    setPokemon(pokemon)
  }
  
  return (
    <div className="pokemon-list">
      <div className="pokemon-header">
        <div className="header">
          <div className="title">
            MY POKEMON LIST
          </div>
          <div className="owned">
            <img src="https://s3-ap-southeast-1.amazonaws.com/email-template.pengenbisa.com/ball.png" alt="ball" />
            {`[ ${myPokemon.length} ]`}
          </div>
        </div>
      </div>
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
      {
        pokemon && pokemon.length > 0 ?
        <div className="row list-card-pokemon">
          {
            pokemon.map((item, key) => (
              <CardPokemon 
                key={key} 
                pokemon={item} 
                history={props.history} 
                isOwned={false}
              />
            ))
          }
        </div> :
        <DataEmpty />
      }
    </div>
  )
}

export default MyPokemonList;
