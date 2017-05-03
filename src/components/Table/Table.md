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

Example (Bordered Table):

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

    const subColumns = [{
      title: 'Node',
      dataIndex: 'nodeName',
      key: 'nodeName'
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }];

    const subDataSource = [{
      key: 'US-Conductor-Node',
      nodeName: 'US-Conductor-node',
      status: 'UP'
    }, {
      key: 'US-E-Boston-node',
      nodeName: 'US-E-Boston-node',
      status: 'UP'
    }];

    const expandedRowRender = () => (
      <Table 
        borderedTable 
        rowSelection={rowSelection} 
        dataSource={subDataSource} 
        columns={subColumns} 
        pagination={false} 
        expandedRowRender={expandedRowRender} 
      />
    );

    const rowSelection = {};

    <Provider locale="enUS">
      <Table 
        borderedTable 
        rowSelection={rowSelection} 
        dataSource={dataSource} 
        columns={columns} 
        pagination={false} 
        expandedRowRender={expandedRowRender} 
      />
    </Provider>
