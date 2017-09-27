import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount } from 'enzyme';

function setStateSync(origSetState) {
  return async function(newState, cb) {
    await new Promise((resolve, reject) => {
      try {
        origSetState.call(this, newState, () => {
          resolve();
          if (cb) {
            cb();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  };
}

export function useSyncState(Component) {
  const origSetState = Component.prototype.setState;
  Component.prototype.setState = setStateSync(origSetState);
}

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
