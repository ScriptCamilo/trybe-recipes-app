import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './madeRecipes.module.scss';
import FilterButtons from '../../components/FilterButtons';

function MadeRecipes() {
  const MADE_RECIPES = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(MADE_RECIPES || []);

  function renderMadeRecipeCards() {
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
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <div>
            {(recipe.tags !== 'null' && recipe.tags) && recipe.tags
              .map((tag) => (
                <p
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ tag }
                >
                  {tag}
                </p>))}
          </div>
        </section>
      </div>
    ));
  }

  function renderMadeRecipes() {
    return (
      <div className={ styles.madeRecipes }>
        <FilterButtons
          recipes={ MADE_RECIPES || [] }
          setFilteredRecipes={ setFilteredRecipes }
        />
        <section className={ styles.cards }>
          {renderMadeRecipeCards()}
        </section>
      </div>
    );
  }

  return (
    <>
      <Header title="Receitas Feitas" icon="false" />
      <main>
        {renderMadeRecipes()}
      </main>
    </>
  );
}

export default MadeRecipes;
