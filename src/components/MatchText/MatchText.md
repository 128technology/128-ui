Example:

    <MatchText text="This will be matched" searchString="will" />

Example (Multiple Matches):

    <MatchText text="This will and this will be matched..." searchString="will" />

Example (Live matching):

    class LiveMatch extends React.Component {
      constructor() {
        this.state = {
          searchString: ''
        };
      }

      onChange(event) {
        this.setState({
          searchString: event.target.value
        });
      }
      
      render() {
        return (
          <div>
            <input type="text" value={this.state.searchString} onChange={this.onChange.bind(this)} style={{ display: 'block' }} />
            <MatchText text="Search anything inside this string..." searchString={this.state.searchString} />
          </div>
        );
      }
    }

    <LiveMatch />
