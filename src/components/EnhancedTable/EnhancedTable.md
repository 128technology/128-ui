Example:

    const Immutable = require('immutable');

    const columns = Immutable.fromJS([{
      label: 'Name',
      key: 'name',
      dataKey: 'name'
    }, {
      label: 'Healthy',
      key: 'health',
      dataKey: 'healthy'
    }, {
      label: 'Calories',
      key: 'cals',
      numeric: true,
      dataKey: 'cals'
    }]);

    const d = Immutable.fromJS([{
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

    const data = d.flatMap(i => [i, i, i, i]);

    <EnhancedTable height={'400px'} dataSource={data} columns={columns} />


Example:

    const Immutable = require('immutable');
    const { RowSelection } = require('./enhancedTableUtil');

    const columns = Immutable.fromJS([{
      label: 'Name',
      key: 'name',
      dataKey: 'name'
    }, {
      label: 'Healthy',
      key: 'health',
      dataKey: 'healthy'
    }]);

    const data = Immutable.fromJS([{
      name: 'Burger',
      healthy: 'Kinda'
    }, {
      name: 'Carrot',
      healthy: 'Yes'
    }, {
      name: 'Cookie',
      healthy: 'No'
    }]);

    <EnhancedTable dataSource={data} columns={columns} rowSelection={new RowSelection()} />