import * as React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ onClick, className, children }) => {
    return(
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};