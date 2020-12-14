import React, { Component } from 'react';
import PokemonContext from './PokemonContext';
import { connect } from "react-redux";
import { getPokemonList, getPokemonByName, releaseMyPokemon, setMyPokemon} from "../redux/actions/PokemonAction";

class GlobalState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      myPokemon: [],
      loading: true,
      success: false,
      error: false,
      pokemons: [],
      dataLength: 0,
      pokemonDetail: null,
      history: {},
    };
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props !== prevProps) {
      let data = {}
      for (const key in this.props) {
        data[key] = this.props[key]
        if(data[key] === null || data[key] === undefined) {
          data[key] = this.state[key]
        }
      }
      this.setState(data)
    }
  }

  fetchMoreData() {
    let pokemons = this.state.pokemons
    if(pokemons){
      this.props.getPokemonList(26, pokemons.length + 1, pokemons);
    }
  }

  render() {
    return (
      <PokemonContext.Provider 
        value={{
          ...this.state, 
          fetchMoreData: () => this.fetchMoreData(),
          getPokemonList: (limit, offset) => this.props.getPokemonList(limit, offset),
          getPokemonByName: (name, isSearch) => this.props.getPokemonByName(name, isSearch),
          releaseMyPokemon: (code) => this.props.releaseMyPokemon(code),
          setMyPokemon: (data) => this.props.setMyPokemon(data),
      }}>
        {this.props.children}
      </PokemonContext.Provider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      pokemons: state.pokemonReducer.pokemons,
      pokemonDetail: state.pokemonReducer.pokemonDetail,
      loading: state.pokemonReducer.loading,
      success: state.pokemonReducer.success,
      error: state.pokemonReducer.error,
      dataLength: state.pokemonReducer.dataLength,
      myPokemon: state.pokemonReducer.myPokemon || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getPokemonList: (limit, offset, pokemons) => {
      dispatch(getPokemonList(limit, offset, pokemons))
    },
    getPokemonByName: (name, isSearch) => {
      dispatch(getPokemonByName(name, isSearch))
    },
    releaseMyPokemon: (code) => {
      dispatch(releaseMyPokemon(code))
    },
    setMyPokemon: (data) => {
      dispatch(setMyPokemon(data))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalState);
