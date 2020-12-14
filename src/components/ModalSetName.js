import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PokemonContext from "../context/PokemonContext"
import { css } from '@emotion/css';

export default function ModalSetName(props) {
  const {myPokemon} = useContext(PokemonContext)
  const [newName, setNewName] = useState('')
  const [btnDisable, setBtnDisable] = useState(true)

  const handleChechName = (name) => {
    let check = myPokemon.find(items => {return items.newName.startsWith(name)})
    if(check) setBtnDisable(true)
    else setBtnDisable(false)
  }

  return (
    <div className="modalContainer">
      <div className="modal">
        <div className="header">
          <div>New Nickname</div>
          <div onClick={() => props.setShowModal()}>
            <FontAwesomeIcon className="icon" icon={faTimes}/>
          </div>
        </div>

        <input type="text" aria-label="Search" className="input-name" onChange={(e) => {
          setNewName(e.target.value)
          handleChechName(e.target.value)
        }}/>

        {
          btnDisable && 
          <div className={css`
            color: red;
            font-size: 12px;
            text-align: left;
            margin-bottom: 10px;
            margin-top: -7px;
            margin-left: 10px
          `}>
            { newName === "" ? "Enter a new nickname!" : "Name already taken!" }
          </div>
        }

        <div className="body">
          <button 
            className="btn-cancel" 
            onClick={() => props.handleYes(newName)} 
            disabled={btnDisable}
          >
            SAVE
          </button>
          <div className="btn-ok" onClick={() => props.setShowModal()}>CANCEL</div>
        </div>
      </div>
    </div>
  )
}
