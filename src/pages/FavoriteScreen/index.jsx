import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './favorite.module.scss';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

import Header from '../../components/Header';
import FilterButtons from '../../components/FilterButtons';
import InteractiveButtons from '../../components/RecipeDetails/InteractiveButtons';

function FavoriteScreen() {
  const FAVORITE_RECIPES = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(FAVORITE_RECIPES || []);
  const [isCopy, setIsCopy] = useState(false);

  function copyToClipBoard({ type, id }) {
    const path = `${type}s/${id}`;
    const FIVE_SECONDS = 5000;
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), FIVE_SECONDS);
    return navigator.clipboard.writeText(`http://localhost:3000/${path}`);
  }

  function removeRecipeFromLS(recipeId) {
    const recipeRemoved = filteredRecipes.filter(({ id }) => recipeId !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeRemoved));
    setFilteredRecipes(recipeRemoved);
  }

  function renderFavoriteRecipesCard() {
    return filteredRecipes.map((recipe, index) => (
      <div className={ styles.card } key={ index }>
        <Link to={ `${recipe.type}s/${recipe.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
        </Link>
        <section className={ styles.infos }>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'comida'
              ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot}
          </p>
          <Link to={ `${recipe.type}s/${recipe.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
          </Link>
        </section>
      </div>
    ));
  }

  function renderFavoriteRecipes() {
    return (
      <div className={ styles.favoriteRecipes }>
        <FilterButtons
          recipes={ FAVORITE_RECIPES || [] }
          setFilteredRecipes={ setFilteredRecipes }
        />
        {isCopy && <span>Link copiado!</span>}
        <section className={ styles.cards }>
          {filteredRecipes && renderFavoriteRecipesCard()}
        </section>
      </div>
    );
  }

  return (
    <>
      <Header title="Receitas Favoritas" icon="false" />
      <main>
        {renderFavoriteRecipes()}
      </main>
    </>
  );
}

export default FavoriteScreen;
