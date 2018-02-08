Example:

    const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
    const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      type: 'Person'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      type: 'Person'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      type: 'Person'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      type: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      type: 'Dog'
    }];

    const config = {
      key: 'name',
      label: 'name',
      value: 'value'
    };

    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput dataSource={data} dataSourceConfig={config} />
    </MuiThemeProvider>


Example (Inside Container):

    const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
    const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      type: 'Person'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      type: 'Person'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      type: 'Person'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      type: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      type: 'Dog'
    }];

    const config = {
      key: 'name',
      label: 'name',
      value: 'value'
    };

    const containerStyle = {
      height: '200px',
      overflow: 'auto'
    };

    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div style={containerStyle}>
        <ChipInput dataSource={data} dataSourceConfig={config} />
      </div>
    </MuiThemeProvider>


Example (Lots of Data):

    const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
    const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

    const types = ['Person', 'Dog', 'Reptile'];

    const data = _.range(0, 90).map((i) => ({
      name: _.uniqueId('person_'),
      value: {
        age: i
      },
      type: types[_.random(0, 2)]
    }));

    const config = {
      key: 'name',
      label: 'name',
      value: 'value'
    };

    function groupBy(item) {
      return item.originalDatum.type;
    }

    function menuProps() {
      return {
        maxHeight: 300
      };
    }

    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput dataSource={data} dataSourceConfig={config} groupBy={groupBy} menuProps={menuProps} />
    </MuiThemeProvider>

Example (Error Text):

    const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
    const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      type: 'Person'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      type: 'Person'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      type: 'Person'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      type: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      type: 'Dog'
    }];

    const config = {
      key: 'name',
      label: 'name',
      value: 'value'
    };

    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput dataSource={data} dataSourceConfig={config} errorText="Must provide at least one value." />
    </MuiThemeProvider>

Example (Default Selected Keys):

    const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
    const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      type: 'Person'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      type: 'Person'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      type: 'Person'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      type: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      type: 'Dog'
    }];

    const config = {
      key: 'name',
      label: 'name',
      value: 'value'
    };

    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput dataSource={data} dataSourceConfig={config} defaultSelectedKeys={['Greg', 'George']} />
    </MuiThemeProvider>

Example (Controlled):

    const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
    const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
    const RaisedButton = require('material-ui/RaisedButton').default;

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      type: 'Person'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      type: 'Person'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      type: 'Person'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      type: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      type: 'Dog'
    }];

    const config = {
      key: 'name',
      label: 'name',
      value: 'value'
    };

    class ControlledSelectedKeys extends React.PureComponent {
      constructor() {
        this.state = {
          selectedKeys: ['Greg', 'Bob']
        }

        this.handleOnAdd = this.handleOnAdd.bind(this);
        this.handleOnRemove = this.handleOnRemove.bind(this);
        this.clearInput = this.clearInput.bind(this);
      }

      handleOnAdd(item, key) {
        this.setState((prevState) => ({
          selectedKeys: _.concat(prevState.selectedKeys, key)
        }));
      }

      handleOnRemove(item, key, focusClosest) {
        this.setState((prevState) => {
          const selectedKeys = _.filter(prevState.selectedKeys, (selectedKey) => selectedKey !== key);

          return { selectedKeys }
        }, () => {
          focusClosest();
        });
      }

      clearInput() {
        this.setState({
          selectedKeys: []
        });
      }

      render() {
        return (
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div>
              <ChipInput
                dataSource={data}
                dataSourceConfig={config}
                selectedKeys={this.state.selectedKeys}
                onRequestAdd={this.handleOnAdd}
                onRequestRemove={this.handleOnRemove}
                placeholder="Some Placeholder"
              />
              <RaisedButton onClick={this.clearInput} fullWidth={true}>Clear</RaisedButton>
            </div>
          </MuiThemeProvider>
        );
      }
    }

    <ControlledSelectedKeys />

Example (Groups and Custom Menu Style):

    const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
    const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      type: 'Person'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      type: 'Person'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      type: 'Person'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      type: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      type: 'Dog'
    }];

    const config = {
      key: 'name',
      label: 'name',
      value: 'value'
    };

    function groupBy(item) {
      return item.originalDatum.type;
    }

    function menuItemProps(label, value, isHighlighted) {
      return {
        style: {
          fontSize: '14px',
          color: 'yellow',
          backgroundColor: isHighlighted ? 'red' : 'purple'
        }
      }
    }

    function menuHeadingProps(label, values) {
      return {
        style: {
          fontSize: '14px',
          backgroundColor: '#00ADEF',
          color: 'white'
        }
      }
    }

    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput dataSource={data} dataSourceConfig={config} groupBy={groupBy} menuItemProps={menuItemProps} menuHeadingProps={menuHeadingProps} />
    </MuiThemeProvider>

Example (Custom Chip Props):

    const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
    const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
    const Avatar = require('material-ui/Avatar').default;

    const data = [{
      name: 'Greg',
      value: {
        age: '99'
      },
      type: 'Person'
    }, {
      name: 'George',
      value: {
        age: '77'
      },
      type: 'Person'
    }, {
      name: 'Bob',
      value: {
        age: '2'
      },
      type: 'Person'
    }, {
      name: 'Scruffy',
      value: {
        age: '15'
      },
      type: 'Dog'
    }, {
      name: 'Kashmir',
      value: {
        age: '37'
      },
      type: 'Dog'
    }];

    const config = {
      key: 'name',
      label: 'name',
      value: 'value'
    };

    function muiChipProps(label, value, focused) {
      return {
        children: [
          <Avatar key="avatar" size={32}>{label.charAt(0)}</Avatar>,
          <span key="label">{label}</span>
        ],
        backgroundColor: focused ? '#00ADEF' : '#373A36',
        labelColor: 'white'
      }
    }

    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput
        dataSource={data}
        dataSourceConfig={config}
        muiChipProps={muiChipProps}
      />
    </MuiThemeProvider>

Example (On Change):

    const _ = require('lodash');
    const FontIcon = require('material-ui/FontIcon').default;
    const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
    const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

    const data = [{
      name: 'Red',
      value: {
        color: 'rgba(255,0,0,0.6)'
      }
    }, {
      name: 'Blue',
      value: {
        color: 'rgba(0,0,255,0.6)'
      }
    }, {
      name: 'Yellow',
      value: {
        color: 'rgba(255,255,0,0.6)'
      }
    }];

    const config = {
      key: 'name',
      label: 'name',
      value: 'value'
    };

    function muiChipProps(label, { color }, focused) {
      return {
        backgroundColor: focused ? `${color.slice(0, -4)}1)` : color,
        labelColor: ['Red', 'Blue'].indexOf(label) !== -1 ? '#fff' : '#000'
      }
    }

    class OnChangeExample extends React.PureComponent {
      constructor(props) {
        super(props);

        this.state = {
          color: 'white'
        };

        this.onChange = this.onChange.bind(this);
      }

      arrayEqual(a, b) {
        return _.isEqual(a.sort(), b.sort());
      }

      onChange(values) {
        let newState = {};
        const colors = _.map(values, 'label');

        if (!colors.length) {
          newState.color = 'white';
        }

        if (this.arrayEqual(colors, ['Blue'])){
          newState.color = 'blue';
        }

        if (this.arrayEqual(colors, ['Red'])){
          newState.color = 'red';
        }

        if (this.arrayEqual(colors, ['Yellow'])){
          newState.color = 'yellow';
        }

        if (this.arrayEqual(colors, ['Blue', 'Red'])){
          newState.color = 'purple';
        }

        if (this.arrayEqual(colors, ['Blue', 'Red', 'Yellow'])){
          newState.color = 'black'
        }

        if (this.arrayEqual(colors, ['Blue', 'Yellow'])){
          newState.color = 'green'
        }

        if (this.arrayEqual(colors, ['Red', 'Yellow'])){
          newState.color = 'orange';
        }

        this.setState(newState);
      }

      render() {
        return (
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <ChipInput
              icon={<FontIcon className="mdi mdi-format-color-fill" color={this.state.color} />}
              dataSource={data}
              dataSourceConfig={config}
              onChange={this.onChange}
              muiChipProps={muiChipProps}
              placeholder="Select colors to start mixing!"
            />
          </MuiThemeProvider>
        );
      }
    }

    <OnChangeExample />