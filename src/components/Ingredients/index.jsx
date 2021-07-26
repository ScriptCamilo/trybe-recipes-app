/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import FoodContext from '../../context/FoodProvider/FoodContext';
import DrinkContext from '../../context/DrinkProvider/DrinkContext';

import { fetchIngredient } from '../../services/recipesApi';
import styles from './ingredients.module.scss';

import Header from '../Header';
import Footer from '../Footer';

function Ingredients() {
  const { pathname } = useLocation();
  const isMeal = pathname === '/explorar/comidas/ingredientes';
  const [ingredients, setIngredients] = useState('');
  const data = useContext(isMeal ? FoodContext : DrinkContext);

  const apiProps = {
    domain: isMeal ? 'themealdb' : 'thecocktaildb',
    key: isMeal ? 'meals' : 'drinks',
    str: isMeal ? 'strIngredient' : 'strIngredient1',
    setFilter: isMeal ? data.setFilterFood : data.setFilterDrink,
  };

  useEffect(() => {
    const getIngredients = async () => {
      const result = await fetchIngredient(apiProps);
      setIngredients(result);
    };
    getIngredients();
  }, []);

  function filterByIngredients(strIngredient) {
    apiProps.setFilter({ key: 'ing', value: strIngredient });
  }

  function renderIngredients() {
    return ingredients.map((ingredient, index) => {
      const thumb = `https://www.${apiProps.domain}.com/images/ingredients/${ingredient[apiProps.str]}-Small.png`;
      return (
        <Link
          key={ index }
          to={ isMeal ? '/comidas' : '/bebidas' }
          onClick={ () => filterByIngredients(ingredient[apiProps.str]) }
        >
          <div
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            className={ styles.card }
          >
            <img
              alt={ ingredient[apiProps.str] }
              src={ thumb }
              data-testid={ `${index}-card-img` }
            />
            <h2>{ ingredient[apiProps.str] }</h2>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className={ styles.id }>
      <Header title="Explorar Ingredientes" icon="false" />
      <section className={ styles.cards }>
        {ingredients && renderIngredients()}
      </section>
      <Footer />
    </div>
  );
}

export default Ingredients;
