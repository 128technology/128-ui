Example:

    const Immutable = require('immutable');
    const { RowSelection } = require('./enhancedTableUtil');

    const columns = Immutable.fromJS([
      {
        label: 'Name',
        key: 'name',
        dataKey: 'name'
      },
      {
        label: 'Policy',
        key: 'policyName',
        dataKey: 'policyName'
      },
      {
        label: 'Type',
        key: 'type'
      }
    ]);

    const data = Immutable.fromJS([{
      name: 'Burger',
    }, {
      name: 'Carrot',
      policyName: 'Yes',
      type: 'fat'
    }, {
      name: 'Cookie',
      policyName: 'No',
      type: 'fat'
    }]);

    <EnhancedTable dataSource={[]} columns={columns} rowSelection={            new RowSelection({
              selectorType: 'radio'
            })} />

Example:

    const Immutable = require('immutable');

    const columns = Immutable.fromJS([{
      label: 'Name',
      key: 'name',
      dataKey: 'name',
      flexGrow: 1
    }, {
      label: 'Healthy',
      key: 'health',
      dataKey: 'healthy',
    }, {
      label: 'Calories',
      key: 'cals',
      numeric: true,
      dataKey: 'cals',
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
      healthy: 'No'
    }]);

    const data = d.flatMap(i => [i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i]);

    <EnhancedTable dataSource={data} columns={columns} columnMinWidth={230} />

Example:

    const Immutable = require('immutable');
    const { RowSelection } = require('./enhancedTableUtil');

    const columns = Immutable.fromJS([{
      label: 'Name',
      key: 'name',
      dataKey: 'name',
      flexGrow: 1
    }, {
      label: 'Healthy',
      key: 'health',
      dataKey: 'healthy',
    }]);

    const data = Immutable.fromJS([{
      name: 'Burger',
    }, {
      name: 'Carrot',
      healthy: 'Yes'
    }, {
      name: 'Cookie',
      healthy: 'No'
    }]);

    <EnhancedTable dataSource={data} columns={columns} rowSelection={new RowSelection()} />

Example:

    const Immutable = require('immutable');


    const columns = Immutable.fromJS([{
      label: 'Device Interface',
      flexGrow: 1,
      dataKey: 'name',
      key: 'name'
    },
    {
      label: 'Network Interfaces',
      flexGrow: 1,
      dataKey: 'totalCount',
      key: 'numNetworkInterfaces',
      numeric: true
    },
    {
      label: 'Type',
      flexGrow: 1,
      dataKey: 'type',
      key: 'type'
    },
    {
      label: 'Forwarding',
      flexGrow: 1,
      dataKey: 'forwarding',
      key: 'forwarding',
      render: (cellData) => (cellData ? 'Yes' : 'No')
    },
    {
      label: 'MAC Address',
      flexGrow: 1,
      dataKey: 'state.macAddress',
      cellDataGetter: ({ rowData }) => {
        console.log('MACADDRESS', rowData);
        return rowData.state.macAddress;
      },
      key: 'mac'
    },
    {
      label: 'Admin Status',
      flexGrow: 1,
      dataKey: 'adminStatus',
      cellDataGetter: ({ rowData }) => {
        return rowData.state.adminStatus;
      },
      key: 'adminStatus',
    },
    {
      label: 'Operational Status',
      flexGrow: 1,
      dataKey: 'operationalStatus',
      cellDataGetter: ({ rowData }) => {
        return rowData.state.operationalStatus;
      },
      key: 'operationalStatus'
    },
    {
      label: 'Redundancy Status',
      flexGrow: 1,
      dataKey: 'redundancyStatus',
      cellDataGetter: ({ rowData }) => {
        return rowData.state.redundancyStatus;
      },
      key: 'redundancyStatus',
    },
    {
      label: (
        <React.Fragment>
          <span key="text">{'Shared MAC Address'} </span>
        </React.Fragment>
      ),
      dataKey: 'sharedPhysAddress',
      key: 'sharedPhysAddress'
    },
    {
      label: 'Avg. B/W (Mbps)',
      flexGrow: 1,
      dataKey: 'averageBandwidth',
      key: 'averageBandwidth',
      numeric: true,
    }]);


    const data = Immutable.fromJS([
    {
        "networkInterfaces": {
            "totalCount": 1,
        },
        "name": "10-newname",
        "state": {
            "adminStatus": "ADMIN_UP",
            "operationalStatus": "OPER_UP",
            "redundancyStatus": "NON_REDUNDANT",
            "macAddress": "fa:16:3e:13:eb:28",
        },
        "averageBandwidth": null,
        "_id": "authority/router:NYC/node:nyc/device-interface:10-newname",
        "type": "ethernet",
        "sharedPhysAddress": null,
        "forwarding": true
    },
    {
        "networkInterfaces": {
            "totalCount": 1,
        },
        "name": "11",
        "state": {
            "adminStatus": "ADMIN_UP",
            "operationalStatus": "OPER_UP",
            "redundancyStatus": "NON_REDUNDANT",
            "macAddress": "fa:16:3e:a7:db:3a",
        },
        "averageBandwidth": 1320.200557103064,
        "_id": "authority/router:NYC/node:nyc/device-interface:11",
        "type": "ethernet",
        "sharedPhysAddress": null,
        "forwarding": true
    },
    {
        "networkInterfaces": {
            "totalCount": 1,
        },
        "name": "management",
        "state": {
            "adminStatus": null,
            "operationalStatus": null,
            "redundancyStatus": null,
            "macAddress": null,
        },
        "averageBandwidth": null,
        "_id": "authority/router:NYC/node:nyc/device-interface:management",
        "type": "ethernet",
        "sharedPhysAddress": null,
        "forwarding": false
    },
    {
        "networkInterfaces": {
            "totalCount": 1,
        },
        "name": "sfc-ipsec",
        "state": {
            "adminStatus": "ADMIN_UP",
            "operationalStatus": "OPER_UNKNOWN",
            "redundancyStatus": "NON_REDUNDANT",
            "macAddress": "da:7a:a3:6c:02:20",
        },
        "averageBandwidth": null,
        "_id": "authority/router:NYC/node:nyc/device-interface:sfc-ipsec",
        "type": "host",
        "sharedPhysAddress": null,
        "forwarding": true
    },
    {
        "networkInterfaces": {
            "totalCount": 1,
        },
        "name": "zscaler-0",
        "state": {
            "adminStatus": "ADMIN_UP",
            "operationalStatus": "OPER_UNKNOWN",
            "redundancyStatus": "NON_REDUNDANT",
            "macAddress": "26:1f:fb:6f:d5:3a",
        },
        "averageBandwidth": null,
        "_id": "authority/router:NYC/node:nyc/device-interface:zscaler-0",
        "type": "host",
        "sharedPhysAddress": null,
        "forwarding": true
    }]);


    <EnhancedTable dataSource={data} columns={columns} columnMinWidth={200} />

