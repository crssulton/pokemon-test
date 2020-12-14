import FetchApi from "../../services/fetchApi";

export const GET_POKEMON_REQUEST = 'GET_POKEMON_REQUEST';
export const GET_POKEMON_LIST = 'GET_POKEMON_LIST';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const GET_POKEMON_BY_SEARCH = 'GET_POKEMON_BY_SEARCH';
export const GET_MY_POKEMON = 'GET_MY_POKEMON';
export const GET_POKEMON_FAILURE = 'GET_POKEMON_FAILURE';

export const getPokemonList = (limit = 9, offset = 1, pokemons = []) => {
  return async (dispatch) => {
    if(pokemons.length === 0) {
      dispatch({ type: GET_POKEMON_REQUEST })
    }

    let query = `query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        results {
          id
          name
          image
        }
      }
    }`
  
    let response = await FetchApi(query, { limit, offset })
    if(response.status){
      return dispatch({
        type: GET_POKEMON_LIST,
        data: response.data,
        pokemons
      })
    } else {
      return dispatch({
        type: GET_POKEMON_FAILURE,
        message: response.message
      })
    }
  }
}

export const getPokemonByName = (name, isSearch) => {
  return async (dispatch) => {
    dispatch({ type: GET_POKEMON_REQUEST })

    let query = `query pokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        sprites { front_default }
        height
        weight
        types { type { name } }
        species { name }
        stats {
          base_stat
          effort
          stat { name }
        }
      }
    }`
  
    let response = await FetchApi(query, { name })
    if(response.status && response.data.pokemon.id){
      if(isSearch) {
        return dispatch({
          type: GET_POKEMON_BY_SEARCH,
          data: response.data,
        })
      }

      return dispatch({
        type: GET_POKEMON_BY_NAME,
        data: response.data,
      })
    } else {
      return dispatch({
        type: GET_POKEMON_FAILURE,
        message: response.message
      })
    }
  }
}

export const getMyPokemon = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_POKEMON_REQUEST
    })

    let response = JSON.parse(localStorage.getItem('mypokemons'))
    
    if(response){
      return dispatch({
        type: GET_MY_POKEMON,
        data: response
      })
    } else {
      return dispatch({
        type: GET_POKEMON_FAILURE,
        message: "Data is empty"
      })
    }
  }
}

export const setMyPokemon = (newData) => {
  return async (dispatch) => {
    dispatch({
      type: GET_POKEMON_REQUEST
    })
    
    if(newData){
      let dataPokemon = JSON.parse(localStorage.getItem('mypokemons')) || []
      dataPokemon.push(newData)
      
      localStorage.setItem('mypokemons', JSON.stringify(dataPokemon))

      return dispatch({
        type: GET_MY_POKEMON,
        data: dataPokemon
      })
    } else {
      return dispatch({
        type: GET_POKEMON_FAILURE,
        message: "Data is empty"
      })
    }
  }
}

export const releaseMyPokemon = (code = '') => {
  return async (dispatch) => {
    dispatch({
      type: GET_POKEMON_REQUEST
    })
    
    let dataPokemon = JSON.parse(localStorage.getItem('mypokemons'))
    if(dataPokemon){
      dataPokemon = dataPokemon.filter(items => {return items.code !== code})
      localStorage.setItem('mypokemons', JSON.stringify(dataPokemon))

      return dispatch({
        type: GET_MY_POKEMON,
        data: dataPokemon
      })
    } else {
      return dispatch({
        type: GET_POKEMON_FAILURE,
        message: "Data is empty"
      })
    }
  }
}