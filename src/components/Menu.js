import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faList, faHome } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function Menu(props) {
  const [isActive, setActive] = useState(false)
  return (
    <div className={`menu-nav ${isActive && 'active-menu-nav'}`}> 
      {
        isActive &&
        <div className="menu-expand">
          <Link to="/">
          <FontAwesomeIcon 
            onClick={() => {}}
            className="icon" 
            icon={faHome}
          />
          </Link>
          <Link to="/mypokemons">
          <FontAwesomeIcon 
            onClick={() => {}}
            className="icon" 
            icon={faList}
          />
          </Link>
        </div>
      }
      <FontAwesomeIcon 
        onClick={() => setActive(!isActive)}
        className={isActive ? "active-icon" : "icon"} 
        icon={isActive ? faTimes : faBars}
      />
    </div>
  );
}
