import React from 'react';

import styles from './styles.module.scss';

function Button() {
  return (
    <div className={ styles.buttonContainer }>
      <button data-testid="finish-recipe-btn" type="button">
        Finish
      </button>
    </div>
  );
}

export default Button;