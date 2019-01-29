Example:

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

    <EnhancedTable dataSource={data} columns={columns} />


Example:

    const Immutable = require('immutable');
    const { RowSelection } = require('./enhancedTableUtil');

    const columns = Immutable.fromJS([{
      title: 'Name',
      key: 'name',
      dataIndex: 'name'
    }, {
      title: 'Healthy',
      key: 'health',
      dataIndex: 'healthy'
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