import React, { useState } from 'react';

    const MessageForm = ({ token }) => {
    const [content, setContent] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/messages/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ content, scheduledTime }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your message"
                required
            />
            <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
            />
            <button type="submit">Schedule Message</button>
        </form>
    );
};

export default MessageForm;
