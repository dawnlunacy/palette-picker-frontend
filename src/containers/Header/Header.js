import React from 'react';
import { Link } from 'react-router-dom';
import '../../variables.scss';
import '../Header/Header.scss'
// import './Header.scss';


// import PropTypes from 'prop-types';

export const Header = () => {
  return(
    <header>
      <Link to="/">
      <h1> Tone Zone </h1>
      </Link>
      <div className="header-bottom"> </div>
    </header>
  )
}

export default Header;