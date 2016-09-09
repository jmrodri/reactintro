
class Channel extends React.Component {
    onClick() {
        console.log('I was clicked', this.props.name);
    }
    render() {
        return (
                // Now let's use the props object
                // bind is required because javascript is stupid with the
                // scoping of this
            <li onClick={this.onClick.bind(this)}>{this.props.name}</li>
        )
    }
}

class ChannelList extends React.Component {
    render() {
        // Channel is the newly created component above
        // embedding a react component inside another component.
        // name is any attribute, using name to be informative
        return (
            <ul>
               {this.props.channels.map( channel => {
                   return (
                      <Channel name={channel.name} />
                   )
                 }
               )}
            </ul>
        )
    }
}

class ChannelForm extends React.Component {

    // initialize state object so we can use it in onSubmit
    constructor(props){
        super(props);
        this.state = {};
    }

    // capture change events on the text field
    onChange(e) {
        this.setState({
            channelName: e.target.value
        });
    }

    onSubmit(e) {
        let {channelName} = this.state;
        console.log(channelName);
        this.setState({
            channelName: ''
        });
        this.props.addChannel(channelName);
        // to keep browser from trying to submit form via http
        e.preventDefault();
    }

    render() {
        return(
          <form onSubmit={this.onSubmit.bind(this)}>
            <input type='text' onChange={this.onChange.bind(this)} value={this.state.channelName} />
          </form>
        )
    }
}

// parent component for a corner of the page
class ChannelSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           channels: [
                {name: 'Hardware Support'},
                {name: 'Software Support'}
            ]
        };
    }

    addChannel(name){
        let {channels} = this.state;
        channels.push({name: name});
        this.setState({
            channels: channels
        });
    }

    // state should be stored in the common parent of the components
    // that need access to the Channels.
    render() {
        return(
                <div>
                  <ChannelList channels={this.state.channels} />
                  <ChannelForm addChannel={this.addChannel.bind(this)}/>
                </div>
                )
    }
}

// ChannelList is the newly created component above
// can only pass in one component as the first argument.
ReactDOM.render(<ChannelSection />, document.getElementById('app'));
