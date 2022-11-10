import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FoodContext from '../../../../context/FoodProvider/FoodContext';
import { filterByArea } from '../../../../services/recipesApi';
import styles from './origin.module.scss';

import Header from '../../../../components/Header';
import MainCard from '../../../../components/MainCard';
import Footer from '../../../../components/Footer';
import Loading from '../../../../components/Loading';

const MEALS_SIZE = 12;

function FoodOrigin() {
  const {
    foodRecipes,
    foodApi,
    categoriesArea,
    isLoading,
    setIsLoading,
    isSearch,
    setIsSearch,
  } = useContext(FoodContext);

  const [filteredRecipes, setFilteredRecipes] = useState(foodRecipes);
  const history = useHistory();
  const [currentCategory, setCurrentCategory] = useState('All');

  function handleSelect({ target }) {
    setCurrentCategory(target.value);
  }

  useEffect(() => {
    async function requestRecipe() {
      try {
        const res = await filterByArea(currentCategory);
        setFilteredRecipes(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    if (currentCategory !== 'All') {
      setIsLoading(true);
      requestRecipe();
    } else {
      setFilteredRecipes(foodRecipes);
    }
  }, [currentCategory, foodRecipes, setIsLoading]);

  useEffect(() => {
    const { meals } = foodApi;
    if (meals) {
      setFilteredRecipes(meals);
      if (meals.length === 1) {
        history.push(`/comidas/${meals[0].idMeal}`);
      }
    }
    if (meals === null) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [foodApi, history]);

  return (
    <>
      <Header
        icon="false"
        title="Explorar Origem"
        currentPage="Foods"
        isSearch={ isSearch }
        setIsSearch={ setIsSearch }
      />
      <main className={ isSearch ? styles.isSearch : '' }>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => handleSelect(e) }
          value={ currentCategory }
          className={ styles.select }
        >
          <option data-testid="All-option">All</option>
          {categoriesArea.map(({ strArea }) => (
            <option data-testid={ `${strArea}-option` } key={ strArea } value={ strArea }>
              {strArea}
            </option>
          ))}
        </select>

        {isLoading ? <Loading /> : (
          <section className={ styles.cards }>
            {
              filteredRecipes.slice(0, MEALS_SIZE)
                .map(({ idMeal, strMeal, strMealThumb }, index) => (
                  <MainCard
                    currentPage="area"
                    key={ index }
                    index={ index }
                    id={ idMeal }
                    name={ strMeal }
                    thumb={ strMealThumb }
                  />))
            }
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export default FoodOrigin;
