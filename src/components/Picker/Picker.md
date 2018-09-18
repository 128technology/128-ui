Date Time Range Picker:

    <Picker onChange={console.log} />

Default start and end date:

    const moment = require('moment');

    <Picker onChange={console.log} defaultStartDate={moment()} defaultEndDate={moment().add(1, 'day')} />

Controlled Picker:

    const moment = require('moment');

    <Picker startDate={moment()} endDate={moment().add(1, 'day')} />
