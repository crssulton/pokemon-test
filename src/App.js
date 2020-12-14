import React, {useEffect} from "react";
import { connect } from "react-redux";
import { Routes } from "./config/routes";
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apiConfig';
import { getMyPokemon, getPokemonList } from "./redux/actions/PokemonAction";
import "./assets/scss/style.scss";

function App(props) {
    useEffect(() => {
        props.getMyPokemon()
        props.getPokemonList(14, 1);
    }, [])
    
    return (
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    );
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
        getMyPokemon: () => {
            dispatch(getMyPokemon())
        },
        getPokemonList: (limit, offset, pokemons) => {
            dispatch(getPokemonList(limit, offset, pokemons))
        }
    };
};
  

export default connect(mapStateToProps, mapDispatchToProps)(App);
