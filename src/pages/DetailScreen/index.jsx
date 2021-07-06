import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useRecipeDetails from '../../hooks/useRecipeDetails';
import '../../styles/global.scss';
import c from './constants';
import useRecipes from '../../hooks/useRecipes';
// import Context from '../../context/DetailScreen/DetailContext';
import BasicInfo from '../../components/RecipeDetails/BasicInfo';
import InteractiveButtons from '../../components/RecipeDetails/InteractiveButtons';
import Ingredients from '../../components/RecipeDetails/Ingredients';
import Instructions from '../../components/RecipeDetails/Instructions';
import VideoRecipe from '../../components/RecipeDetails/VideoRecipe';
import Recommendations from '../../components/RecipeDetails/Recommendations';
import StartRecipe from '../../components/RecipeDetails/StartRecipe';

function DetailScreen() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const split = pathname.split('/')[1];
  const data = {
    comidas: {
      key: c.meals,
      domain: c.themealdb,
      name: c.Meal,
      category: c.strCategory,
      keyRecommend: c.drinks,
      domainRecommend: c.thecocktaildb,
      nameRecommend: c.Drink,
      categoryRecommend: c.strAlcoholic,
    },
    bebidas: {
      key: c.drinks,
      domain: c.thecocktaildb,
      name: c.Drink,
      category: c.strAlcoholic,
      keyRecommend: c.meals,
      domainRecommend: c.themealdb,
      nameRecommend: c.Meal,
      categoryRecommend: c.strCategory,
    },
  };

  const dataForRecipeApi = {
    id,
    key: data[split].key,
    domain: data[split].domain,
  };

  const type = {
    name: data[split].name,
    category: data[split].category,
    nameRecommend: data[split].nameRecommend,
    categoryRecommend: data[split].categoryRecommend,
  };

  const dataForRecommendedApi = {
    key: data[split].keyRecommend,
    domain: data[split].domainRecommend,
    qtdR: 6,
  };

  const recipeDetails = useRecipeDetails(dataForRecipeApi);
  const recipes = useRecipes(dataForRecommendedApi);

  return (
    <>
      <BasicInfo
        recipeDetails={ recipeDetails }
        name={ type.name }
        category={ type.category }
      />
      <InteractiveButtons />
      <Ingredients recipeDetails={ recipeDetails } />
      <Instructions recipeDetails={ recipeDetails } />
      <VideoRecipe recipeDetails={ recipeDetails } name={ type.name } />
      <Recommendations
        recipes={ recipes }
        name={ type.nameRecommend }
        category={ type.categoryRecommend }
      />
      <StartRecipe />
    </>
  );
}

export default DetailScreen;
