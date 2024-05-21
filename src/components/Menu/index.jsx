import React from 'react'
import style from './index.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

function Menu({ onChangeView }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${style.sideMenu} ${isOpen ? style.open : ""}`}>
      <div className={style.menu}>
        {isOpen && <h4>Menu</h4>}
        <button className={style.burgerIcon} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {isOpen && (
        <ul>
          <li>Notes</li>
          <li onClick={onChangeView}>Change View</li>
        </ul>
      )}
    </nav>
  );
}

export default Menu