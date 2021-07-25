import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import { useLocation } from 'react-router-dom';
import {
  filterFirstLetter,
  filterIngredient,
  filterName,
  filterCategory,
} from '../../services/recipesApi';

import data from '../../helpers/apiData';

import Context from './DrinkContext';
import useRecipes from '../../hooks/useRecipes';
import useCategories from '../../hooks/useCategories';

function DrinkProvider({ children }) {
  const { bebidas: { domain, key: keyName } } = data;
  const location = useLocation();
  const [drinkRecipes, isFetching] = useRecipes(domain, keyName);
  const categories = useCategories(domain, keyName);
  const [drinkRecipesByCategory, setDrinkRecipesByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(isFetching);
  const [isSearch, setIsSearch] = useState(false);

  const [drinkApi, setDrinkApi] = useState([]);
  const [filterDrink, setFilterDrink] = useState({ key: '', value: '' });
  const { key, value } = filterDrink;

  useEffect(() => {
    setIsSearch(false);
  }, [location]);

  useEffect(() => {
    async function connect() {
      if (key === 'ing') {
        const i = await filterIngredient(value, 'Drinks');
        setIsLoading(false);
        return setDrinkApi(i);
      }
      if (key === 'name') {
        const n = await filterName(value, 'Drinks');
        setIsLoading(false);
        return setDrinkApi(n);
      }
      if (key === 'first') {
        if (value.length > 1) {
          // eslint-disable-next-line no-alert
          alert('Sua busca deve conter somente 1 (um) caracter');
          setIsLoading(false);
          return;
        }
        const f = await filterFirstLetter(value, 'Drinks');
        setIsLoading(false);
        return setDrinkApi(f);
      }
      if (key === 'category') {
        const c = await filterCategory(value, 'Drinks');
        setIsLoading(false);
        return setDrinkApi(c);
      }
    }
    setIsLoading(true);
    connect();
  }, [key, value]);

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching]);

  return (
    <Context.Provider
      value={ {
        categories,
        drinkRecipes,
        drinkRecipesByCategory,
        setDrinkRecipesByCategory,
        isLoading,
        setIsLoading,
        drinkApi,
        setDrinkApi,
        filterDrink,
        setFilterDrink,
        isSearch,
        setIsSearch,
      } }
    >
      {children}
    </Context.Provider>
  );
}

DrinkProvider.propTypes = {
  children: node.isRequired,
};

export default DrinkProvider;
