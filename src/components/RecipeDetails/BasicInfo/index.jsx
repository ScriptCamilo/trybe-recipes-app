import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../pages/DetailScreen/details.module.scss';
import InteractiveButtons from '../InteractiveButtons';

function BasicInfo(props) {
  const { category, name, recipe, foodOrDrink, type, id } = props;

  return (
    <div className={ styles.basicInfoContainer }>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${name}Thumb`] }
        alt={ recipe[`str${name}`] }
        width="100%"
      />
      <div className={ styles.topContainer }>
        <div>
          <h1 data-testid="recipe-title">{recipe[`str${name}`]}</h1>
          <p data-testid="recipe-category">{recipe[category]}</p>
        </div>

        <InteractiveButtons
          recipeDetails={ recipe }
          foodOrDrink={ foodOrDrink }
          type={ type }
          id={ id }
        />

      </div>

    </div>
  );
}

export default BasicInfo;

BasicInfo.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  recipe: PropTypes.node.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
