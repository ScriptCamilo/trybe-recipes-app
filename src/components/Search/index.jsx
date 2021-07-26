import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './search.module.scss';

import FoodContext from '../../context/FoodProvider/FoodContext';
import DrinkContext from '../../context/DrinkProvider/DrinkContext';

import Button from '../Button';

function Search({ currentPage }) {
  const { setFilterFood } = useContext(FoodContext);
  const { setFilterDrink } = useContext(DrinkContext);
  const [inputChange, setInputChange] = useState({
    inputSearch: '',
    selectedFilter: '',
  });

  function handleChange({ target: { name, value } }) {
    setInputChange({
      ...inputChange,
      [name]: value,
    });
  }

  function handleClick({ target }) {
    const { inputSearch, selectedFilter } = inputChange;
    const previousCategory = document.querySelector('#selected');
    const isTargetSpan = target.tagName === 'SPAN';
    const targetParent = target.parentElement;
    const targetSelected = isTargetSpan ? targetParent : target;

    if (selectedFilter === 'first' && inputSearch.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      setInputChange({
        ...inputChange,
        inputSearch: '',
      });
      return;
    }

    if (previousCategory) previousCategory.id = '';

    if (previousCategory === targetSelected) {
      const parentSpan = targetParent.parentElement.firstElementChild;
      const parentButton = target.parentElement.firstElementChild;
      const allCategory = isTargetSpan ? parentSpan : parentButton;
      allCategory.id = 'selected';
    } else {
      const targetBackground = isTargetSpan ? targetParent : target;
      targetBackground.id = 'selected';
    }

    if (currentPage === 'Foods') {
      setFilterFood({
        key: selectedFilter,
        value: inputSearch,
      });
      return;
    }
    setFilterDrink({
      key: selectedFilter,
      value: inputSearch,
    });
  }

  return (
    <div className={ styles.search }>
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
        placeholder="Search"
        className="input-search"
        name="inputSearch"
        value={ inputChange.inputSearch }
      />
      <section className={ styles.radio }>
        <label htmlFor="ingredients">
          Ingredientes:
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
            name="selectedFilter"
            value="ing"
            id="ingredients"
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleChange }
            name="selectedFilter"
            value="name"
            id="name"
          />
        </label>
        <label htmlFor="first">
          Primeira Letra:
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
            name="selectedFilter"
            value="first"
            id="first"
          />
        </label>
      </section>
      <Button
        dataTestid="exec-search-btn"
        handleClick={ handleClick }
        isSubmit
      >
        Apply
      </Button>
    </div>
  );
}

Search.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default Search;
