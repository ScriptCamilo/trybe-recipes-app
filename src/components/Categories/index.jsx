import React from 'react';
import PropTypes from 'prop-types';

import styles from './categories.module.scss';

import Button from '../Button';

function Categories(props) {
  const { categories, renderRecipesByCategory } = props;
  return (
    <nav className={ styles.categories }>
      <Button
        data-testid="All-category-filter"
        handleClick={ renderRecipesByCategory }
        selected="selected"
      >
        <span>All</span>
      </Button>
      {categories.map(({ strCategory }) => (
        <Button
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          handleClick={ renderRecipesByCategory }
        >
          <span>{strCategory}</span>
        </Button>))}
    </nav>
  );
}

export default Categories;

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderRecipesByCategory: PropTypes.func.isRequired,
};
