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

Example (Selected Keys):

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
      <ChipInput dataSource={data} dataSourceConfig={config} selectedKeys={['Greg', 'George']} />
    </MuiThemeProvider>

Example (Groups):

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

    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput dataSource={data} dataSourceConfig={config} groupBy={groupBy} />
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
            <div>
              <div
                style={{
                  backgroundColor: this.state.color,
                  height: '30px',
                  width: '100%',
                  boxShadow: '0 0 10px 0 rgba(0,0,0,0.16)',
                  margin: '5px'
                }}
              />
              <ChipInput
                dataSource={data}
                dataSourceConfig={config}
                onChange={this.onChange}
                muiChipProps={muiChipProps}
              />
            </div>
          </MuiThemeProvider>
        );
      }
    }

    <OnChangeExample />