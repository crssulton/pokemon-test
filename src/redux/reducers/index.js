import { combineReducers } from "redux";
import pokemonReducer from "./PokemonReducer";

const rootReducer = combineReducers({
  pokemonReducer
});

export default rootReducer;
