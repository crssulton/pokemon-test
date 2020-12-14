import React, {useState, useContext} from "react";
import loadable from "@loadable/component";
import PokemonContext from "../context/PokemonContext"
import Radar from 'react-d3-radar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faAtom, faShareSquare, faGavel } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import { css, cx } from '@emotion/css';

const ModalRelease = loadable(() => import("./ModalRelease"));
const ModalSetName = loadable(() => import("./ModalSetName"));
const ModalCatch = loadable(() => import("./ModalCatch"));
const ModalConditions = loadable(() => import("./ModalConditions"));

function DetailPokemon(props) {
  const {myPokemon, releaseMyPokemon, setMyPokemon} = useContext(PokemonContext)
  const { history, pokemon = {}, searchCode } = props;
  const [showModal, setShowModal] = useState(false)
  const [showModalSetName, setShowModalSetName] = useState(false)
  const [showModalCatch, setShowModalCatch] = useState(false)
  const [showModalStatus, setShowModalStatus] = useState(false)
  const [catchRandom, setCatchRandom] = useState(false)

  let name = pokemon.name
  if(searchCode) {
    let pokemon_ = myPokemon.find(items => {return items.code === searchCode})
    name = pokemon_.newName
  }

  const generateNumber = (no) => {
    if(no){
      no = no.toString()
      for (let index = 0; index <= 5 - no.length; index++) {
        no = `0${no}`
      }
    }
    return no
  }

  const generateName = (name = '') => {
    name = name.replace(/-/g, ' ')
    if(!searchCode){
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

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`

  let variables = [{key: '', label: ''}]
  let values = {}
  
  if(pokemon.stats){
    variables = []
    pokemon.stats.forEach(stats => {
      variables.push({key: stats.stat.name, label: `${generateName(stats.stat.name)} [${stats.base_stat}]`})
      values[stats.stat.name] = stats.base_stat
    });
  }

  const handleCatchPokemon = (data, newName) => {
    let payload = {
      id: data.id,
      image: data.sprites.front_default,
      name: data.name,
      newName: newName,
      code: uuidv4()
    }
    setMyPokemon(payload)
    setShowModalSetName(false)
    history.push('/mypokemons')
  }

  const handleReleasePokemon = () => {
    releaseMyPokemon(searchCode)
    setShowModal(false)
    history.push('/mypokemons')
  }

  let color = {
    normal: '#f7bfc',
    fighting: '#f9d56e',
    flying: '#a2d5f2',
    poison: '#a536ff',
    ground: '#gb7171',
    rock: '#gb7171',
    bug: '#e8505b',
    ghost: '#a536ff',
    steel: '#ebecf1',
    fire: '#ff9a36',
    water: '#639fff',
    electric: '#ffd700',
    ice: '#92e6e6',
    dragon: '#3a3d44',
    dark: '#3a3d44',
    fairy: '#e8505b',
    unknown: '#3a3d44',
    shadow: '#4a4a4a',
  }

  return (
    <div className="detail-page">
      <div className="cart-left">
        <div className="back-detail" onClick={() => history && history.goBack()}>
          <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
        </div>
        <div className="picture">
          <img src={image} alt={name} />
        </div>
        <div className="card">
          <div className="title-page">
            DETAIL POKEMON
          </div>
          <div className="title">
            <div className="number">{`No. ${generateNumber(pokemon.id)}`}</div>
            <div className={css`
              height: 30px;
              width: 1px;
              background-color: #CDCDCD
            `}/>
            <div className="name">
              {generateName(name)}
            </div>
          </div>
          
          <div 
            className={css`
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
            color: gray;
            font-size: 14px
          `}>
            <div>{`Height : ${pokemon.height/10} M`}</div>
            <div>{`Weight : ${pokemon.weight/10} KG`}</div>
          </div>

          <div className={css`
              height: 0.5px;
              margin: 5px;
              background-color: #CDCDCD
          `}/>

          <div className={css`
            display: flex;
            justify-content: center;
            font-size: 14px;
            margin-top: 5px;
          `}>
            {
              pokemon.types && 
              pokemon.types.map((type, key) => (
                <div key={key} className={cx("card-type", css`
                color: ${color[type.type.name]};
                border-color: ${color[type.type.name]};
              `)}>
                  <FontAwesomeIcon className="icon" icon={faAtom}/>
                  <span>{type.type.name.toUpperCase()}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className="card-right">
        <div className="statistic">
          <Radar
            width={500}
            height={500}
            padding={70}
            domainMax={200}
            data={{
              variables: variables,
              sets: [
                {
                  key: 'pokemon',
                  label: 'Statistic',
                  values: values,
                }
              ],
            }}
          />
        </div>

        {
          !searchCode ? 
          <div className="btn-costume" onClick={() => setShowModalCatch(!showModalCatch)}>
            <FontAwesomeIcon className="icon" icon={faGavel}/>
            <span>Catch</span>
          </div> :
          <div className="btn-costume" onClick={() => setShowModal(!showModal)}>
            <FontAwesomeIcon className="icon" icon={faShareSquare}/>
            <span>Release</span>
          </div>
        }
      </div>

      {
        showModal &&
        <ModalRelease 
          handleYes={() => handleReleasePokemon()}
          setShowModal={() => setShowModal(!showModal)}
        />
      }

      {
        showModalSetName &&
        <ModalSetName
          handleYes={(newName) => handleCatchPokemon(pokemon, newName)}
          setShowModal={() => setShowModalSetName(!showModalSetName)}
        />
      }

      {
        showModalCatch &&
        <ModalCatch 
          setShowModal={(status, catchStatus) => {
            setShowModalCatch(status)
            setShowModalStatus(true)
            setCatchRandom(catchStatus)
          }}
        />
      }

      {
        showModalStatus &&
        <ModalConditions 
          catchRandom={catchRandom}
          setShowModal={(status, catchStatus) => {
            setShowModalStatus(status)
            if(catchStatus) setShowModalSetName(true)
          }}
        />
      }
    </div>
  );
}

export default DetailPokemon;
