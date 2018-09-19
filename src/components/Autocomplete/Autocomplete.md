Multi-select:

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');

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

    <MuiThemeProvider theme={createMuiTheme()}>
      <Autocomplete
        isMulti={true}
        options={data}
        accessors={{
          value: d => d.value.age,
          label: d => `The ${d.name}`
        }}
        groupBy={d => d.species}
      />
    </MuiThemeProvider>

Single-select:

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');

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

    <MuiThemeProvider theme={createMuiTheme()}>
      <Autocomplete
        options={data}
        accessors={{
          value: d => d.value.age,
          label: d => `The ${d.name}`
        }}
      />
    </MuiThemeProvider>

Single-select empty:

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');

    <MuiThemeProvider theme={createMuiTheme()}>
      <Autocomplete />
    </MuiThemeProvider>

Creatable Single-select:

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');

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

    <MuiThemeProvider theme={createMuiTheme()}>
      <Autocomplete
        options={data}
        accessors={{
          value: d => d.value.age,
          label: d => `The ${d.name}`
        }}
        creatable={true}
        onChange={d => console.log(d)}
      />
    </MuiThemeProvider>

Async Creatable Single-select with Promise:

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');

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

    <MuiThemeProvider theme={createMuiTheme()}>
      <Autocomplete
        defaultOptions={true}
        accessors={{
          value: d => d.value.age,
          label: d => `The ${d.name}`
        }}
        creatable={true}
        async={true}
        onChange={d => console.log(d)}
        loadOptions={loadOptions}
      />
    </MuiThemeProvider>

Async Creatable Single-select with Callback:

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');

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

    <MuiThemeProvider theme={createMuiTheme()}>
      <Autocomplete
        defaultOptions={true}
        accessors={{
          value: d => d.value.age,
          label: d => `The ${d.name}`
        }}
        creatable={true}
        async={true}
        onChange={d => console.log(d)}
        loadOptions={loadOptions}
      />
    </MuiThemeProvider>

Async Creatable Multi-select with Promise:

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');

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

    <MuiThemeProvider theme={createMuiTheme()}>
      <Autocomplete
        isMulti={true}
        defaultOptions={true}
        accessors={{
          value: d => d.value.age,
          label: d => `The ${d.name}`
        }}
        creatable={true}
        async={true}
        onChange={d => console.log(d)}
        loadOptions={loadOptions}
      />
    </MuiThemeProvider>

Single-select Controlled:

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');

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

    <MuiThemeProvider theme={createMuiTheme()}>
      <AutocompleteControlled
        accessors={{
          value: d => d.value.age,
          label: d => `The ${d.name}`
        }}
        options={data}
      />
    </MuiThemeProvider>