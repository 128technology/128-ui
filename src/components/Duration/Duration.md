Example:

    const duration = 123456789;

    <Duration duration={duration} />

Example (time until midnight tonight):

    class TickingDuration extends React.Component {
      constructor() {
        this.state = {
          midnight: 0,
          duration: 0
        };
      }
      
      componentWillMount() {
        this.setMidnight();
        setInterval(() => this.setDuration(), 500);
      }

      setDuration() {
        const currentTime = new Date();
        const duration = this.state.midnight - currentTime;
        
        this.setState({
          duration
        });
      }

      setMidnight() {
        const midnight = new Date();

        midnight.setDate(midnight.getDate() + 1);
        midnight.setHours(0, 0, 0, 0);

        this.setState({
          midnight
        });
      }

      render() {
        return (
          <Duration duration={this.state.duration} />
        );
      }
    };

    <TickingDuration />
