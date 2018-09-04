Example:

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');
    const Immutable = require('immutable');

    const columns = Immutable.fromJS([{
      title: 'Name',
      key: 'name',
      dataIndex: 'name'
    }, {
      title: 'Healthy',
      key: 'health',
      dataIndex: 'healthy'
    }, {
      title: 'Calories',
      key: 'cals',
      numeric: true,
      dataIndex: 'cals' 
    }]);

    const data = Immutable.fromJS([{
      name: 'Burger',
      cals: 1400,
      healthy: 'Kinda'
    }, {
      name: 'Carrot',
      cals: 50,
      healthy: 'Yes'
    }, {
      name: 'Cookie',
      cals: 220,
      healthy: 'No'
    }]);

    <MuiThemeProvider theme={createMuiTheme()}>
      <EnhancedTable dataSource={data} columns={columns} />
    </MuiThemeProvider>