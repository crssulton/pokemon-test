import React, { Component } from 'react';

export default React.createContext({
  pokemon: [],
  myPokemon: [],
  loading: true,
  success: false,
  error: false,
  pokemons: null,
  dataLength: 0,
  pokemonDetail: null,
  history: {},
  getPokemonByName: (name, isSearc) => {}, 
  getPokemonList: (limit, offset) => {},
  releaseMyPokemon: (code) => {},
  setMyPokemon: (data) => {},
})
