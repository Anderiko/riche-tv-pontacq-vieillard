import React, {useEffect, useRef, useState} from 'react';

export function Chat() {
    const [socket, setSocket] = useState(null)
    const [form, setForm] = useState({
        name: '',
        message: '',
        moment: ''
    })
    const [chatHistory, setChatHistory] = useState([])

    const chatRef = useRef()

    const formatter = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});

    useEffect(() => {
        const skt = new WebSocket('wss://imr3-react.herokuapp.com/')
        setSocket(skt)

        skt.onopen = () => {
            console.log('WebSocket connection established');
        };

        skt.onmessage = (event) => {
            const data = JSON.parse(event.data).filter((data) => !['Rick', "dsqdq", "", null].includes(data.name));
            setChatHistory((prevHistory) => [...prevHistory, ...data])
        };

        return () => {
            skt.close();
        }
    }, [])

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    })

    const sendMessage = (event) => {
        event.preventDefault();
        if (!socket) return;
        if (!form.name || form.name.trim() === "") return alert('Please enter your name');
        if (!form.message || form.message.trim() === "") return;

        const currentTime = Date.now();
        socket.send(
            JSON.stringify({
                when: currentTime,
                name: form.name,
                message: form.message,
                moment: form.moment
            })
        );

        setForm({...form, message: '', moment: ''})
    };

    return (
        <div>
            <div ref={chatRef} className="chat-messages-container">
                {chatHistory.map((data, index) => (
                    <div key={index} className={`message ${form.name.toLowerCase().trim() === data.name.toLowerCase().trim() ? "my-message" : ""}`}>
                        <div className="message-name">{data.name}</div>

                        <div className="message-content">
                            <div className="message-text">{data.message}</div>
                        </div>

                        <div className="timestamp">
                            {formatter.format(data.when)}
                        </div>
                    </div>
                ))}
            </div>


            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(event) => setForm({...form, name: event.target.value})}
                />
                <input
                    type="text"
                    placeholder="Type a message"
                    value={form.message}
                    onChange={(event) => setForm({...form, message: event.target.value})}
                    autoFocus
                />
                <button type="submit">→</button>
            </form>
        </div>
    );
}
