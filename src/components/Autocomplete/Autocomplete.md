Example:

    const options = [1, 2, 3, 4].map((index) => ({
      label: 'Option ' + index,
      value: index
    }));

    const onChange = (selection) => { console && console.log('Selection: '+selection) };

    <div style={{width: '300px'}}>
      <Autocomplete placeholder="Type or select..." options={options} onChange={onChange} />
    </div>

Example (Error):

    class AutocompleteError extends React.Component {  
      constructor() {
        super();

        this.state = {
          selection: null,
          isError: true
        };

        this._onChange = this._onChange.bind(this);
      }

      _onChange(selection) {
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
            <Autocomplete placeholder="Type or select..." options={options} onChange={this._onChange} errorText={errorText} />
          </div>
        );
      }
    }

    <AutocompleteError errorText="This field is required!" />

Example (Disabled):

    const options = [1, 2, 3, 4].map((index) => ({
      label: 'Option ' + index,
      value: index
    }));

    <div style={{width: '300px'}}>
      <Autocomplete placeholder="Type or select..." options={options} onChange={() => {}} disabled={true} />
    </div>

Example (Clearable):

    const options = [1, 2, 3, 4].map((index) => ({
      label: 'Option ' + index,
      value: index
    }));

    <div style={{width: '300px'}}>
      <Autocomplete placeholder="Type or select..." options={options} onChange={() => {}} clearable={true} />
    </div>

Example (Creatable):

    const options = [1, 2, 3, 4].map((index) => ({
      label: 'Option ' + index,
      value: index
    }));

    <div style={{width: '300px'}}>
      <Autocomplete placeholder="Type or select..." options={options} onChange={() => {}} creatable={true} />
    </div>
