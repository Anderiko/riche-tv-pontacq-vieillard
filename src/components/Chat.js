import React from 'react';

export class Chat extends React.Component {
  state = {
    socket: null,
    name: '',
    message: '',
    chatHistory: [],
  };

  chatRef = React.createRef();

  formatter = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});

  componentDidMount() {
    const socket = new WebSocket('wss://imr3-react.herokuapp.com/');
    this.setState({ socket });

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data).filter((data) => !['Rick', "dsqdq", "", null].includes(data.name));
      this.setState((prevState) => ({
        chatHistory: [...prevState.chatHistory, ...data],
      }));
    };
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  componentDidUpdate() {
    const chat = this.chatRef.current;
    chat.scrollTop = chat.scrollHeight;
  }

  sendMessage = (event) => {
    event.preventDefault();
    if (!this.state.socket) return;
    if (!this.state.name) return alert('Please enter your name');
    if (!this.state.message) return;

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
        <div ref={this.chatRef} className="chat-messages-container">
          {this.state.chatHistory.map((data, index) => (
            <div key={index} className={`message ${this.state.name.toLowerCase() === data.name.toLowerCase() ? "my-message" : ""}`}>
              <div className="message-name">{data.name}</div>

              <div className="message-content">
                <div className="message-text">{data.message}</div>
              </div>

              <div className="timestamp">
                {this.formatter.format(data.when)}
              </div>
            </div>
          ))}
        </div>


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
            autoFocus
          />
          <button type="submit">→</button>
        </form>
      </div>
    );
  }
}
