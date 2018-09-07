import React from 'react';
import PropTypes from 'prop-types';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

/**
 * 128 provider component. This component encapsulates sub-module providers
 * such as the ant design locale provider.
 *
 * Please see the [Ant Design LocaleProvider documentation](https://ant.design/components/locale-provider/)
 */
function Provider({ children }) {
  return <MuiPickersUtilsProvider utils={MomentUtils}>{children}</MuiPickersUtilsProvider>;
}

Provider.propTypes = {
  children: PropTypes.node
};

export default Provider;
