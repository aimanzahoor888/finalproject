import React, { useState } from 'react';
import '../../App.css';  // Ensure App.css is imported if not already
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';


function ChatComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');


  const goToChatGPT = () => {
    // This will open your custom GPT page in the same tab
    window.location.href = 'https://chatgpt.com/g/g-pewhJ9uBp-thrifty';
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    const userMessage = inputText;
    setMessages(messages => [...messages, { text: userMessage, sender: 'user' }]);
    setInputText('');

    // Change the URL to your server's endpoint that handles chat
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    setMessages(messages => [...messages, { text: data.reply, sender: 'bot' }]);
  };

  return (
    <div className="chat-container">
      <button onClick={goToChatGPT} className="chat-button">
      <FontAwesomeIcon icon={faRobot} />
    </button>
      {isOpen && (
        <div className="chat-box">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input 
              type="text" 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              onKeyPress={event => event.key === 'Enter' ? sendMessage() : null}
            />
            <button onClick={sendMessage} className="send-button">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
