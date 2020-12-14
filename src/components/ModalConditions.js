import React, { useState, useContext } from 'react';
import { css, cx } from '@emotion/css';

export default function ModalConditions(props) {
  let successgif = 'https://s3-ap-southeast-1.amazonaws.com/email-template.pengenbisa.com/success.gif'
  let failedgif = 'https://s3-ap-southeast-1.amazonaws.com/email-template.pengenbisa.com/failed.gif'
  setTimeout(() => {
    props.setShowModal(false, props.catchRandom)
  }, 1800);
  return (
    <div className="modalContainer">
      <div className="modal">

        <div className={css`
          height: 320px;
        `}>
          <img 
            src={props.catchRandom ? successgif : failedgif} 
            width="100%" height="100%" 
            style={{position: 'absolute', top: 0, left: 0}} 
          />
        </div>

      </div>
    </div>
  )
}
