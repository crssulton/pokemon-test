import React, {useState, useContext} from "react";
import loadable from "@loadable/component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { css } from '@emotion/css'
import PokemonContext from "../context/PokemonContext"

const ModalRelease = loadable(() => import("./ModalRelease"));

function CardPokemon(props) {
  const {releaseMyPokemon} = useContext(PokemonContext)
  const { history, pokemon, isOwned } = props;
  const [showModal, setShowModal] = useState(false)

  const generateNumber = (no) => {
    if(no){
      no = no.toString()
      for (let index = 0; index <= 4 - no.length; index++) {
        no = `0${no}`
      }
    }
    return no
  }

  const handleReleasePokemon = () => {
    releaseMyPokemon(pokemon.code)
    setShowModal(false)
  }

  const generateName = (name) => {
    if(isOwned !== false){
      if(name.length > 2){
        name = name.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
          return a.toUpperCase();
        })
      } else {
        name = name.toUpperCase()
      }
    }
    return name
  }

  return (
    <div className="col-4 col-lg-2">
      <div className="card-pokemon" >
        {
          // isOwned !== false &&
          <div className="header">
            <div className={css`
              display: flex;
              align-items: center;
            `}>
              {
                isOwned || isOwned === false ? 
                <img 
                  src="https://s3-ap-southeast-1.amazonaws.com/email-template.pengenbisa.com/ball.png" 
                  alt="ball" 
                  className={css`
                    height: 12px;
                    width: 12px;
                    margin-left: 5px
                  `}
                /> :
                <div className="none-active"/>
              }

              {
                isOwned !== false &&
                <div className="number">{`No. ${generateNumber(pokemon.newId || pokemon.id)}`}</div>
              }
            </div>
            
            {
              isOwned === false &&
              <div className="release-icon" onClick={() => setShowModal(!showModal)}>
                <FontAwesomeIcon className="icon" icon={faShareSquare}/>
              </div>
            }
          </div>
        }
        <div onClick={() => 
          history.push(`/detail?name=${pokemon.name}${isOwned === false ? `&code=${pokemon.code}` : ''}`
        )}>
          <img className="image" src={pokemon.image} alt={pokemon.newName || pokemon.name} />
          <div className="title">
          {
            generateName(pokemon.newName || pokemon.name)
          }
          </div>
        </div>
      </div>
      {
        showModal &&
        <ModalRelease 
          handleYes={() => handleReleasePokemon()}
          setShowModal={() => setShowModal(!showModal)}
        />
      }
    </div>
  );
}

export default CardPokemon;
