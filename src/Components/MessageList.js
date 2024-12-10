// src/components/MessageList.js
import React, { useEffect, useState } from 'react';

const MessageList = ({ user1, user2 }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch(`http://localhost:5000/api/messages/${user1.id}/${user2.id}`);
            const data = await response.json();
            setMessages(data);
        };

        fetchMessages();
    }, [user1, user2]);

    return (
        <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
            {messages.map((message) => (
                <div key={message.id} style={{ margin: '10px 0' }}>
                    <strong>{message.sender_id === user1.id ? user1.username : user2.username}</strong>: {message.content} <span style={{ fontSize: '0.8em', color: '#999' }}>{new Date(message.created_at).toLocaleTimeString()}</span>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
