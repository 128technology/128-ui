import React from 'react';
import MuiButton from '@material-ui/core/Button';

/**
 * Mui Button component
 */
function Button({ ...rest }) {
  return <MuiButton {...rest} />;
}

export default Button;
