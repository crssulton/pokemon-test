import React, { useEffect, useContext } from "react";
import loadable from "@loadable/component";
import PokemonContext from "../context/PokemonContext"

const DetailPokemon = loadable(() => import("../components/DetailPokemon"));
const Loading = loadable(() => import("../components/Loading"));

function PokemonDetail(props) {
  const {loading, pokemonDetail, getPokemonByName} = useContext(PokemonContext)
  const { history } = props

  const url = new URL(window.location.href);
  const searchName = url.searchParams.get("name");
  const searchCode = url.searchParams.get("code");

  if(!searchName) history && history.goBack()

  useEffect(() => {
    getPokemonByName(searchName, false);
  }, []);

  if (loading) {
    return <Loading />
  } else {
    return (
      <div>
        {
          pokemonDetail &&
          <DetailPokemon 
            pokemon={pokemonDetail} 
            history={history} 
            searchCode={searchCode}
          />
        }
      </div>
    )
  }
}

export default PokemonDetail;
