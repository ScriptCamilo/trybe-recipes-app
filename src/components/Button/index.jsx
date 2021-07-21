import React from 'react';
import { func, node, bool, string } from 'prop-types';

import styles from './button.module.scss';

function Button({ children, selected, handleClick, isSubmit, dataTestid, isDisabled }) {
  return (
    <button
      className={ styles.button }
      id={ selected }
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
  selected: string,
  isDisabled: bool,
  children: node,
};

Button.defaultProps = {
  children: '',
  selected: false,
  isDisabled: false,
};

export default Button;
