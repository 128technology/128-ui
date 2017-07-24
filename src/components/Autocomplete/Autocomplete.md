Example:

    const options = [1, 2, 3, 4].map((index) => ({
      label: 'Option ' + index,
      value: index
    }));

    const onSelect = (selection) => { console && console.log('Selection: '+selection) };

    <div style={{width: '300px'}}>
      <Autocomplete placeholder="Type or select..." options={options} onSelect={onSelect} />
    </div>

Example (Error):

    class AutocompleteError extends React.Component {  
      constructor() {
        super();

        this.state = {
          selection: null,
          isError: true
        };

        this._onSelect = this._onSelect.bind(this);
      }

      _onSelect(selection) {
        this.setState({
          selection,
          isError: !selection
        }, () => {
          console && console.log('Selection: '+selection);
        });
      }

      render() {
        const options = [1, 2, 3, 4].map((index) => ({
          label: 'Option ' + index,
          value: index
        }));

        const errorText = this.state.isError
          ? this.props.errorText
          : null;

        return (
          <div style={{width: '300px'}}>
            <Autocomplete placeholder="Type or select..." options={options} onSelect={this._onSelect} errorText={errorText} />
          </div>
        );
      }
    }

    <AutocompleteError errorText="This field is required!" />
