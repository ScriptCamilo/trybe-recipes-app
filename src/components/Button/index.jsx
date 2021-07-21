import React from 'react';
import { func, node, bool, string } from 'prop-types';

import styles from './button.module.scss';

function Button({ children, handleClick, isSubmit, dataTestid, isDisabled }) {
  return (
    <button
      className={ styles.button }
      data-testid={ dataTestid }
      type={ isSubmit ? 'submit' : 'button' }
      onClick={ handleClick }
      disabled={ isDisabled }
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  handleClick: func.isRequired,
  isSubmit: bool.isRequired,
  dataTestid: string.isRequired,
  isDisabled: bool,
  children: node,
};

Button.defaultProps = {
  children: '',
  isDisabled: false,
};

export default Button;
