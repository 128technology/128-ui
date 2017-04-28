Example:

    <Provider locale="enUS">
      <DatePicker />
    </Provider>

Example (Range):

    <Provider locale="enUS">
      <DatePicker rangePicker />
    </Provider>

Example (Preset Ranges):

    const moment = require('moment');

    <Provider locale="enUS">
      <DatePicker
        showTime
        rangePicker
        ranges={{
          'Today': [moment(), moment()],
          'This Month': [moment(), moment().endOf('month')]
        }}
      />
    </Provider>
