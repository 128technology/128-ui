Multi-select:

    const Avatar = require('@material-ui/core/Avatar').default;

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      species: 'Human'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      species: 'Human'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      species: 'Human'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      species: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      species: 'Dog'
    }];

    <Autocomplete
      isMulti={true}
      options={data}
      chipAvatar={d => <Avatar>{d.name.slice(0, 1)}</Avatar>}
      getOptionLabel={d => `The ${d.name}`}
      getOptionValue={d => d.value.age}
      groupBy={d => d.species}
    />

Single-select:

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      species: 'Human'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      species: 'Human'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      species: 'Human'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      species: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      species: 'Dog'
    }];

    <Autocomplete
      options={data}
      getOptionLabel={d => `The ${d.name}`}
      getOptionValue={d => d.value.age}
    />

Single-select Disabled:

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      species: 'Human'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      species: 'Human'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      species: 'Human'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      species: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      species: 'Dog'
    }];

    <Autocomplete
      options={data}
      disabled={true}
      getOptionLabel={d => `The ${d.name}`}
      getOptionValue={d => d.value.age}
    />

Single-select Large Dataset:

    const _ = require('lodash');
    const data = _.range(0, 100).map(x => ({ value: x, label: `Item ${x + 1}` }));

    <Autocomplete options={data} />

Single-select with an error:

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      species: 'Human'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      species: 'Human'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      species: 'Human'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      species: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      species: 'Dog'
    }];

    <Autocomplete
      options={data}
      errorText={"There was an error!"}
      getOptionLabel={d => `The ${d.name}`}
      getOptionValue={d => d.value.age}
    />

Single-select (controlled):

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      species: 'Human'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      species: 'Human'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      species: 'Human'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      species: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      species: 'Dog'
    }];

    <Autocomplete
      options={data}
      getOptionLabel={d => `The ${d.name}`}
      getOptionValue={d => d.value.age}
      selection={data[1]}
    />

Single-select empty:

      <Autocomplete />

Single-select custom style:

    const { withStyles } = require('@material-ui/core/styles');

    const styles = {
      placeholder: {
        color: 'red'
      },
      input: {
        '& input': {
          color: 'red !important'
        }
      }
    };

    const data = [{
      label: 'Some Label',
      value: 'Some Value'
    }, {
      label: 'Another Label',
      value: 'Another Value'
    }];

    function AutocompleteCustom({ classes }) {
      return (
        <Autocomplete
          classes={classes}
          options={data}
        />
      );
    }

    const Enhanced = withStyles(styles)(AutocompleteCustom);

    <Enhanced />

Creatable Single-select:

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      species: 'Human'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      species: 'Human'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      species: 'Human'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      species: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      species: 'Dog'
    }];

    <Autocomplete
      options={data}
      getOptionLabel={d => `The ${d.name}`}
      getOptionValue={d => d.value.age}
      creatable={true}
      onChange={d => console.log(d)}
    />

Async Creatable Single-select with Promise:

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      species: 'Human'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      species: 'Human'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      species: 'Human'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      species: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      species: 'Dog'
    }];

    const loadOptions = () => new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000)
    });

    <Autocomplete
      defaultOptions={true}
      getOptionLabel={d => `The ${d.name}`}
      getOptionValue={d => d.value.age}
      creatable={true}
      async={true}
      onChange={d => console.log(d)}
      loadOptions={loadOptions}
    />

Async Creatable Single-select with Callback:

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      species: 'Human'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      species: 'Human'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      species: 'Human'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      species: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      species: 'Dog'
    }];

    const loadOptions = (cb) => {
      setTimeout(() => {
        cb(data);
      }, 2000)
    };

    <Autocomplete
      label="Select An Item"
      textFieldProps={{ variant: 'filled' }}
      defaultOptions={true}
      getOptionLabel={d => `The ${d.name}`}
      getOptionValue={d => d.value.age}
      creatable={true}
      async={true}
      onChange={d => console.log(d)}
      loadOptions={loadOptions}
    />

Async Creatable Multi-select with Promise:

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      species: 'Human'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      species: 'Human'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      species: 'Human'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      species: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      species: 'Dog'
    }, {
      name: 'Some Really Really Really Really Really long name',
      value: {
        age: '37'
      },
      species: 'Dog'
    }];

    const loadOptions = () => new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000)
    });

    <Autocomplete
      isMulti={true}
      defaultOptions={true}
      getOptionLabel={d => `The ${d.name}`}
      getOptionValue={d => d.value.age}
      creatable={true}
      async={true}
      onChange={d => console.log(d)}
      loadOptions={loadOptions}
    />

Single-select Controlled:

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      species: 'Human'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      species: 'Human'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      species: 'Human'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      species: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      species: 'Dog'
    }];

    class AutocompleteControlled extends React.Component {
      constructor(props) {
        super(props);
        this.state = { selection: null };

        this.handleOnChange = this.handleOnChange.bind(this);
      }

      handleOnChange(selection) {
        this.setState({ selection })
      }

      render() {
        return (
          <Autocomplete {...this.props} selection={this.state.selection} onChange={this.handleOnChange} />
        );
      }
    };

    <AutocompleteControlled
      label="Select an item"
      textFieldProps={{ variant: 'outlined' }}
      getOptionLabel={d => `The ${d.name}`}
      getOptionValue={d => d.value.age}
      options={data}
    />