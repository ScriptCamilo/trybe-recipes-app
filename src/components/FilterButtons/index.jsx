import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import styles from './filter.module.scss';

import Button from '../Button';

function FilterButtons(props) {
  const { pathname } = useLocation();
  const { recipes, setFilteredRecipes } = props;
  function filterRecipes(filter) {
    const filtered = recipes.filter(({ type }) => type === filter);
    setFilteredRecipes(filtered);
  }

  function handleFilterButtons({ target }) {
    const content = target.textContent;
    switch (content) {
    case 'Food':
      filterRecipes('comida');
      break;
    case 'Drinks':
      filterRecipes('bebida');
      break;
    default:
      setFilteredRecipes(recipes);
    }
  }

  function renderFilterButtons() {
    return (
      <div className={ styles.filterButtons }>
        <Button
          type="button"
          data-testid="filter-by-all-btn"
          handleClick={ handleFilterButtons }
        >
          All
        </Button>
        <Button
          type="button"
          data-testid="filter-by-food-btn"
          handleClick={ handleFilterButtons }
        >
          Food
        </Button>
        <Button
          type="button"
          data-testid="filter-by-drink-btn"
          handleClick={ handleFilterButtons }
        >
          Drinks
        </Button>
      </div>
    );
  }

  function noRecipeFound() {
    let msgStatus = <p>Não há receitas favoritas</p>;
    if (pathname === '/receitas-feitas') msgStatus = <p>Não há receitas feitas</p>;
    return msgStatus;
  }

  return (
    <div>
      { recipes.length ? renderFilterButtons() : noRecipeFound()}
    </div>
  );
}

export default FilterButtons;

FilterButtons.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFilteredRecipes: PropTypes.func.isRequired,
};
