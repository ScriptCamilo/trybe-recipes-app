/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import DrinkContext from '../../context/DrinkProvider/DrinkContext';

import data from '../../helpers/apiData';
import { fetchRecipesByCategory } from '../../services/recipesApi';

import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Categories from '../../components/Categories';
import CardsContainer from '../../components/CardsContainer';
import Footer from '../../components/Footer';

const { bebidas: { domain, key } } = data;

function DrinkScreen() {
  const {
    categories,
    drinkRecipesByCategory,
    drinkRecipes,
    setDrinkRecipesByCategory,
    isLoading,
    setIsLoading,
    drinkApi,
  } = useContext(DrinkContext);

  const [currentCategory, setCurrentCategory] = useState('All');

  useEffect(() => {
    const loadedCategories = Object.keys(drinkRecipesByCategory);
    const getRecipesByCategory = async () => {
      try {
        const apiResponse = await fetchRecipesByCategory(domain, key, currentCategory);
        setDrinkRecipesByCategory((prev) => ({
          ...prev,
          [currentCategory]: apiResponse,
        }));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!loadedCategories.includes(currentCategory) && currentCategory !== 'All') {
      getRecipesByCategory();
    }
  }, [currentCategory]);

  async function renderRecipesByCategory({ target }) {
    const category = target.textContent;
    const previousCategory = document.querySelector('#selected');
    const loadedCategories = Object.keys(drinkRecipesByCategory);

    previousCategory.id = '';

    if (previousCategory === target) {
      const allCategory = target.parentElement.firstElementChild;
      allCategory.id = 'selected';
    } else {
      target.id = 'selected';
    }

    if (category === currentCategory) return setCurrentCategory('All');

    if (loadedCategories.includes(category) || category === 'All') {
      return (setCurrentCategory(category));
    }

    setIsLoading(true);
    setCurrentCategory(category);
  }

  return (
    <>
      <Header title="Bebidas" icon="true" currentPage="Drink" />
      <main>
        <Categories
          categories={ categories }
          renderRecipesByCategory={ renderRecipesByCategory }
        />
        {isLoading ? <Loading /> : (
          <CardsContainer
            currentCategory={ currentCategory }
            propsRecipes={ drinkRecipes }
            propsRecipesByCategory={ drinkRecipesByCategory }
            propsApi={ drinkApi }
            propsKey="drinks"
            isLoading={ isLoading }
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default DrinkScreen;
