import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './card.module.scss';

function MainCard(props) {
  const { id, index, name, thumb, currentPage } = props;
  const { pathname } = useLocation();
  const pathArea = `/comidas/${id}`;
  return (
    <Link
      to={ currentPage === 'area' ? pathArea : `${pathname}/${id}` }
    >
      <div
        style={ { backgroundImage: `
      linear-gradient(to bottom, transparent, #000000d3) , url(${thumb})` } }
        data-testid={ `${index}-recipe-card` }
        className={ styles.card }
      >
        {/* <img
          data-testid={ `${index}-card-img` }
          src={ thumb }
          alt={ name }
        /> */}
        <h2 data-testid={ `${index}-card-name` }>{name}</h2>
      </div>
    </Link>
  );
}

export default MainCard;

MainCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
};
