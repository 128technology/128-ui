Example (no data):

    <Table />

Example (with data):

    const columns = [{
      title: 'Router',
      dataIndex: 'routerName',
      key: 'routerName'
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }];

    const dataSource = [{
      routerName: 'US-Conductor',
      status: 'UP'
    }, {
      routerName: 'US-E-Boston',
      status: 'UP'
    }];

    const rowSelection = {};
    
    <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
