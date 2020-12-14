import React, { useEffect, useContext } from "react";
import loadable from "@loadable/component";
import PokemonContext from "../context/PokemonContext"
import InfiniteScroll from "react-infinite-scroll-component";

const CardPokemon = loadable(() => import("../components/CardPokemon"));
const Loading = loadable(() => import("../components/Loading"));
const DataEmpty = loadable(() => import("../components/DataEmpty"));
const Search = loadable(() => import("../components/Search"));

function PokemonList(props) {
  const {loading, pokemons, dataLength, myPokemon, fetchMoreData} = useContext(PokemonContext)
  
  return (
    <div className="pokemon-list">
      <Search />
      <div className="pokemon-header">
        <div className="header">
          <div className="title">
            POKEMON LIST
          </div>
          <div className="owned">
            <img src="https://s3-ap-southeast-1.amazonaws.com/email-template.pengenbisa.com/ball.png" alt="ball" />
            {`[ ${myPokemon.length} ]`}
          </div>
        </div>
      </div>
      {
        loading ? <Loading /> :
        <div>
          {
            pokemons && pokemons.length > 0 ?
            <InfiniteScroll
              dataLength={pokemons.length}
              next={fetchMoreData}
              hasMore={pokemons.length === dataLength ? false : true}
            >
            <div className="row list-card-pokemon">
              {
                pokemons.map((item, key) => (
                  <CardPokemon 
                    key={key} 
                    pokemon={item} 
                    history={props.history} 
                    isOwned={myPokemon.find(o => {return o.id === item.id})}
                  />
                ))
              }
            </div>
            </InfiniteScroll> :
            <DataEmpty />
          }
        </div>
      }
    </div>
  )
}

export default PokemonList;
