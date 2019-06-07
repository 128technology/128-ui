Example:

    const columns = [{
      name: 'name',
      header: 'Name'
    }, {
      name: 'healthy',
      header:'Healthy',
      onHeaderClick: false
    }, {
      name: 'cals',
      header: 'Calories'
    }];

    const data = [{
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
    }];

    <EnhancedTable
      data={data.flatMap(i => [i, i, i, i])}
      columns={columns}
      includeHeaders={true}
      maxHeight={400}
    />


Example:

    const columns = [{
      header: 'Name',
      name: 'name'
    }, {
      header: 'Healthy',
      name: 'healthy'
    }];

    const data = [{
      name: 'Burger',
      healthy: 'Kinda'
    }, {
      name: 'Carrot',
      healthy: 'Yes'
    }, {
      name: 'Cookie',
      healthy: 'No'
    }];

    <EnhancedTable data={data} columns={columns} height={200} />