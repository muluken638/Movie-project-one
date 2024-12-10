// src/components/Chat.js
import React, { useState } from 'react';

const Chat = ({ user1, user2 }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (message.trim()) {
            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senderId: user1.id,
                    receiverId: user2.id,
                    content: message,
                }),
            });
            if (response.ok) {
                setMessage('');
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
