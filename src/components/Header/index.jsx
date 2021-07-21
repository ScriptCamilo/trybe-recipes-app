import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { AiOutlineFileSearch } from 'react-icons/ai';
import { GiArchiveResearch, GiCook } from 'react-icons/gi';
// import { SiCodechef } from 'react-icons/si';

// import profileIcon from '../../images/profileIcon.svg';
// import searchIcon from '../../images/searchIcon.svg';
import Search from '../Search';

import styles from './header.module.scss';

function Header({ title, icon, currentPage }) {
  const [isSearch, setIsSearch] = useState(false);
  const handleSearch = () => setIsSearch(!isSearch);

  return (
    <>
      <header className={ styles.header }>
        <Link to="/perfil">
          { /*
            <img src={ profileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
          */}
          <GiCook size="3rem" className={ styles.headerIcon } />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        {
          (icon === 'false') ? <div className={ styles.adjust } /> : (
            <button type="button" onClick={ handleSearch }>
              {/*
                <img src={ searchIcon } alt="Search Icon" data-testid="search-top-btn" />
              */}
              <GiArchiveResearch size="3rem" className={ styles.headerIcon } />
            </button>
          )
        }
      </header>
      {isSearch && <Search currentPage={ currentPage } />}
    </>
  );
}

Header.propTypes = {
  title: Proptypes.string.isRequired,
  icon: Proptypes.string.isRequired,
  currentPage: Proptypes.string.isRequired,
};

export default Header;
