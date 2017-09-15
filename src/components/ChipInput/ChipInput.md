Example (Groups):

    const injectTapEventPlugin = require('react-tap-event-plugin');
    injectTapEventPlugin();

    const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
    const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

    const data = [{
      name: 'Greg',
      type: 'Person'
    }, {
      name: 'George',
      type: 'Person'
    }, {
      name: 'Bob',
      type: 'Person'
    }, {
      name: 'Scruffy',
      type: 'Dog'
    }, {
      name: 'Kashmir',
      type: 'Dog'
    }];

    const config = {
      label: 'name',
      value: 'name'
    };

    function groupBy(item) {
      return item.type;
    }

    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput dataSource={data} dataSourceConfig={config} groupBy={groupBy} />
    </MuiThemeProvider>
