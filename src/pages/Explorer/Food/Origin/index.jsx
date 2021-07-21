import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { filterByArea } from '../../../../services/recipesApi';
import FoodContext from '../../../../context/FoodProvider/FoodContext';

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
  } = useContext(FoodContext);

  const [filteredRecipes, setFilteredRecipes] = useState(foodRecipes);
  const history = useHistory();
  const [currentCategory, setCurrentCategory] = useState('All');

  function handleSelect({ target }) {
    setCurrentCategory(target.value);
  }

  useEffect(() => {
    console.log('Get Area');
    async function requestRecipe() {
      try {
        const res = await filterByArea(currentCategory);
        setFilteredRecipes(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    if (currentCategory !== 'All') {
      setIsLoading(true);
      requestRecipe();
    } else {
      setFilteredRecipes(foodRecipes);
    }
  }, [currentCategory]);

  useEffect(() => {
    const { meals } = foodApi;
    if (meals) {
      console.log('foodApi');
      setFilteredRecipes(meals);
      console.log(meals);
      if (meals.length === 1) {
        history.push(`/comidas/${meals[0].idMeal}`);
      }
    }
    if (meals === null) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [foodApi]);

  console.log(filteredRecipes);

  return (
    <>
      <Header title="Explorar Origem" icon currentPage="Foods" />
      <main>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => handleSelect(e) }
          value={ currentCategory }
        >
          <option data-testid="All-option">All</option>
          {categoriesArea.map(({ strArea }) => (
            <option data-testid={ `${strArea}-option` } key={ strArea } value={ strArea }>
              {strArea}
            </option>
          ))}
        </select>
        {isLoading ? <Loading /> : filteredRecipes.slice(0, MEALS_SIZE)
          .map(({ idMeal, strMeal, strMealThumb }, index) => (
            <MainCard
              currentPage="area"
              key={ index }
              index={ index }
              id={ idMeal }
              name={ strMeal }
              thumb={ strMealThumb }
            />))}
      </main>
      <Footer />
    </>
  );
}

export default FoodOrigin;
