import React, { useState, useContext } from 'react';
import { css, cx } from '@emotion/css';

export default function ModalCatch(props) {
  let catchRandom = parseInt(Math.random() * 100)
  setTimeout(() => {
    props.setShowModal(false, catchRandom % 2 !== 1)
  }, 5000);
  return (
    <div className="modalContainer">
      <div className="modal">

        <div className={css`
          height: 320px;
        `}>
          <img 
            src="https://s3-ap-southeast-1.amazonaws.com/email-template.pengenbisa.com/prosess-catch.gif" 
            width="100%" height="100%" 
            style={{position: 'absolute', top: 0, left: 0}}
          />
        </div>

      </div>
    </div>
  )
}
