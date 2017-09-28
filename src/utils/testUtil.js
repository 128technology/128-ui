import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount } from 'enzyme';

function getMuiContext() {
  const muiTheme = getMuiTheme();

  return {
    context: {
      muiTheme
    },
    childContextTypes: {
      muiTheme: PropTypes.object
    }
  };
}

export function mountWithMuiTheme(component) {
  return mount(component, getMuiContext());
}
