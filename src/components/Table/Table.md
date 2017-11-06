
Example (no data):

    const columns = [{
      title: 'Router',
      dataIndex: 'routerName',
      key: 'routerName',
      sorter: true
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }];

    <Provider locale="enUS">
      <Table columns={columns} />
    </Provider>

Example (with data):

    const columns = [{
      title: 'Router',
      dataIndex: 'routerName',
      key: 'routerName',
      sorter: true
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

Example (with filter):

    const columns = [{
      title: 'Router',
      dataIndex: 'routerName',
      key: 'routerName'
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [{ text: 'UP', value: 'UP' }, { text: 'DOWN', value: 'DOWN' }],
      onFilter: (value, record) => record.status.includes(value)
    }];

    const dataSource = [{
      key: 'US-Conductor',
      routerName: 'US-Conductor',
      status: 'UP'
    }, {
      key: 'US-E-Boston',
      routerName: 'US-E-Boston',
      status: 'DOWN'
    }];

    const rowSelection = {};
    
    <Provider locale="enUS">
      <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={false} />
    </Provider>

Example (Bordered Table, No Data):

    const columns = [{
      title: 'Router',
      dataIndex: 'routerName',
      key: 'routerName'
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }];
    
    <Provider locale="enUS">
      <Table borderedTable columns={columns} pagination={false} />
    </Provider>

Example (Bordered Table With Expansions):

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

Example (Bordered Table With Expansions and Pagination):

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
    }, {
      key: 'US-SW-SanDiego',
      routerName: 'US-W-SanDiego',
      status: 'UP'
    }, {
      key: 'US-S-Miami',
      routerName: 'US-S-Miami',
      status: 'UP'
    }, {
      key: 'US-W-Sacramento',
      routerName: 'US-W-Sacramento',
      status: 'UP'
    }, {
      key: 'US-NW-Juneau',
      routerName: 'US-NW-Juneau',
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
        pagination={{
          pageSize: 3
        }} 
        expandedRowRender={expandedRowRender} 
      />
    </Provider>


