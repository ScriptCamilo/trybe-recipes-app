import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './favorite.module.scss';

import Header from '../../components/Header';
import FilterButtons from '../../components/FilterButtons';

function FavoriteScreen() {
  const FAVORITE_RECIPES = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(FAVORITE_RECIPES || []);

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
