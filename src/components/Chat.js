import React from 'react';

export class Chat extends React.Component {
  state = {
    socket: null,
    name: '',
    message: '',
    chatHistory: [],
  };

  formatter = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});

  componentDidMount() {
    const socket = new WebSocket('wss://imr3-react.herokuapp.com/');
    this.setState({ socket });

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data).filter((data) => data.name !== 'Rick');
      this.setState((prevState) => ({
        chatHistory: [...prevState.chatHistory, ...data],
      }));

      console.log("coucou", this.state.chatHistory);
    };
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  sendMessage = (event) => {
    event.preventDefault();
    if (!this.state.socket) {
      return;
    }

    const currentTime = Date.now();
    this.state.socket.send(
      JSON.stringify({
        when: currentTime,
        name: this.state.name,
        message: this.state.message,
      })
    );
    this.setState({ message: '' });
  };

  render() {
    return (
      <div>
        <h1>Chat</h1>
        <form onSubmit={this.sendMessage}>
          <input
            type="text"
            placeholder="Your name"
            value={this.state.name}
            onChange={(event) => this.setState({ name: event.target.value })}
          />
          <input
            type="text"
            placeholder="Type a message"
            value={this.state.message}
            onChange={(event) => this.setState({ message: event.target.value })}
          />
          <button type="submit">Send</button>
        </form>
        <div>
          {this.state.chatHistory.map((data, index) => (
            <div key={index}>
              [{this.formatter.format(data.when)}] {data.name}: {data.message}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
