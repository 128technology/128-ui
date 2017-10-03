import React from 'react';
import PropTypes from 'prop-types';
import ReactAutocomplete from 'react-autocomplete';

class ChipInputAutocomplete extends React.PureComponent {
  componentDidMount() {
    const { inputFocused } = this.props;

    if (inputFocused) {
      this.autoCompleteInput.focus();
    }
  }

  componentDidUpdate() {
    const { inputFocused } = this.props;

    if (inputFocused) {
      this.autoCompleteInput.focus();
    }
  }

  render() {
    return <ReactAutocomplete {...this.props} ref={el => (this.autoCompleteInput = el)} />;
  }
}

ChipInputAutocomplete.propTypes = {
  inputFocused: PropTypes.bool
};

ChipInputAutocomplete.defaultProps = {
  inputFocused: false
};

export default ChipInputAutocomplete;
