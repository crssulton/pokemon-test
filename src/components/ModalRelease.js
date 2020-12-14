import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function ModalRelease(props) {
  return (
    <div className="modalContainer">
      <div className="modal">
        <div className="header">
          <div>Release this pokemon?</div>
          <div onClick={() => props.setShowModal()}>
            <FontAwesomeIcon className="icon" icon={faTimes}/>
          </div>
        </div>

        <div className="body">
          <div className="btn-ok" onClick={() => props.handleYes()}>YES</div>
          <div className="btn-cancel" onClick={() => props.setShowModal()}>CANCEL</div>
        </div>
      </div>
    </div>
  )
}
