import React, { useEffect, useState } from 'react';

    const MessageList = ({ token }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/messages/', {
            headers: {
                'Authorization': token,
            },
        })
            .then((response) => response.json())
            .then((data) => setMessages(data.data));
    }, [token]);

    return (
        <ul>
            {messages.map((message) => (
                <li key={message.id}>
                    {message.content} - {new Date(message.scheduledTime).toLocaleString()}
                </li>
            ))}
        </ul>
    );
};

export default MessageList;
