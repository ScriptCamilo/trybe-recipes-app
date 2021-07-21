/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import styles from '../../pages/Explorer';
import { fetchIngredient } from '../../services/recipesApi';
import FoodContext from '../../context/FoodProvider/FoodContext';
import DrinkContext from '../../context/DrinkProvider/DrinkContext';

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
    return ingredients.map((ingredient, index) => (
      <Link
        key={ index }
        to={ isMeal ? '/comidas' : '/bebidas' }
        onClick={ () => filterByIngredients(ingredient[apiProps.str]) }
      >
        <div
          className={ styles.card }
          key={ index }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            className={ styles.img }
            alt={ ingredient[apiProps.str] }
            src={ `https://www.${apiProps.domain}.com/images/ingredients/${ingredient[apiProps.str]}-Small.png` }
            data-testid={ `${index}-card-img` }
          />
          <span data-testid={ `${index}-card-name` } className={ styles.cardName }>
            <h2>{ ingredient[apiProps.str] }</h2>
          </span>
        </div>
      </Link>
    ));
  }

  return (
    <div className={ styles.id }>
      <Header title="Explorar Ingredientes" icon="false" />
      {ingredients && renderIngredients()}
      <Footer />
    </div>
  );
}

export default Ingredients;
