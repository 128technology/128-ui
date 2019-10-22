Controlled:

    const Paper = require('@material-ui/core/Paper').default;
    const moment = require('moment');
    const Icons = require('../Icons');

    class CalendarTest extends React.Component {
      constructor(props) {
        super(props);
        this.state = { date: moment() };
      }

      nextMonth() {
        this.setState(({ date }) => ({ date: date.clone().add(1, 'month') }));
      }

      prevMonth() {
        this.setState(({ date }) => ({ date: date.clone().subtract(1, 'month') }));
      }

      render() {
        return (
          <Paper>
            <div style={{ display: 'flex' }}>
              <span onClick={this.prevMonth.bind(this)}><Icons.ChevronLeft /></span>
              <div>{this.state.date.format('MMM')}</div>
              <span onClick={this.nextMonth.bind(this)}><Icons.ChevronRight /></span>
            </div>
            <Calendar date={this.state.date} />
          </Paper>
        );
      }
    }

      <CalendarTest />

Custom day component:

    const Paper = require('@material-ui/core/Paper').default;
    const moment = require('moment');
    const Icons = require('../Icons');

    class CalendarTest extends React.Component {
      constructor(props) {
        super(props);
        this.state = { date: moment() };
      }

      nextMonth() {
        this.setState(({ date }) => ({ date: date.clone().add(1, 'month') }));
      }

      prevMonth() {
        this.setState(({ date }) => ({ date: date.clone().subtract(1, 'month') }));
      }

      handleDayClick(e) {
        console.log(e);
      }

      dayRenderer(date, inCurrentMonth, originalSymbol) {
        return <div style={{ backgroundColor: '#f0f1f4', borderRadius: '100%' }}>{originalSymbol}</div>;
      }

      disableDay(date, inCurrentMonth) {
        return Boolean(date.day() % 2);
      }

      render() {
        return (
          <Paper>
            <div style={{ display: 'flex' }}>
              <span onClick={this.prevMonth.bind(this)}><Icons.ChevronLeft /></span>
              <div>{this.state.date.format('MMM')}</div>
              <span onClick={this.nextMonth.bind(this)}><Icons.ChevronRight /></span>
            </div>
            <Calendar
              date={this.state.date}
              disableDay={this.disableDay}
              dayRenderer={this.dayRenderer}
              dayProps={{ onClick: this.handleDayClick }}
            />
          </Paper>
        );
      }
    }

      <CalendarTest />