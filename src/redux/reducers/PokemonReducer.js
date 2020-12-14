import {
    GET_POKEMON_FAILURE,
    GET_POKEMON_REQUEST,
    GET_POKEMON_LIST,
    GET_POKEMON_BY_NAME,
    GET_POKEMON_BY_SEARCH,
    GET_MY_POKEMON
} from '../actions/PokemonAction';

const defaultState = {
    loading: true,
    success: false,
    error: false,
    pokemons: null,
    pokemonDetail: null
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case GET_POKEMON_REQUEST:
            return Object.assign({}, state, defaultState);
        case GET_POKEMON_LIST:
            return Object.assign({}, state, {
                loading: false,
                success: true,
                error: false,
                pokemons: action.pokemons.concat(action.data.pokemons.results),
                dataLength: action.data.pokemons.count
            });
        case GET_POKEMON_BY_NAME:
            return Object.assign({}, state, {
                loading: false,
                success: true,
                error: false,
                pokemonDetail: action.data.pokemon,
            });
        case GET_POKEMON_BY_SEARCH:
            return Object.assign({}, state, {
                loading: false,
                success: true,
                error: false,
                pokemons: [{
                    ...action.data.pokemon, 
                    image: action.data.pokemon.sprites && 
                    action.data.pokemon.sprites.front_default
                }],
            });
        case GET_MY_POKEMON:
            return Object.assign({}, state, {
                loading: false,
                success: true,
                error: false,
                myPokemon: action.data,
            });
        case GET_POKEMON_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                success: false,
                error: true,
                message: action.message,
                pokemons: [],
                pokemonDetail: null
            });
        default:
            return state;
    }
}