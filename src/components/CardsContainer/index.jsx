/* eslint-disable no-alert */
import React from 'react';
import { Redirect } from 'react-router';

import styles from './cards.module.scss';

import MainCard from '../MainCard';

function CardsContainer(props) {
  const {
    currentPage,
    currentCategory,
    propsRecipes,
    propsRecipesByCategory,
    propsApi,
    propsKey,
    isLoading,
  } = props;

  const isKeyMeal = propsKey === 'meals';

  const apiKeys = {
    id: isKeyMeal ? 'idMeal' : 'idDrink',
    str: isKeyMeal ? 'strMeal' : 'strDrink',
    thumb: isKeyMeal ? 'strMealThumb' : 'strDrinkThumb',
  };

  const SIZE = 12;

  let recipes = propsRecipes;
  const apiValue = propsApi[propsKey];
  if (apiValue) {
    recipes = apiValue.slice(0, SIZE);
    if (apiValue.length === 1) {
      return <Redirect to={ `/comidas/${apiValue[0][apiKeys.id]}` } />;
    }
  }
  if (currentCategory !== 'All' && !isLoading) {
    recipes = propsRecipesByCategory[currentCategory];
  }
  if (apiValue === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <section className={ styles.cards }>
      {
        recipes.map((recipe, index) => (
          <MainCard
            key={ index }
            index={ index }
            id={ recipe[apiKeys.id] }
            name={ recipe[apiKeys.str] }
            thumb={ recipe[apiKeys.thumb] }
            currentPage={ currentPage }
          />
        ))
      }
    </section>
  );
}

export default CardsContainer;
