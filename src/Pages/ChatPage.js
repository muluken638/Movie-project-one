import React, { useState, useRef, useEffect } from 'react';

function ChatPage() {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const chatboxRef = useRef(null);
  const userInputRef = useRef(null);
  
  // Function to toggle the chatbox visibility
  const toggleChatbox = () => {
    setIsChatboxOpen(prevState => !prevState);
  };

  // Function to add user message to chat
  const addUserMessage = (message) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-2", "text-right");
    messageElement.innerHTML = `<p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatboxRef.current.appendChild(messageElement);
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  };

  // Function to add bot message to chat
  const addBotMessage = (message) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-2");
    messageElement.innerHTML = `<p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatboxRef.current.appendChild(messageElement);
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  };

  // Function to handle user input
  const handleSendMessage = () => {
    const userMessage = userInputRef.current.value;
    if (userMessage.trim() !== "") {
      addUserMessage(userMessage);
      respondToUser(userMessage);
      userInputRef.current.value = "";
    }
  };

  const respondToUser = (userMessage) => {
    // Replace this with your chatbot logic
    setTimeout(() => {
      addBotMessage("This is a response from the chatbot.");
    }, 500);
  };

  useEffect(() => {
    // Automatically open the chatbox on component mount
    setIsChatboxOpen(true);
  }, []);

  return (
    <div>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button id="open-chat" onClick={toggleChatbox} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Chat with Admin Bot
        </button>
      </div>
      {isChatboxOpen && (
        <div id="chat-container" className="fixed bottom-16 right-4 w-96">
          <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">Admin Bot</p>
              <button onClick={toggleChatbox} className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div ref={chatboxRef} className="p-4 h-80 overflow-y-auto">
              {/* Chat messages will be displayed here */}
              {/* Example static messages can be added here initially if desired */}
            </div>
            <div className="p-4 border-t flex">
              <input ref={userInputRef} type="text" placeholder="Type a message" className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
