Example (no data):

    <Provider locale="enUS">
      <Table />
    </Provider>

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
      key: 'US-Conductor',
      routerName: 'US-Conductor',
      status: 'UP'
    }, {
      key: 'US-E-Boston',
      routerName: 'US-E-Boston',
      status: 'UP'
    }];

    const rowSelection = {};
    
    <Provider locale="enUS">
      <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
    </Provider>

Example (no pagination):

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
      key: 'US-Conductor',
      routerName: 'US-Conductor',
      status: 'UP'
    }, {
      key: 'US-E-Boston',
      routerName: 'US-E-Boston',
      status: 'UP'
    }];

    const rowSelection = {};
    
    <Provider locale="enUS">
      <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={false} />
    </Provider>
