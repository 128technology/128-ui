Date Time Range Picker:

    <Picker onChange={console.log} />

Date Time Range Picker Secondary:

    <Picker onChange={console.log} color="secondary" />

Disabled dates:

    const moment = require('moment');

    <Picker disableDate={(d) => d.isAfter(moment())} />

Default start and end date:

    const moment = require('moment');

    <Picker onChange={console.log} startDate={moment()} endDate={moment().add(1, 'month')} />

Controlled Picker:

    const moment = require('moment');

    <Picker startDate={moment()} endDate={moment().add(1, 'day')} />
