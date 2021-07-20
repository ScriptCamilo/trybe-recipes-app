import React from 'react';
import { Redirect } from 'react-router';
import MainCard from '../MainCard';

function CardsContainer(props) {
  const {
    currentCategory,
    propsRecipes,
    propsRecipesByCategory,
    isLoading,
    propsApi,
    paramsApi,
  } = props;

  const isMeal = paramsApi === 'meals';

  const apiProps = {
    id: isMeal ? 'idMeal' : 'idDrink',
    str: isMeal ? 'strMeal' : 'strDrink',
    thumb: isMeal ? 'strMealThumb' : 'strDrinkThumb',
  };

  const SIZE = 12;

  let recipes = propsRecipes;
  const params = propsApi[paramsApi];
  if (params) {
    recipes.slice(0, SIZE);
    if (params.length === 1) {
      return <Redirect to={ `/comidas/${params[0][apiProps.id]}` } />;
    }
  }
  if (currentCategory !== 'All' && !isLoading) {
    recipes = propsRecipesByCategory[currentCategory];
  }
  if (params === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return recipes.map((recipe, index) => (
    <MainCard
      key={ index }
      index={ index }
      id={ recipe[apiProps.id] }
      name={ recipe[apiProps.str] }
      thumb={ recipe[apiProps.thumb] }
    />
  ));
}

export default CardsContainer;
