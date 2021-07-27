import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../pages/DetailScreen/details.module.scss';

function Instructions(props) {
  const { recipe: { strInstructions } } = props;
  return (
    <div className={ styles.instructionsContainer }>
      <h2>Instructions</h2>
      <section>
        <p data-testid="instructions">{strInstructions}</p>
      </section>
    </div>
  );
}

export default Instructions;

Instructions.propTypes = {
  recipe: PropTypes.node.isRequired,
};
