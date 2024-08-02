import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import socketIo from "socket.io-client";
import './Chat.css';

const socket = socketIo('https://chat-application-ten-chi.vercel.app'); // Initialize Socket.io client

const Chat = () => {
  const location = useLocation();
  const { name } = location.state;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(''); // Single message input

  const avatarUrl = "https://img.lovepik.com/element/40143/1122.png_1200.png"; // Example avatar URL

  useEffect(() => {
    // Event listener for socket connection
    socket.on('connect', () => {
      console.log("Connected to server");
    });

    // Emitting 'foo' event with name data
    socket.emit("foo", { name, avatarUrl });

    // Event listener for incoming messages from 'Anonymous' and 'welcome'
    socket.on("Anonymous", ({ data }) => {
      console.log(data);
    });

    socket.on("welcome", ({ data }) => {
      console.log(data);
    });

    // Event listener for incoming chat messages
    socket.on("newMessage", (msgData) => {
      setMessages(prevMessages => [...prevMessages, msgData]); // Append new message to the messages array
    });

    // Clean up function to unsubscribe from socket events on component unmount
    return () => {
      socket.off('connect');
      socket.off('Anonymous');
      socket.off('welcome');
      socket.off('newMessage');
    };
  }, [name, avatarUrl]); // Dependency array to ensure useEffect runs only when 'name' or 'avatarUrl' changes

  // Function to handle sending message to server
  const handleSend = () => {
    if (message) {
      socket.emit("message", { message, name, avatarUrl });
      setMessage(''); // Clear input field after sending
    } else {
      console.log("Message not sent");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user-info">
          <img src={avatarUrl} alt="User Avatar" className="user-avatar" />
          <div>
            <h2>Hi Welcome! {name}</h2>
            <p>{messages.length} Messages</p>
          </div>
        </div>
        <div className="chat-actions">
          <button>📹</button>
          <button>📞</button>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === name ? 'received' : 'sent'}`}>
            <img src={msg.avatarUrl} alt={`${msg.sender} avatar`} className="message-avatar" />
            <div className="message-content">
              <p>{msg.message}</p>
              <span className="message-time">{new Date().toLocaleTimeString()}</span> {/* You can adjust the time format */}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input 
          onChange={(e) => setMessage(e.target.value)} 
          value={message} 
          type="text" 
          placeholder="Type your message..." 
          className="message-input" 
        />
        <button onClick={handleSend} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chat;
